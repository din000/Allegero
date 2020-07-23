using System;
using System.Collections.Generic;

namespace Allegero.API.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }

        // kolekcja zdj danej rzeczy
        public ICollection<Photo> ItemPhotos { get; set; }
        
        // 2 linijki do wyswietlenia powiazanego userka
        public User User { get; set; }
        public int UserId { get; set; }
    }
}