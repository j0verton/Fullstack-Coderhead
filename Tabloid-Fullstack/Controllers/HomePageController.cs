using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomePageController : ControllerBase
    {
        private readonly IPostRepository _postRepo;
        private readonly IUserProfileRepository _userRepo;

        public HomePageController(IPostRepository postRepository, IUserProfileRepository userRepository)
        {
            _postRepo = postRepository;
            _userRepo = userRepository;
        }
    
       [HttpGet("recentPosts")]
       public IActionResult GetRecentPosts()
        {
            //gets top posts to display on HomePage
            var posts = _postRepo.GetTopFourPosts();
            return Ok(posts);
        }

        [HttpGet("recentAuthors")]
        public IActionResult GetRecentAuthors()
        {
            //gets top posts to display on HomePage
            var authors = _userRepo.GetAuthorProfiles();
            return Ok(authors);
            
        }


    }
}
