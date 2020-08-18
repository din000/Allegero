using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Allegero.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Allegero.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Item> GetAuction(int auctionId)
        {
            var auction = await _context.Items.FirstOrDefaultAsync(i => i.Id == auctionId);

            return auction;
        }

        public async Task<IEnumerable<Item>> GetAuctions()
        {
            var auctions = _context.Items.AsQueryable();
            return auctions;
        }

        public async Task<User> GetUser(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            return user;
        }

        public async Task<Item> GetOccasion()
        {
            var occasion = await _context.Items.Include(p => p.ItemPhotos).FirstOrDefaultAsync(i => i.IsOccasion == true);
            return occasion;
        }
    }
}