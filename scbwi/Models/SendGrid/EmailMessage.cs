namespace scbwi.Models.SendGrid {
    public class EmailMessage {
        public string type { get; set; }
        public string value { get; set; }

        public EmailMessage() { }

        public EmailMessage(string t, string v) {
            type = t;
            value = v;
        }
    }
}
