using System.Collections.Generic;

namespace scbwi.Models.SendGrid {
    public class SendGridEmail {
        public IEnumerable<Personalization> personalizations { get; set; }
        public EmailAddress from { get; set; }
        public EmailAddress reply_to { get; set; }
        public IEnumerable<EmailMessage> content { get; set; }
        //public string template_id { get; set; }
    }
}
