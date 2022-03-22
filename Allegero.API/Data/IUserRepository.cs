using System.Collections.Generic;
using System.Threading.Tasks;
using Allegero.API.Models;

namespace Allegero.API.Data
{
    public interface IUserRepository : IGenericRepository
    {
        Task<IEnumerable<Item>> GetAuctions();
        Task<IEnumerable<Item>> GetManyAuctions(int number);
        Task<Item> GetAuction(int auctionId);
        Task<User> GetUser(int userId);
        Task<Item> GetOccasion();
        Task<Item> MakeDefaultAuction(int userId);
        Task<Item> TakeEditingAuction(int userId);
        Task DeleteEditingAuction(int userId);
        Task<Photo> GetPhoto(int photoId);
        Task<Photo> GetMainPhoto(int auctionId);
        Task<Photo> GetLastAuctionPhoto(int auctionId);
        Task<Item> AddItem(Item item);
        Task<IEnumerable<Product_Categories>> GetProduct_Categories();
    }
}