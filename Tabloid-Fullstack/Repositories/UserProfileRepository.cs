using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;

namespace Tabloid_Fullstack.Repositories
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        //remember you took posts out of GetProfiles
        public List<UserProfile> GetProfiles()
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .OrderBy(up => up.DisplayName)
                .ToList();
        }
        public List<UserProfile> GetAuthorProfiles()
        {
            return _context.UserProfile
            .Include(up => up.UserType)
                .Include(up => up.Post
                    .Where(p => p.IsApproved))
                .Where(up => up.Post.Count >= 1)
                .OrderByDescending(up => up.CreateDateTime)
                .Take(10)
                .ToList();
        }
        public UserProfile GetProfileById(int id)
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .Include(up => up.Post)
                .FirstOrDefault(up => up.Id == id);
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .Include(up => up.Post)
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);

        }

        public void Add(UserProfile userProfile)
        {
            userProfile.UserStatusId = 1;
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        public void Update(UserProfile userProfile)
        {
            _context.Entry(userProfile).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public int AdminCount()
        {
            return _context.UserProfile
                .Where(up => up.UserTypeId == 1)
                .Where(up => up.UserStatusId == 1)
                .Count();
        }
    }
}
