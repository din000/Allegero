using System.Collections.Generic;
using System.Threading.Tasks;
using Allegero.API.Models;

namespace Allegero.API.Data
{
    public class LoggedUserRepository : GenericRepository, ILoggedUserRepository
    {
        private readonly DataContext _context;
        public LoggedUserRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}