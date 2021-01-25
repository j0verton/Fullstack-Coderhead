using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private readonly ApplicationDbContext _context;


        public SubscriptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(Subscription subscription)
        {
            _context.Add(subscription);
            _context.SaveChanges();
        }

        public List<Post> GetByAuthor(int id)
        {
            var completeList = new List<Post>();
            var subscriptionList = _context.Subscription
                .Where(s => s.SubscriberUserProfileId == id)
                .Where(s => s.EndDateTime == null)
                .ToList();
            foreach (var sub in subscriptionList)
            {
                completeList.AddRange(_context.Post
                    .Include(p => p.UserProfile)
                    .Include(p => p.Category)
                    .Include(p => p.PostTags)
                    .ThenInclude(pt => pt.Tag)
                    .Where(p => p.UserProfileId == sub.ProviderUserProfileId)
                    .ToList());
            }
            return completeList;
        }
    }
}


