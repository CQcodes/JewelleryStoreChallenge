using JewelleryStore.Engine;
using JewelleryStore.Model.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JewelleryStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PriceController : ControllerBase
    {
        private readonly IPriceEngine priceEngine;

        public PriceController(IPriceEngine _priceEngine)
        {
            priceEngine = _priceEngine;
        }

        [HttpPost]
        [Route("calculate")]
        [Authorize]
        public IActionResult Calculate(CalculateRequest request)
        {
            var price = priceEngine.CalculatePrice(request);

            if (price == null)
                BadRequest();

            return Ok(price);
        }
    }
}
