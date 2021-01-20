using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {

        private ITagRepository _repo;
        private IUserProfileRepository _userRepo;

        public TagController(ITagRepository repo, IUserProfileRepository userProfileRepository)
        {
            _repo = repo;
            _userRepo = userProfileRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var tags = _repo.Get();
            return Ok(tags);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var tag = _repo.GetById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }
        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            if (GetCurrentUserProfile().UserTypeId != 1) { return Unauthorized(); }
            _repo.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            if (GetCurrentUserProfile().UserTypeId != 1) { return Unauthorized(); }
            if (id != tag.Id || tag.Id < 0)
            {
                return BadRequest();
            }
            var existingTag = _repo.GetById(tag.Id);
            if (existingTag == null) { return BadRequest(); }
            existingTag.Name = tag.Name;
            _repo.Update(existingTag);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (GetCurrentUserProfile().UserTypeId != 1) { return Unauthorized(); }
            try
            {
                _repo.Delete(id);
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
