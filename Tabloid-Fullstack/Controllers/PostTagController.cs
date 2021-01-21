using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {

        private readonly IPostRepository _repo;
        private readonly IUserProfileRepository _userProfileRepository;
        private ICommentRepository _commentRepo;


        public PostTagController(IPostRepository repo, ICommentRepository commentRepo, IUserProfileRepository userProfileRepository)
        {
            _repo = repo;
            _commentRepo = commentRepo;
            _userProfileRepository = userProfileRepository;
        }


        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            var post = _repo.GetById(postTag.PostId);
            var user = GetCurrentUserProfile();
            if (user.Id != post.UserProfileId && user.UserTypeId != 1) { return Unauthorized(); }
            _repo.AddTagToPost(postTag);
            return NoContent();
        }

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _repo.DeleteTagFromPost(id);
        //    return NoContent();
        //}

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
