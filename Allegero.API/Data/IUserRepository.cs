using System.Collections.Generic;
using System.Threading.Tasks;
using Allegero.API.Models;

namespace Allegero.API.Data
{
    public interface IUserRepository 
    {
        Task<IEnumerable<Item>> GetAuctions();
        Task<Item> GetAuction(int auctionId);
    }
}