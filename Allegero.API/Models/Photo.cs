namespace Allegero.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        // 2 linijki do wyswietlenia powiazanej rzeczy
        public Item Item { get; set; }
        public int ItemId { get; set; }

        // do opisu pod aukja
        public int SecondId { get; set; }
    }
}