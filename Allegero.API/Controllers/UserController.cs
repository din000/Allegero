using System.Threading.Tasks;
using Allegero.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Allegero.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        public UserController(IUserRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAuctions()
        {
            var auctions = await _repository.GetAuctions();

            return Ok(auctions);
        }

        [HttpGet("{auctionId}")]
        public async Task<IActionResult> GetAuction(int auctionId)
        {
            var auction = await _repository.GetAuction(auctionId);

            return Ok(auction);
        }
    }
}