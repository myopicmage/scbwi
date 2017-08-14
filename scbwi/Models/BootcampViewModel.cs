using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using scbwi.Models.Database;

namespace scbwi.Models {
    public class BootcampViewModel {
        public User user { get; set; }
        public long bootcampid { get; set; }
        public decimal subtotal { get; set; }
        public decimal total { get; set; }
        public string coupon { get; set; }
        public string nonce { get; set; }
    }
}
