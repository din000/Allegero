using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Allegero.API.Data;
using Allegero.API.Dtos;
using Allegero.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Allegero.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LoggedUserController : ControllerBase
    {
        private readonly ILoggedUserRepository _LoggedRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _UserRepository;
        public LoggedUserController(ILoggedUserRepository LoggedRepository,
                                    IMapper mapper,
                                    IUserRepository repository)
        {
            _LoggedRepository = LoggedRepository;
            _mapper = mapper;
            _UserRepository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> AddAuction(ItemForCreateDto itemForCreateDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var seller = await _UserRepository.GetUser(userId);

            itemForCreateDto.SellerId = userId;

            var item = _mapper.Map<Item>(itemForCreateDto);

             _LoggedRepository.Add(item);

            if (await _LoggedRepository.SaveAll())
                return Ok();

            throw new Exception("Nie mozna dodac aukcji :(");
        }
    }
}