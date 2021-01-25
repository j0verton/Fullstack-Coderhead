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
    }
}