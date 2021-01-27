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
            var existing = _subRepo.GetSubscription(subscription.SubscriberUserProfileId, subscription.ProviderUserProfileId);
            if (existing == null)
            {
                subscription.BeginDateTime = DateTime.Now;
                _subRepo.Add(subscription);
                return Ok(subscription);
            }
            else
            {
                existing.EndDateTime = null;
                existing.BeginDateTime = DateTime.Now;
                _subRepo.Update(existing);
                return Ok(existing);
            }
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var user = GetCurrentUserProfile();
            var posts = _subRepo.GetByAuthor(user.Id);
            return Ok(posts);
        }

        [HttpGet("user/{id}")]
        public IActionResult GetSubscriptionId(int id)
        {
            var user = GetCurrentUserProfile();
            Subscription subscription = _subRepo.GetSubscription(user.Id, id);
            return Ok(subscription);

        }

        [HttpPut("{id}")]
        public IActionResult UpdateSubscription(int id)
        {
            var subscription = _subRepo.GetById(id);
            if (subscription.EndDateTime == null)
            {
                subscription.EndDateTime = DateTime.Now;
                _subRepo.Update(subscription);
                return NoContent();
            }
            else
            {
                subscription.EndDateTime = null;
                _subRepo.Update(subscription);
                return NoContent();
            }

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
