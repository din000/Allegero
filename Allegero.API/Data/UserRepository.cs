using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Allegero.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Allegero.API.Data
{
    public class UserRepository : GenericRepository, IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Item> GetAuction(int auctionId)
        {
            var auction = await _context.Items.Include(p => p.ItemPhotos).FirstOrDefaultAsync(i => i.Id == auctionId);

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

        public async Task<Item> MakeDefaultAuction(int userId)
        {
             // sprawdza czy juz jest jakas edytowana aukcja
            var isAuctionEditing = await _context.Items.FirstOrDefaultAsync(x => x.IsEditing == true && x.SellerId == userId);
            if (isAuctionEditing != null)
                throw new Exception("Aktualnie dodajesz juz aukcje, dokoncz ja albo anuluj");

            var auction = new Item();
            auction.Name = "Default";
            auction.Price = 0;
            auction.Quantity = 0;
            auction.Description = "Default";
            auction.DateAdded = DateTime.Now;
            auction.IsOccasion = false;
            auction.SellerId = userId;
            auction.Category = "Default";
            auction.HaveDedictedCard = false;
            auction.RAM = 0;
            auction.Condition = "Default";
            auction.IsEditing = true;

            Add(auction);
            if (await SaveAll())
                return auction;
            
            throw new Exception("Cos poszlo nie tak z dodaniem aukcji");
        }

        public async Task<Item> TakeEditingAuction(int userId)
        {
            var auction = await _context.Items.FirstOrDefaultAsync(x => x.SellerId == userId && x.IsEditing == true);
            return auction;         
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photoFromDataBase = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photoFromDataBase;
        }

        public async Task<Photo> GetMainPhoto(int auctionId)
        {
            return await _context.Photos.Where(u => u.ItemId == auctionId).FirstOrDefaultAsync(i => i.IsMain);
        }
    }
}