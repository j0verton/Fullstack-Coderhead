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
    public class PostController : ControllerBase
    {

        private readonly IPostRepository _repo;
        private readonly IUserProfileRepository _userProfileRepository;
        private ICommentRepository _commentRepo;


        public PostController(IPostRepository repo, ICommentRepository commentRepo, IUserProfileRepository userProfileRepository)
        {
            _repo = repo;
            _commentRepo = commentRepo;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var posts = _repo.Get();
            return Ok(posts);
        }
        [HttpGet("Approvals")]
        public IActionResult GetNotApproved()
        {
            var posts = _repo.GetByNotApproved();
            return Ok(posts);
        }
        [HttpPut("Approvals/{id}")]
        public IActionResult ApprovePut(int id, Post post)
        {
            if (1 != GetCurrentUserProfile().UserTypeId) { return Unauthorized(); }
            var existingPost = _repo.GetById(id);

            if (id != post.Id) { return BadRequest(); }
            if (existingPost.IsApproved == true)
            {
                existingPost.IsApproved = false;
                _repo.Update(existingPost);
                return NoContent();
            }
            if (existingPost.IsApproved == false)
            {
                existingPost.IsApproved = true;
                _repo.Update(existingPost);
                return NoContent();
            }
            return BadRequest();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var post = _repo.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            var comments = _commentRepo.GetCommentsByPostId(id);
            var reactionCounts = _repo.GetReactionCounts(id);
            var postReactions = _repo.GetPostReactionsByPost(id);
            var postDetails = new PostDetails()
            {
                Post = post,
                ReactionCounts = reactionCounts,
                Comments = comments,
                PostReactions = postReactions
            };
            return Ok(postDetails);
        }

        [HttpGet("mypost")]
        public IActionResult GetMyPost()
        {
            var posts = _repo.GetByUserId(GetCurrentUserProfile().Id);
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            
            post.CreateDateTime = DateTime.Now;
            post.IsApproved = true;
            post.UserProfileId = GetCurrentUserProfile().Id;
            _repo.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPost("addreaction")]
        public IActionResult AddReaction(PostReaction postReaction)
        {
            postReaction.UserProfileId = GetCurrentUserProfile().Id;
            _repo.AddReaction(postReaction);
            return CreatedAtAction("Get", new { id = postReaction.Id }, postReaction);
        }

        [HttpPut("mypost/{id}")]
        public IActionResult Put(int id, Post post)
        {
            var existingPost = _repo.GetById(id);

            if (id != post.Id)
            {
                return BadRequest();
            }
            if (existingPost.UserProfileId != GetCurrentUserProfile().Id)
            {
                return Unauthorized();
            }
            existingPost.Title = post.Title;
            existingPost.Content = post.Content;
            existingPost.CategoryId = post.CategoryId;
            existingPost.ImageLocation = post.ImageLocation;

            _repo.Update(existingPost);
            return NoContent();
        }

        [HttpPut("mypost/publish/{id}")]
        public IActionResult Publish(int id)
        {
            var existingPost = _repo.GetById(id);

            if (existingPost.UserProfileId != GetCurrentUserProfile().Id)
            {
                return Unauthorized();
            }
            existingPost.PublishDateTime = DateTime.Now;

            _repo.Update(existingPost);
            return NoContent();
        }

        [HttpDelete("mypost/{id}")]
        public IActionResult Delete(int id)
        {
            var existingPost = _repo.GetById(id);

            if (existingPost.UserProfileId != GetCurrentUserProfile().Id && GetCurrentUserProfile().UserTypeId != 1)
            {
                return Unauthorized();
            }

            _repo.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string criterion)
        {
            if (criterion == null)
            {
                return Ok(_repo.Get());
            }

            var posts = _repo.Search(criterion);
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
