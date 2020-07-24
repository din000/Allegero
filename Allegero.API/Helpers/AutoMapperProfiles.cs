using System.Linq;
using Allegero.API.Dtos;
using Allegero.API.Models;
using AutoMapper;

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
        }
    }
}