using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Category> Get()
        {
            return _context.Category.OrderBy(c => c.Name).ToList();
        }

        public void Add(Category category)
        {
            _context.Add(category);
            _context.SaveChanges();
        }
        public Category GetById(int id)
        {
            return _context.Category.Where(c => c.Id == id).FirstOrDefault();
        }
        public void Update(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var cat = GetById(id);
            _context.Category.Remove(cat);
            _context.SaveChanges();
        }
    }
}
