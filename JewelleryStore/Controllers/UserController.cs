using JewelleryStore.Engine;
using JewelleryStore.Model.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JewelleryStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController: ControllerBase
    {
        private readonly IUserEngine userEngine;

        public UserController(IUserEngine _userEngine)
        {
            userEngine = _userEngine;
        }

        [HttpPost]
        [Route("authenticate")]
        [AllowAnonymous]
        public IActionResult Authenticate([FromBody] UserAuthenticationRequest request)
        {
            var user = userEngine.AuthenticateUser(request);

            if (user == null)
                return BadRequest("Invalid email or password.");

            return Ok(user);
        }
    }
}
