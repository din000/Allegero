using System.Collections.Generic;

namespace Allegero.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string PublicPhotoID { get; set; } // zdj uzytkownika
        public ICollection<Item> ItemsToSell { get; set; } // kolekcja rzeczy ktore sprzedaje
        public ICollection<Item> BoughtItems { get; set; } // kolekcja rzeczy ktore kupil
        
    }
}