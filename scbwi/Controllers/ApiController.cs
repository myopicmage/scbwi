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
using Microsoft.EntityFrameworkCore;

namespace scbwi.Controllers {
    public class ApiController : Controller {
        private readonly BraintreeGateway _gateway;
        private readonly ILogger _logger;
        private readonly ScbwiContext _db;
        private readonly ITotalCalculator _calc;
        private readonly IEmailSender _email;

        public ApiController(ScbwiContext db, ILoggerFactory factory, IOptions<Secrets> secrets, ITotalCalculator calc, IEmailSender sender) {
            _db = db;
            _logger = factory.CreateLogger("All");
            _gateway = new BraintreeGateway(secrets.Value.paypaltoken);
            _calc = calc;
            _email = sender;
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
                coupon = _db.Coupons.SingleOrDefault(x => x.text == r.coupon),
                bootcampid = r.bootcampid
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

                r.bootcamp = _db.Bootcamps.SingleOrDefault(x => x.id == r.bootcampid);

                var emailResult = await SendEmailAsync(r);
            }

            reg.paid = DateTime.Now;

            _db.BootcampRegistrations.Add(reg);

            await _db.SaveChangesAsync();

            return Json(new { success = true });
        }

        /*public async Task<IActionResult> TestEmail(int id) {
            var reg = _db.BootcampRegistrations.Include(x => x.user).SingleOrDefault(x => x.id == id);

            var r = new BootcampViewModel {
                bootcamp = _db.Bootcamps.SingleOrDefault(x => x.id == reg.bootcampid),
                user = reg.user,
                coupon = reg.coupon?.text,
                subtotal = reg.subtotal,
                total = reg.total
            };

            var emailResult = await SendEmailAsync(r);

            return Json(emailResult);
        }*/

        private async Task<bool> SendEmailAsync(BootcampViewModel reg) {
            try {
                var html = await _email.GenerateEmailHtml("Email/Confirmation", reg);
                var emailResp = await _email.SendEmailAsync(reg.user.email, "Successful Registration", html, $"{reg.user.first} {reg.user.last}");

                if (!emailResp.IsSuccessStatusCode) {
                    var resp = await emailResp.Content.ReadAsStringAsync();

                    _logger.LogWarning($"Failed to send confirmation email to {reg.user.email}. Reason: {resp}");

                    return false;
                }

                return true;
            } catch (Exception ex) {
                _logger.LogWarning($"Failed to send confirmation email. Exception: {ex.Message}");

                return false;
            }
        }
    }
}