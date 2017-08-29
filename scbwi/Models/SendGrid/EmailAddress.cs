namespace scbwi.Models.SendGrid {
    public class EmailAddress {
        public string email { get; set; }
        public string name { get; set; }

        public EmailAddress() {
        }

        public EmailAddress(string address, string name) {
            email = address;
            this.name = name;
        }
    }
}
