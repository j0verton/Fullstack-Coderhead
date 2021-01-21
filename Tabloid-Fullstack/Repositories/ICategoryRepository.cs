using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> Get();
        void Add(Category category);
        Category GetById(int id);
        void Update(Category category);
        void Delete(int id);
    }
}