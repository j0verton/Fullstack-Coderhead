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

        public List<UserProfile> GetProfiles()
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .Include(up => up.Post)
                .OrderBy(up => up.DisplayName)
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
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        public void Activate(UserProfile userProfile)
        {
            userProfile.UserStatusId = 1;
            _context.SaveChanges();
        }
        public void DeActivate(UserProfile userProfile)
        {
            userProfile.UserStatusId = 2;
            _context.SaveChanges();
        }
    }
}
