using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scbwi.Models.Database {
    public class BootcampRegistration : Common {
        public virtual User user { get; set; }
        public long bootcampid { get; set; }
        public decimal subtotal { get; set; }
        public decimal total { get; set; }
        public DateTime paid { get; set; }
        public DateTime cleared { get; set; }
    }
}
