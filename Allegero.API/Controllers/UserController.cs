using System.Threading.Tasks;
using Allegero.API.Data;
using Allegero.API.Dtos;
using Allegero.API.Models;
using AutoMapper;
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
        private readonly IMapper _mapper;
        public UserController(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
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

        [HttpGet("default/{userId}")]
        public async Task<IActionResult> MakeDefaultAuction(int userId, [FromQuery] MakeOrDeleteDefaultAuction param)
        {
            if (param.makeOrDelete == "make")
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

        [HttpGet("asd/{userId}")]
        public async Task<IActionResult> chuj(int userId)
        {
            var auction = await _repository.TakeEditingAuction(userId);
            return Ok(auction);
        }

        [HttpGet("editingAuction/{userId}")]
        public async Task<IActionResult> TakeEditingAuction(int userId)
        {
            var editingAuction = await _repository.TakeEditingAuction(userId);
            return Ok(editingAuction);
        }

        [HttpPost("addItem")]
        public async Task<IActionResult> AddItem(ItemForCreateDto itemForCreateDto)
        {
            var item = _mapper.Map<Item>(itemForCreateDto);
            await _repository.AddItem(item);
            return Ok();
        }
    }
}