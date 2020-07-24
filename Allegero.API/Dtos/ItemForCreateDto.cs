using System;

namespace Allegero.API.Dtos
{
    public class ItemForCreateDto
    {
        public ItemForCreateDto()
        {
            DateAdded = DateTime.Now;
        }
        public int SellerId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; } // ilosc
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
    }
}