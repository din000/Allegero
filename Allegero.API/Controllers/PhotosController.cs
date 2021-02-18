using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Allegero.API.Data;
using Allegero.API.Models;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Tinderro.API.Dtos;
using Tinderro.API.Helpers;

// z nugetow instalujemy CloudinaryDotNet !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

namespace Tinderro.API.Controllers
{
    //[Authorize]
    [Route("api/user/photos/")]  
    [ApiController]
    public class PhotosController : ControllerBase
    {
        public IUserRepository _repository { get; set; }
        public IMapper _mapper { get; set; }
        public IOptions<ClaudinarySettings> _claudinaryConfig { get; set; }
        private Cloudinary _cloudinary;
        public PhotosController(IMapper mapper, IOptions<ClaudinarySettings> claudinary, IUserRepository repo)
        {
            _claudinaryConfig = claudinary;
            _mapper = mapper;
            _repository = repo;

            // to jest od biblioteki cloudinary bla bla
            Account account = new Account(
                _claudinaryConfig.Value.CloudName,
                _claudinaryConfig.Value.ApiKey,
                _claudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        [HttpPost("{userId}/{secondId}")]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm]PhotoForAddDto photoForAddDto, int ? secondId) // FromForm mowi skad zdjecie bedzie pochodzic
        {
            // sprawdza id z id z tokena
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
    
            var auction = await _repository.TakeEditingAuction(userId); 
 
            // UWAGA DZIWNE ponizsza nazwa file MUSI ZGADZAC SIE z nazwa w POSTMANIE z NAZWA ZDJECIA wtf xd
            var file = photoForAddDto.File;// zrobienie pliku z klasy PhotoForAddDto zeby dane moglybyc zczytane 
            var uploadResault = new ImageUploadResult(); // to ma byc na sztywno i tyle, pozniej bedzie wykorzystane to zwrocenia info o zdj

            if (file.Length > 0) // jezeli plik zostal wczytany
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()  // okreslamy parametry
                    {
                        File = new FileDescription(file.Name, stream), // przekazywane jest imie pliku i plik (stream)
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face") // szerokosc wysokosc wypelnienie i ze ma byc scenrtowane zdj na twarzy
                    };

                    uploadResault = _cloudinary.Upload(uploadParams); // uploadujemy z przekazaniem parametrow i w uploadResault beda zwrocone info z chmury
                }
            }

            photoForAddDto.Url = uploadResault.Uri.ToString();  // no i dajemy otrzymane id i url do naszej klasy ktora pozniej przeslemy
            photoForAddDto.PublicId = uploadResault.PublicId;

            var photo = _mapper.Map<Photo>(photoForAddDto); // mapujemy na photo z photoforadddto

            photo.SecondId = (int)secondId;

            if (auction.ItemPhotos == null)
            {
                photo.IsMain = true;
                photo.ItemId = auction.Id;
                _repository.Add(photo);
                // auction.ItemPhotos.Add(photo);
            }
            else
            {
                if (!auction.ItemPhotos.Any(p => p.IsMain)) // sprawdza czy JUZ jakies zdjecie jest glowne
                    photo.IsMain = true;

                auction.ItemPhotos.Add(photo);
            }   

            
            if (await _repository.SaveAll())
            {
                var photoForReturn = _mapper.Map<PhotoForReturnDto>(photo); 
                // return CreatedAtAction(nameof(GetPhoto), new { id = photo.Id }, photoForReturn);  // 1 argument to sciezka skad bedzie cos pobierane, 2 - przekazujemy id, 3 - zwracamy zdjecie
                return CreatedAtAction(nameof(GetPhoto), new { userId, id = photo.Id }, photoForReturn); // userId musimy tez przekazac, jest w glownym url tego kontrolera
                // return CreatedAtAction(nameof(GetPhoto), new {id = photo.Id});

                // UWAGAAAAAAAAAAAAAAAAAA jezeli tego returna z createataction nie bedzie to nie bedzie dzialac
                // cos w angularze, cos co powoduje ze zdj po uploadzie OD RAZU sie pojawiaja i nie trzeba odswiezac
            }

            return BadRequest("Nie mozna dodac zdj");
        }


        //[HttpGet("{id}", Name = "GetPhoto")]  // musi byc tak bo createdatroute nie dziala :)
        //[HttpGet("{id}")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromDatabase = await _repository.GetPhoto(id);
            // return photoFromDatabase; nie da sie wiec trzeba mapowac

            var photoForReturn = _mapper.Map<PhotoForReturnDto>(photoFromDatabase);
            return Ok(photoForReturn);
        }

        [HttpPost("{userId}/{auctionId}/{photoId}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int auctionId, int photoId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var auction = await _repository.GetAuction(auctionId);

            if (auction.ItemPhotos == null) // jezeli nie ma zdjec
                return BadRequest();

            var photo = await _repository.GetPhoto(photoId);

            if (photo.IsMain)
                return BadRequest("To zdj jest juz glowne");

            var currentMainPhoto = await _repository.GetMainPhoto(auctionId);
            currentMainPhoto.IsMain = false;
            photo.IsMain = true;

            if (await _repository.SaveAll())
                return NoContent();

            return BadRequest("Nie mozna ustawic zdj jako glownego");
        }

        // ustawia secondId dla zdj (zeby bylo ladnie w opisie aukcji)
        [HttpPost("{userId}/{auctionId}/secondId/{secondId}")]
        public async Task<IActionResult> SetSecondId(int auctionId, int secondId, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var lastPhoto = await _repository.GetLastAuctionPhoto(userId);
            lastPhoto.SecondId = secondId;

            if (await _repository.SaveAll())
                return NoContent();

            return BadRequest("Nie da sie ustawic secondId");
        }

        [HttpDelete("{userId}/{id}")]
        public async Task<IActionResult> Delete(int userId, int id)
        {
             if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var auction = await _repository.TakeEditingAuction(userId);

            if (!auction.ItemPhotos.Any(p => p.Id == id)) // jezeli nie ma zdjec
                return Unauthorized();

            var photo = await _repository.GetPhoto(id);

            // if (photo.IsMain)
            //     return BadRequest("Nie mozna usunac glosnego zdj");

            // ------------------------------

            if (photo.PublicId != null) // jezeli zdj ma publicId tzn ze jest w cloudinary wiec trzeba je z tamtad usunac
            {
                var deleteParams = new DeletionParams(photo.PublicId); // do tego TRZEBA przekazac ID takie jakie jest w cloudinary!
                var result = _cloudinary.Destroy(deleteParams); // rezultat bedzie zwracal OK

                if (result.Result == "ok")
                    _repository.Delete(photo);
            }
            
            if (photo.PublicId == null)
                _repository.Delete(photo);

            if (await _repository.SaveAll())
                return Ok();

            return BadRequest("Nie udalo sie usunac zdj");
        }

    }
}