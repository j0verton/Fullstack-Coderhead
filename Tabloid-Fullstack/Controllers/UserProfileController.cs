using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;
using Tabloid_Fullstack.Repositories;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _repo;
        public UserProfileController(IUserProfileRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
     //   [Authorize] will be authorized only to admin
        public IActionResult GetAllUsers()
        {

            var profiles = _repo.GetProfiles();
            return Ok(profiles);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_repo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPut("img/")]
        public IActionResult UpdateImg(ImageUrl url)
        {
            var user = GetCurrentUserProfile();
            user.ImageLocation = url.ImageLocation;
            _repo.Update(user);
            
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _repo.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }


        [HttpPut("{firebaseUserId}")]
        public IActionResult UpdateStatus(string firebaseUserId, UserProfile userProfile)
        {
            var user = GetCurrentUserProfile();
            if (user.UserTypeId != 1) 
            {
                return Unauthorized();
            }
            var currentProfileStatus = _repo.GetByFirebaseUserId(firebaseUserId);
            if (firebaseUserId != userProfile.FirebaseUserId)
            {
                return BadRequest();
            }
            if (userProfile.UserStatusId == 2)
            {
                currentProfileStatus.UserStatusId = 1;
                _repo.Update(currentProfileStatus);
                return NoContent();
            }
            else if (userProfile.UserStatusId == 1)
            {
                currentProfileStatus.UserStatusId = 2;
                _repo.Update(currentProfileStatus);
                return NoContent();
            }
            return NoContent();

        }
        [HttpPut("typeEdit/{firebaseUserId}")]
        public IActionResult UpdateType(string firebaseUserId, UserProfile userProfile)
        {
            var user = GetCurrentUserProfile();
            if (user.UserTypeId != 1)
            {
                return Unauthorized();
            }
            var currentProfileStatus = _repo.GetByFirebaseUserId(firebaseUserId);
            if (firebaseUserId != userProfile.FirebaseUserId)
            {
                return BadRequest();
            }
            if (userProfile.UserTypeId == 2)
            {
                currentProfileStatus.UserTypeId = 1;
                _repo.Update(currentProfileStatus);
                return NoContent();
            }
            else if (userProfile.UserTypeId == 1)
            {
                currentProfileStatus.UserTypeId = 2;
                _repo.Update(currentProfileStatus);
                return NoContent();
            }
            return NoContent();

        }
        private UserProfile GetCurrentUserProfile()
        {
            try
            {
                var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return _repo.GetByFirebaseUserId(firebaseUserId);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
