using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Allegero.API.Data;
using Allegero.API.Dtos;
using Allegero.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Allegero.API.Controllers
{
    [ApiController] //jezeli zakomentujemy to to juz nie bedzie apicontroller tylko zwykly MVC controller (jezeli byloby MVC to patrz dalej co sie dzieje bo bylyby zmiany)
    [Route("api/[controller]")]
    public class AuthController : ControllerBase // ControllesBase nie wspiera widokow i dobrze bo chcemy aplikacje lekka a widok bedzie w angularze
    {                                            // "Controller" wspiera widoki i uzylibysmy tego do stworzenia aplikacji bez Angulara
        
        private readonly IAuthRepository _repository;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repository,
                                IConfiguration config,
                                IMapper mapper) //IConfiguration ejst po to zeby odwolac sie do appsettings.json
        {
            _repository = repository;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username.ToLower();

            if(await _repository.UserExist(userForRegisterDto.Username))
                return BadRequest("Użytkownik o podanej nazwie już istnieje!");
            
            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);

            // var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser); // mapujemy na UserForDetailedDto zeby nie przekezywac info o np hasle 

            return StatusCode(201);
            // return CreatedAtRoute("GetUser", new { controller = "Users", Id = createdUser.Id}, userToReturn); // controller = "Users" - ten fragment kodu JEST TYLKO INFORMACYJNY z jakiego kontrolera korzystamy
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLogin)
        {
            var userFromRepo = await _repository.Login(userForLogin.Username.ToLower(), userForLogin.Password);

            if (userFromRepo == null)
                return Unauthorized();

            // stworzenie tokena
            var claims = new[] // jakies poswiadczenia
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value)); // "AppSetting: Token" musi byc w appsettings.json

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(300),
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserForLocalStorageDto>(userFromRepo); // mapowanie dla bajerku ze cos sie umie xd

            return Ok(new 
            {
                // te nazwy beda pozniej zapisywane w angularze w localStorage
                token = tokenHandler.WriteToken(token),
                user
            });
        }
    }
}