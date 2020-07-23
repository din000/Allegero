using System.ComponentModel.DataAnnotations;

namespace Allegero.API.Dtos
{
    public class UserForRegisterDto
    {
         public UserForRegisterDto()
        {
            // Created = DateTime.Now;
            // LastActive = DateTime.Now;
        }

        [Required(ErrorMessage="Nazwa użytkownika jest wymagana")]
        public string Username { get; set; }

        [Required(ErrorMessage="Haslo jest wymagane")]
        [StringLength(12, MinimumLength=6,  ErrorMessage="Hasło musi składać się od 4 do 12 znaków")]
        public string Password { get; set; }
    }
}
