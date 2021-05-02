using JewelleryStore.Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JewelleryStore.Repository
{
    public interface IUserRepository: IDisposable
    {
        User GetUserByEmail(string email);
    }

    public class UserRepository: IUserRepository
    {
        private List<User> users;
        public UserRepository()
        {
            LoadUsers();
        }

        public User GetUserByEmail(string email)
        {
            return users.FirstOrDefault(a => a.Email == email);
        }

        private void LoadUsers()
        {
            users = new List<User>
            {
                new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Normal",
                    LastName = "User",
                    Email = "normaluser@jstore.com",
                    Password = "password",
                    Role = "Normal"
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Previleged",
                    LastName = "User",
                    Email = "previlegeduser@jstore.com",
                    Password = "password",
                    Role = "Previleged"
                }
            };
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
        }

        #endregion
    }
}
