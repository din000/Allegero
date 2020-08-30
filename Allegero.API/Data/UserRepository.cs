using System;
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

        public async Task<IEnumerable<Item>> GetManyAuctions(int number)
        {
            var auctions = _context.Items.Take(number).Include(p => p.ItemPhotos).AsQueryable();
            return auctions;
        }

        public async Task<User> GetUser(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            return user;
        }

        public async Task<Item> GetOccasion()
        {
            // petla sprawdza czy okazja nie przeterminowala sie, jezeli przeterminowana to zmienia status okazji na false
            do
            {
                DateTime currDate = DateTime.Now;
                var occasion = await _context.Items.Include(p => p.ItemPhotos).FirstOrDefaultAsync(i => i.IsOccasion == true);

                if (currDate.CompareTo(occasion.WhenOccasionWasStarted) == 1)
                {
                    occasion.IsOccasion = false;
                    _context.Items.Update(occasion);
                    await _context.SaveChangesAsync();
                }
                if (currDate.CompareTo(occasion.WhenOccasionWasStarted) == 0)
                {
                     occasion.IsOccasion = false;
                    _context.Items.Update(occasion);
                    await _context.SaveChangesAsync();
                }
                if (currDate.CompareTo(occasion.WhenOccasionWasStarted) == -1)
                {
                    return occasion;
                }
            } while (true);
        }
    }
}