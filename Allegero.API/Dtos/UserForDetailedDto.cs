using System.Collections.Generic;
using Allegero.API.Models;

namespace Allegero.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PublicPhotoID { get; set; } // zdj uzytkownika
        public ICollection<Item> ItemsToSell { get; set; } // kolekcja rzeczy ktore sprzedaje
        public ICollection<Item> BoughtItems { get; set; } // kolekcja rzeczy ktore kupil
    }
}