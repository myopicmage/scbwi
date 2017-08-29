using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace scbwi.Services
{
    public interface IEmailSender
    {
        Task<HttpResponseMessage> SendEmailAsync(string email, string subject, string message, string name);
        Task<string> GenerateEmailHtml(string template, object model);
    }
}
