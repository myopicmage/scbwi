using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using scbwi.Models;
using scbwi.Models.SendGrid;

namespace scbwi.Services {
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link https://go.microsoft.com/fwlink/?LinkID=532713
    public class MessageSender : IEmailSender, ISmsSender {
        private readonly IRazorViewEngine _engine;
        private readonly ITempDataProvider _tempDataProvider;
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger _logger;
        private readonly Secrets _secrets;
        private readonly EmailAddress support_email = new EmailAddress("florida-ra@scbwi.org", "Florida Regional Advisor");

        public MessageSender(IRazorViewEngine engine, ITempDataProvider tempDataProvider, IServiceProvider provider, ILoggerFactory factory, IOptions<Secrets> secrets) {
            _engine = engine;
            _tempDataProvider = tempDataProvider;
            _serviceProvider = provider;
            _logger = factory.CreateLogger("All");
            _secrets = secrets.Value;
        }

        public async Task<string> GenerateEmailHtml(string template, object model) {
            try {
                var ctx = new DefaultHttpContext {
                    RequestServices = _serviceProvider
                };

                var actionCtx = new ActionContext(ctx, new RouteData(), new ActionDescriptor());

                using (var writer = new StringWriter()) {
                    var viewResult = _engine.FindView(actionCtx, template, false);

                    if (!viewResult.Success) {
                        return null;
                    }

                    var dict = new ViewDataDictionary(new EmptyModelMetadataProvider(), new ModelStateDictionary()) {
                        Model = model
                    };

                    var viewCtx = new ViewContext(actionCtx, viewResult.View, dict, new TempDataDictionary(actionCtx.HttpContext, _tempDataProvider), writer, new HtmlHelperOptions());

                    await viewResult.View.RenderAsync(viewCtx);

                    return writer.ToString();
                }
            } catch (Exception ex) {
                return null;
            }
        }

        public Task<HttpResponseMessage> SendEmailAsync(string email, string subject, string message, string name) {
            var client = new HttpClient();

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("BEARER", _secrets.sendgridkey);

            var payload = new SendGridEmail {
                content = new List<EmailMessage>
                {
                    new EmailMessage("text/html", message)
                },
                personalizations = new List<Personalization>
                {
                    new Personalization
                    {
                        to = new [] { new EmailAddress(email, name) },
                        subject = subject,
                        bcc = new List<EmailAddress> {
                            support_email
                        }
                    }
                },
                from = new EmailAddress("register@scbwiflorida.com", "SCBWI Florida Registration Bot"),
                reply_to = support_email
            };

            var payloadAsJson = JsonConvert.SerializeObject(payload);

            _logger.LogInformation($"Sending email: {payloadAsJson}");

            return client.PostAsync("https://api.sendgrid.com/v3/mail/send", new StringContent(payloadAsJson, Encoding.UTF8, "application/json"));
        }

        public Task SendSmsAsync(string number, string message) {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }
}
