using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subRepo;
        private readonly IUserProfileRepository _userProfileRepository;

        public SubscriptionController(ISubscriptionRepository subRepo, IUserProfileRepository userProfileRepository)
        {
            _subRepo = subRepo;
            _userProfileRepository = userProfileRepository;
        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            subscription.BeginDateTime = DateTime.Now;
            _subRepo.Add(subscription);
            return Ok(subscription);
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var user = GetCurrentUserProfile();
            var posts = _subRepo.GetByAuthor(user.Id);
            return Ok(posts);
        }

        private UserProfile GetCurrentUserProfile()
        {
            try
            {
                var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
