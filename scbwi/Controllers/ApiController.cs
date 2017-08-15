using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Braintree;
using scbwi.Models;
using scbwi.Models.Database;
using Microsoft.Extensions.Options;
using scbwi.Services;
using System.Linq;

namespace scbwi.Controllers {
    public class ApiController : Controller {
        private readonly BraintreeGateway _gateway;
        private readonly ILogger _logger;
        private readonly ScbwiContext _db;
        private readonly ITotalCalculator _calc;

        public ApiController(ScbwiContext db, ILoggerFactory factory, IOptions<Secrets> secrets, ITotalCalculator calc) {
            _db = db;
            _logger = factory.CreateLogger("All");
            _gateway = new BraintreeGateway(secrets.Value.paypaltoken);
            _calc = calc;
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

        public IActionResult CalcTotal([FromBody] BootcampViewModel r) {
            if (!ModelState.IsValid) {
                return Json(new { success = false, message = "Unable to read coupon", subtotal = r.subtotal, r.total });
            }

            (var subtotal, var total) = _calc.CalcTotals(r, _db);

            var message = "Invalid coupon";

            if (total != subtotal) {
                message = "Coupon is good";
            }

            return Json(new { success = true, message = message, subtotal = subtotal, total = total });
        }


        public async Task<IActionResult> Register([FromBody] BootcampViewModel r) {
            var reg = new BootcampRegistration(r) {
                coupon = _db.Coupons.SingleOrDefault(x => x.text == r.coupon)
            };

            (var subtotal, var total) = _calc.CalcTotals(r, _db);

            reg.subtotal = subtotal;
            reg.total = total;

            if (total > 0) {
                var request = new TransactionRequest {
                    Amount = total,
                    MerchantAccountId = "USD",
                    PaymentMethodNonce = r.nonce,
                    Options = new TransactionOptionsRequest {
                        PayPal = new TransactionOptionsPayPalRequest {
                            CustomField = reg.paypalid,
                            Description = "SCBWI Florida Writing Bootcamps",
                        },
                        SubmitForSettlement = true
                    }
                };

                var result = _gateway.Transaction.Sale(request);

                if (!result.IsSuccess()) {
                    return Json(new { success = false, message = "something failed" });
                }

                /*try {
                    var emailResp = await _email.SendEmailAsync(reg.user.Email, "Successful Registration", reg.GenEmail(), $"{reg.user.firstname} {reg.user.lastname}");

                    if (!emailResp.IsSuccessStatusCode) {
                        var resp = await emailResp.Content.ReadAsStringAsync();

                        _logger.LogWarning($"Failed to send confirmation email to {reg.user.Email}. Reason: {resp}");
                    }
                } catch (Exception ex) {
                    _logger.LogWarning($"Failed to send confirmation email. Exception: {ex.Message}");
                }*/
            }

            reg.paid = DateTime.Now;

            _db.BootcampRegistrations.Add(reg);

            await _db.SaveChangesAsync();

            return Json(new { success = true });
        }
    }
}