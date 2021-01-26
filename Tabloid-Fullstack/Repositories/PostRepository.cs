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
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostSummary> Get()
        {
            return _context.Post
                .Include(p => p.Category)
                .Where(p => p.IsApproved)
                .Where(p => p.PublishDateTime <= DateTime.Now)
                .OrderByDescending(p => p.PublishDateTime)
                .Select(p => new PostSummary()
                {
                    Id = p.Id,
                    ImageLocation = p.ImageLocation,
                    Title = p.Title,
                    AuthorId = p.UserProfileId,
                    AuthorName = p.UserProfile.DisplayName,
                    AbbreviatedText = p.Content.Substring(0, 200),
                    PublishDateTime = p.PublishDateTime,
                    Category = p.Category,
                    Content = p.Content,
                    IsApproved = p.IsApproved
                })
                .ToList();
        }
        //retrieves the four most recent posts for the homepage
        public List<PostSummary> GetTopFourPosts()
        {
            return _context.Post
                .Include(p => p.Category)
                .Where(p => p.IsApproved)
                .Where(p => p.PublishDateTime <= DateTime.Now)
                .OrderByDescending(p => p.PublishDateTime)
                .Select(p => new PostSummary()
                {
                    Id = p.Id,
                    ImageLocation = p.ImageLocation,
                    Title = p.Title,
                    AuthorId = p.UserProfileId,
                    AuthorName = p.UserProfile.DisplayName,
                    AbbreviatedText = p.Content.Substring(0, 200),
                    PublishDateTime = p.PublishDateTime,
                    Category = p.Category,
                    Content = p.Content,
                    IsApproved = p.IsApproved
                })
                .Take(4)
                .ToList();
        }

        public Post GetById(int id)
        {
            return _context.Post
                .Include(p => p.UserProfile)
                .Include(p => p.Category)
                .Include(p => p.PostTags)
                .ThenInclude(pt => pt.Tag)
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }
        public List<PostSummary> GetByNotApproved()
        {
            return _context.Post
                .Include(p => p.UserProfile)
                .Include(p => p.Category)
                .Include(p => p.PostTags)
                .ThenInclude(pt => pt.Tag)
                .Where(p => p.IsApproved == false)
                .Select(p => new PostSummary()
                {
                    Id = p.Id,
                    ImageLocation = p.ImageLocation,
                    Title = p.Title,
                    AuthorId = p.UserProfileId,
                    AuthorName = p.UserProfile.DisplayName,
                    AbbreviatedText = p.Content.Substring(0, 200),
                    PublishDateTime = p.PublishDateTime,
                    Category = p.Category,
                    Content = p.Content,
                    IsApproved = p.IsApproved
                })
                .ToList();
        }
        public List<Post> GetByApproved()
        {
            return _context.Post
                .Include(p => p.UserProfile)
                .Include(p => p.Category)
                .Include(p => p.PostTags)
                .ThenInclude(pt => pt.Tag)
                .Where(p => p.IsApproved == true)
                .ToList();
        }

        public List<Post> GetByUserId(int id)
        {
            return _context.Post
               .Include(p => p.UserProfile)
               .Include(p => p.Category)
               .Include(p => p.PostTags)
               .ThenInclude(pt => pt.Tag)
               .Where(p => p.UserProfileId == id)
               .ToList();
        }

        public List<Tag> FilterTagsByPostId(int id, List<Tag> tags)
        {
            var allTags = _context.Tag.OrderBy(t => t.Name).ToList();
            var filteredTags = allTags.FindAll(tag => !tags.Contains(tag));
            return filteredTags;
        }
        public List<ReactionCount> GetReactionCounts(int postId)
        {
            return _context.Reaction
                .Select(r => new ReactionCount()
                {
                    Reaction = r,
                    Count = r.PostReactions.Count(pr => pr.PostId == postId)
                })
                .ToList();
        }

        public List<PostReaction> GetPostReactionsByPost(int postId)
        {
            return _context.PostReaction
                .Where(pr => pr.PostId == postId)
                .ToList();
        }

        public void Add(Post post)
        {
            _context.Add(post);
            _context.SaveChanges();
        }
        public void AddTagToPost(PostTag postTag)
        {
            _context.Add(postTag);
            _context.SaveChanges();
        }
        public void RemoveTagFromPost(PostTag postTag)
        {
            _context.Remove(postTag);
            _context.SaveChanges();
        }
        public PostTag GetPostTagById(int id)
        {
            var postTag = _context.PostTag.FirstOrDefault(pt => pt.Id == id);
            return postTag;
        }

        public void AddReaction(PostReaction postReaction)
        {
            _context.Add(postReaction);
            _context.SaveChanges();
        }

        public void Update(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var post = GetById(id);
            var reactions = _context.PostReaction.Where(pr => pr.PostId == post.Id).ToList();
            foreach (var r in reactions)
            {
                _context.PostReaction.Remove(r);
            }
            _context.Post.Remove(post);
            _context.SaveChanges();
        }

        public List<PostSummary> Search(string searchTerm)

        {
            return _context.Post
                .Include(p => p.Category)
                .Where(p => p.IsApproved)
                .Where(p => p.PublishDateTime <= DateTime.Now)
                .Where(p => p.Title.Contains(searchTerm) || p.Category.Name.Contains(searchTerm))
                .OrderByDescending(p => p.PublishDateTime)
                .Select(p => new PostSummary()
                {
                    Id = p.Id,
                    ImageLocation = p.ImageLocation,
                    Title = p.Title,
                    AuthorId = p.UserProfileId,
                    AuthorName = p.UserProfile.DisplayName,
                    AbbreviatedText = p.Content.Substring(0, 200),
                    PublishDateTime = p.PublishDateTime,
                    Category = p.Category,
                    Content = p.Content,
                    IsApproved = p.IsApproved
                })
                .ToList();

        }


        public List<PostSummary> GetPostsByTagId(int tagId)
        {
            return _context.PostTag
            .Include(pt => pt.Post)
            .ThenInclude(p => p.Category)
            .Where(pt => pt.TagId == tagId)
                    .Where(pt => pt.Post.IsApproved)
                    .Where(pt => pt.Post.PublishDateTime <= DateTime.Now)
                    .OrderByDescending(pt => pt.Post.PublishDateTime)
                    .Select(pt => new PostSummary()
                    {
                        Id = pt.Post.Id,
                        ImageLocation = pt.Post.ImageLocation,
                        Title = pt.Post.Title,
                        AuthorId = pt.Post.UserProfileId,
                        AuthorName = pt.Post.UserProfile.DisplayName,
                        AbbreviatedText = pt.Post.Content.Substring(0, 200),
                        PublishDateTime = pt.Post.PublishDateTime,
                        Category = pt.Post.Category,
                        Content = pt.Post.Content,
                        IsApproved = pt.Post.IsApproved
                    })
                    .ToList();
        }



    }
}
