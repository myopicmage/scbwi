using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scbwi.Models.Database {
    public class Coupon : Common {
        public string name { get; set; }
        public string text { get; set; }
        public CouponType type { get; set; }
        public decimal value { get; set; }
    }
    
    public enum CouponType {
        PercentOff,
        Reduction,
        TotalCost
    }
}
