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

        public HomePageController(IPostRepository postRepository)
        {
            _postRepo = postRepository;
        }
    
       [HttpGet]
       public IActionResult GetTopPosts()
        {
            //gets top posts to display on HomePage
            var posts = _postRepo.GetTopFourPosts();
            return Ok(posts);
        }



    }
}
