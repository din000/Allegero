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

        [HttpGet("many/{number}")]
        public async Task<IActionResult> GetManyAuctions(int number)
        {
            var auctions = await _repository.GetManyAuctions(number);

            return Ok(auctions);
        }

        [HttpGet("auction/{auctionId}")]
        public async Task<IActionResult> GetAuction(int auctionId)
        {
            var auction = await _repository.GetAuction(auctionId);

            return Ok(auction);
        }

        [HttpGet("occasion")]
        public async Task<IActionResult> GetOccasion()
        {
            var occasion = await _repository.GetOccasion();

            return Ok(occasion);
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repository.GetUser(id);

            return Ok(user);
        }

        [HttpPost("default/{userId}")]
        public async Task<IActionResult> MakeDefaultAuction(int userId, string makeOrNot)
        {
            if (makeOrNot == "Make")
            {
                var auction = await _repository.MakeDefaultAuction(userId);
                return Ok(auction);
            }             
            else
            {
                await _repository.DeleteEditingAuction(userId);
                return Ok();
            }          
        }
    }
}