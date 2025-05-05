/**
 * This file is part of the Sandy Andryanto Blog Application.
 *
 * @author     Sandy Andryanto <sandy.andryanto.blade@gmail.com>
 * @copyright  2025
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

using backend.Models.DTO;
using backend.Models.Entities;
using backend.Models.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Dynamic.Core.Tokenizer;
using System.Security.Claims;
using System.Text;

namespace backend.Models.Repositories.Implements
{
    public class UserService : IUserRepository
    {
        private readonly IActivityRepository _activityRepository;
        private readonly AppDbContext _db;
        private readonly SettingDTO _appSettings;
        private static string defaultPassword = "Qwerty123!";
        private static int maxUser = 10;

        public UserService(IOptions<SettingDTO> appSettings, AppDbContext db, IActivityRepository activityRepository)
        {
            _db = db;
            _appSettings = appSettings.Value;
            _activityRepository = activityRepository;
        }

        public void CreateInitial()
        {
            int Total = _db.User.Count();
            int Max = maxUser;

            if (Total == 0)
            {
                for(int i = 1; i <= Max; i++)
                {
                    List<String> Genders = new List<string> { "M", "F" };
                    string Gender = Genders.OrderBy(s => Guid.NewGuid()).First();
                    string JobName = JobTitle.GetData().OrderBy(s => Guid.NewGuid()).First();
                    string Email = Faker.Internet.Email();
                    string Password = BCrypt.Net.BCrypt.HashPassword(defaultPassword);
                    User user = new User() { Email = Email, Password = Password };
                    user.Phone = Faker.Phone.Number().ToString();
                    user.Status = 1;
                    user.FirstName = Faker.Name.First();
                    user.LastName = Faker.Name.Last();
                    user.Gender = Gender;
                    user.Country = Faker.Address.Country();
                    user.Address = Faker.Address.StreetAddress();
                    user.City = Faker.Address.City();
                    user.ZipCode = Faker.Address.ZipCode();
                    _db.Add(user);

                    Authentication at = new Authentication() { User = user };
                    at.Status = 1;
                    at.ExpiredAt = DateTime.UtcNow;
                    at.Credential = Email;
                    at.Token = System.Guid.NewGuid().ToString();
                    at.Type = "email";
                    _db.Add(at);

                }
                _db.SaveChanges();
            }

        }

        public User GetById(long Id)
        {
            return _db.User.Where(x => x.Id == Id).OrderByDescending(x => x.Id).FirstOrDefault();
        }

        public User GetByEmail(String Email, long Id)
        {
            return _db.User.Where(x => x.Email == Email && x.Id != Id).OrderByDescending(x => x.Id).FirstOrDefault();
        }

        public User GetByPhone(String Phone, long Id)
        {
            return _db.User.Where(x => x.Phone == Phone && x.Id != Id).OrderByDescending(x => x.Id).FirstOrDefault();
        }

        public Authentication GetByCredential(String Crendetial, String Type)
        {
            return _db.Authentication.Where(x => x.Type == Type && x.Credential == Crendetial && x.Status == 0).OrderByDescending(x => x.Id).FirstOrDefault();
        }

        public Authentication GetByConfirmToken(String Token)
        {
            return _db.Authentication.Where(x => x.Type == "email" && x.Token == Token && x.Status == 0).OrderByDescending(x => x.Id).FirstOrDefault();
        }

        public Authentication GetByResetToken(String Token, String Email)
        {
            return _db.Authentication.Where(x => x.Type == "password" && x.Token == Token && x.Status == 0).OrderByDescending(x => x.Id).FirstOrDefault();
        }

        public UserAuthDTO Authenticate(UserLoginDTO model)
        {
            var user = (from u in _db.User where u.Email == model.Email select u).SingleOrDefault();

            // return null if user not found
            if (user == null)
            {
                return null;
            }

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return null;
            }

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            if(user != null)
            {
                _activityRepository.SaveActivity(user, "Sign In", "Sign In To Application", "Your has been logged in an application.");
            }

            return new UserAuthDTO(user, token);
        }

        public User Register(UserRegisterDTO model)
        {

            String FullName = model.Name;
            string[] Names = FullName.Split(" ");
            String FirstName = Names.FirstOrDefault();
            String LastName = null;

            if (Names.Length > 1)
            {
                LastName = String.Join(" ", Names.Skip(1));
            }
            

            User NewUser = new User()
            {
                FirstName = FirstName,
                LastName = LastName,
                Email = model.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(model.Password)
            };

            // return null if user not found
            if (NewUser == null)
            {
                return null;
            }

           
            _db.User.Add(NewUser);
            _db.SaveChanges();

            if (NewUser != null)
            {
                Authentication at = new Authentication() { User = NewUser };
                at.Type = "email";
                at.Status = 0;
                at.Credential = model.Email;
                at.ExpiredAt = DateTime.UtcNow.AddMinutes(30);
                at.Token = System.Guid.NewGuid().ToString();
                _db.Add(at);
                _db.SaveChanges();

                _activityRepository.SaveActivity(NewUser, "Sign Up", "Sign Up To Application", "Your has been registered in an application.");
            }

            return NewUser;
        }

        public User ForgotPassword(UserForgotDTO model)
        {
            User User = GetByEmail(model.Email, 0);

            // return null if user not found
            if (User == null)
            {
                return null;
            }

            if (User != null)
            {

                Authentication at = new Authentication() { User = User };
                at.Type = "password";
                at.Status = 0;
                at.Credential = model.Email;
                at.ExpiredAt = DateTime.UtcNow.AddMinutes(30);
                at.Token = System.Guid.NewGuid().ToString();
                _db.Add(at);
                _db.SaveChanges();
                _activityRepository.SaveActivity(User, "Reset Password", "Send Request Reset Password", "Your has been sent a request reset password.");
            }

            return User;
        }

        public User ResetPassword(String Token, UserResetPasswordDTO model)
        {
            User User = GetByEmail(model.Email, 0);

            // return null if user not found
            if (User == null)
            {
                return null;
            }

            User.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
            User.Status = 1;
           
            Authentication at = _db.Authentication.Where(x => x.Token == Token).FirstOrDefault();

            if (at == null)
            {
                return null;
            }

            at.Status = 2;
            at.ExpiredAt = DateTime.UtcNow;

            _db.Update(User);
            _db.Update(at);
            _db.SaveChanges();
            _activityRepository.SaveActivity(User, "Reset Password", "Update Current Password", "Your has been changed a current password.");

            return User;
        }

        public User Confirmation(String Token)
        {
        
            Authentication at = _db.Authentication.Where(x => x.Token == Token).FirstOrDefault();

            if (at == null)
            {
                return null;
            }

            User User = GetByEmail(at.Credential, 0);

            // return null if user not found
            if (User == null)
            {
                return null;
            }

            User.Status = 1;

            at.Status = 2;
            at.ExpiredAt = DateTime.UtcNow;

            _db.Update(User);
            _db.Update(at);
            _db.SaveChanges();
            _activityRepository.SaveActivity(User, "Confirmation", "E-mail Confirmation", "Your has been confirmed a registration account.");

            return User;
        }

        public User ChangePassword(User user, UserChangePasswordDTO model)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
            _db.Update(user);
            _db.SaveChanges();

            if (user != null)
            {
                _activityRepository.SaveActivity(user, "Change Password", "Update Current User Password", "Your has been updated current password.");
            }

            return user;
        }

        public User ChangeProfile(User user, UserChangeProfileDTO model)
        {
            user.Email = model.Email;
            user.Phone = model.Phone;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Gender = model.Gender;
            user.Country = model.Country;
            user.ZipCode = model.ZipCode;
            user.City = model.City;
            user.Address = model.Address;
            _db.Update(user);
            _db.SaveChanges();

            if (user != null)
            {
                _activityRepository.SaveActivity(user, "Update Profile", "Update Current User Profile", "Your has been updated current user profile.");
            }

            return user;
        }

        public void ChangeImage(User user, String Path)
        {
            user.Image = Path;

            _db.Update(user);
            _db.SaveChanges();

            if (user != null)
            {
                _activityRepository.SaveActivity(user, "Change Profile Image", "Update Current Profile Image", "Your has been updated current profile image.");
            }
        }

        public string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

     
    }
}
