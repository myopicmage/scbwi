using System.Collections.Generic;

namespace scbwi.Models.SendGrid {
    public class Personalization {
        public IEnumerable<EmailAddress> to { get; set; }
        public List<EmailAddress> bcc { get; set; }
        public string subject { get; set; }
    }
}
