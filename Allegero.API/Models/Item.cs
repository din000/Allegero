using System;
using System.Collections.Generic;

namespace Allegero.API.Models
{
    public class Item
    {
        public Item()
        {
            DateAdded = DateTime.Now;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal NewestPrice { get; set; }
        public int Quantity { get; set; } // ilosc
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }

        // info do okazji (czy jest i ile czasu bla bla)
        public bool IsOccasion { get; set; }
        public DateTime WhenOccasionWasStarted { get; set; }

        // kolekcja zdj danej rzeczy
        public ICollection<Photo> ItemPhotos { get; set; }
        
        // 2 linijki do wyswietlenia powiazanego userka
        public int SellerId { get; set; }
        public User Seller { get; set; }
        
        public int ? BuyerId { get; set; }
        public User Buyer { get; set; }
        

    }
}