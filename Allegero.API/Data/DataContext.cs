using Allegero.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Allegero.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { 
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // builder.Entity<Like>().HasKey(k => new { k.UserLikesId, k.SomeoneLikesMeId}); // ustawienie kluczy glownych do tabeli Likes


            builder.Entity<Item>().HasOne(u => u.Seller).WithMany(u => u.ItemsToSell)
                                    .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Item>().HasOne(u => u.Buyer).WithMany(u => u.BoughtItems)
                                  .OnDelete(DeleteBehavior.Restrict);   
        }
    }
}