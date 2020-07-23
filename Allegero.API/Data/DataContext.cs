using Allegero.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Allegero.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { 
        }
        public DbSet<User> users { get; set; }
        public DbSet<Item> items { get; set; }
        public DbSet<Photo> photos { get; set; }
    }
}