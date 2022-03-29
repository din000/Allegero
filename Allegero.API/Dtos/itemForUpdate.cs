using System;
using System.Collections.Generic;
using Allegero.API.Models;

namespace Allegero.API.Dtos
{
    public class itemForUpdate
    {
        public itemForUpdate()
        {
            NewestPrice = null;
        }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal ? NewestPrice { get; set; }
        public int Quantity { get; set; } // ilosc


        // info do okazji (czy jest i ile czasu bla bla)
        public string IsOccasion { get; set; }
        public DateTime ? WhenOccasionWasStarted { get; set; } 
        // kolekcja zdj danej rzeczy
        // public ICollection<Photo> ItemPhotos { get; set; }

        // glowne informacje o laptopach
        public string Proccesor { get; set; }
        public string HaveDedictedCard { get; set; }
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

        // czy jest edytowana
        public int IsEditing { get; set; }

        // opis
        public int NumberOfDescParts { get; set; }
        public int Part1 { get; set; }
        public int Part2 { get; set; }
        public int Part3 { get; set; }
        public int Part4 { get; set; }
        public int Part5 { get; set; }
        public string P1_Desc { get; set; }
        public string P2_Desc { get; set; }
        public string P3_Desc { get; set; }
        public string P4_Desc { get; set; }
        public string P5_Desc { get; set; }
    }
}