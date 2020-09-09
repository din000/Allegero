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
        public decimal ? NewestPrice { get; set; }
        public int Quantity { get; set; } // ilosc
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }

        // info do okazji (czy jest i ile czasu bla bla)
        public bool IsOccasion { get; set; }
        public DateTime ? WhenOccasionWasStarted { get; set; }

        // kolekcja zdj danej rzeczy
        public ICollection<Photo> ItemPhotos { get; set; }
        
        // 2 linijki do wyswietlenia powiazanego userka
        public int SellerId { get; set; }
        public User Seller { get; set; }
        
        public int ? BuyerId { get; set; }
        public User Buyer { get; set; }

        // glowne informacje o laptopach
        public string Proccesor { get; set; }
        public bool HaveDedictedCard { get; set; }
        public string GraphicCard { get; set; }
        public int RAM { get; set; }

        // wiecej informacji o przedmiocie
        public string Condition { get; set; }
        // public string Facture { get; set; }
        // public string Color { get; set; }
        // public double Weight { get; set; }
        // public string Size { get; set; }
        // public string CameFrom { get; set; }

        // kategoria
        public string Category { get; set; }
        
        // czy auckja jest w AKTUALNIE w edycji
        public bool IsEditing { get; set; }
      
    }
}