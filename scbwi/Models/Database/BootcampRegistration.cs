using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scbwi.Models.Database {
    public class BootcampRegistration : Common {
        public User user { get; set; }
        public long bootcampid { get; set; }
        public decimal subtotal { get; set; }
        public decimal total { get; set; }
        public DateTime paid { get; set; }
        public DateTime cleared { get; set; }
        public Coupon coupon { get; set; }
        public string paypalid { get; set; }

        public BootcampRegistration() { }

        public BootcampRegistration(BootcampViewModel r) {
            user = new User {
                first = r.user.first,
                last = r.user.last,
                address1 = r.user.address1,
                address2 = r.user.address2,
                city = r.user.city,
                state = r.user.state,
                zip = r.user.zip,
                country = r.user.country,
                email = r.user.email,
                phone = r.user.phone,
                member = r.user.member
            };
        }
    }
}
