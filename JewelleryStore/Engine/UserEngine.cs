using JewelleryStore.Model.Request;
using JewelleryStore.Model.Response;
using JewelleryStore.Model.Options;
using JewelleryStore.Repository;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JewelleryStore.Engine
{
    public interface IUserEngine : IDisposable
    {
        UserAuthenticationResponse AuthenticateUser(UserAuthenticationRequest request);
    }

    public class UserEngine: IUserEngine
    {
        private IUserRepository userRepository;
        private readonly IJwtSettings jwtSettings;
        public UserEngine(IUserRepository _userRepository, IJwtSettings _jwtSettings)
        {
            userRepository = _userRepository;
            jwtSettings = _jwtSettings;
        }

        public UserAuthenticationResponse AuthenticateUser(UserAuthenticationRequest request)
        {
            var user = userRepository.GetUserByEmail(request.Email);

            if (user == null)
                return null;

            if(!VerifyPassword(request.Password,user.Password))
            {
                return null;
            }

            var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.FirstName.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(descriptor);

            return new UserAuthenticationResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role,
                Token = tokenHandler.WriteToken(token)
            };
        }

        private bool VerifyPassword(string requestedPassword, string encryptedPassword)
        {
            if (encryptedPassword == EncryptPassword(requestedPassword))
                return true;
            return false;
        }

        private string EncryptPassword(string password)
        {
            // Here, we can use some hashing technique to generate a password hash.
            // This method can be used both in case of User-Registrations and User-Authentication
            return password;
        }

        #region dispose-method

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool isDisposing)
        {
            if (!isDisposing)
                return;

            if(userRepository != null)
            {
                userRepository.Dispose();
                userRepository = null;
            }
        }

        #endregion
    }
}
