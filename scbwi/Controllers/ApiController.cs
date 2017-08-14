using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Braintree;
using scbwi.Models;
using scbwi.Models.Database;
using Microsoft.Extensions.Options;

namespace scbwi.Controllers {
    public class ApiController : Controller {
        private readonly BraintreeGateway _gateway;
        private readonly ILogger _logger;
        private readonly ScbwiContext _db;
        //private readonly IEmailSender _email;
        //private readonly ITotalCalculator _calc;

        public ApiController(ScbwiContext db, ILoggerFactory factory, IOptions<Secrets> secrets) {
            _db = db;
            _logger = factory.CreateLogger("All");
            _gateway = new BraintreeGateway(secrets.Value.paypaltoken);
        }

        public IActionResult GetToken() {
            try {
                var token = _gateway.ClientToken.generate();

                return Json(new { token = token });
            } catch (Exception ex) {
                _logger.LogCritical($"Failed to generate token! {ex.Message}");

                throw;
            }
        }

        public IActionResult Register([FromBody] BootcampRegistration r) => Json(true);
    }
}