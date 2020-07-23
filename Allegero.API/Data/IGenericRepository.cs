using System.Threading.Tasks;

namespace Allegero.API.Data
{
    public interface IGenericRepository
    {
        // interfejsik bedzie do dodawania usuwania aukcji i do potwierdzania zapisu na bazie danych
        void Add<T>(T entity) where T:class;
        void Delete<T>(T entity) where T:class;
        Task<bool> SaveAll();
    }
}