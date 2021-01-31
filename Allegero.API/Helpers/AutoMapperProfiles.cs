using System.Linq;
using Allegero.API.Dtos;
using Allegero.API.Models;
using AutoMapper;
using Tinderro.API.Dtos;

namespace Allegero.API.Helpers
{
    public class AutoMapperProfiles : Profile // profile to cos z automappera
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForRegisterDto>();
            CreateMap<User, UserForLocalStorageDto>();
            CreateMap<User, UserForDetailedDto>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<ItemForCreateDto, Item>();
            CreateMap<PhotoForAddDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<itemForUpdate, Item>(); // to cos nie dziala ;/
        }
    }
}