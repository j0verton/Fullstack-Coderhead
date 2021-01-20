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
    public class TagController : ControllerBase
    {

        private ITagRepository _repo;
        private IUserProfileRepository _userProfileRepository;

        public TagController(ITagRepository repo, IUserProfileRepository userProfileRepository)
        {
            _repo = repo;
            _userProfileRepository = userProfileRepository;
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
        public IActionResult Update(int id, Tag tag)
        {
            if (GetCurrentUserProfile().UserTypeId != 1) { return Unauthorized(); }
            if (id != tag.Id) { return BadRequest(); }
            var existingTag = _repo.GetById(id);
            if (existingTag == null) { return BadRequest(); }
            existingTag.Name = tag.Name;
            _repo.Update(existingTag);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (GetCurrentUserProfile().UserTypeId != 1) { return Unauthorized(); }
            var existingTag = _repo.GetById(id);
            if (existingTag == null) { return BadRequest(); }
            _repo.Delete(id);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            try
            {
                var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
            catch
            {
                return null;
            }
        }
    }
}
