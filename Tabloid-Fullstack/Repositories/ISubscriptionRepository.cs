using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ISubscriptionRepository
    {
        void Add(Subscription subscription);
        List<Post> GetByAuthor(int id);
    }
}
