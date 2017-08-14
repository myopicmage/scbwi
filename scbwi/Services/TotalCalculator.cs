using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using scbwi.Models;
using scbwi.Models.Database;

namespace scbwi.Services {
    public class TotalCalculator : ITotalCalculator {
        public (decimal subtotal, decimal total) CalcTotals(BootcampViewModel r, ScbwiContext _db) {
            var subtotal = 0m;
            var total = 0.0m;

            total = subtotal;

            if (!string.IsNullOrEmpty(r.coupon)) {
                var coupon = _db.Coupons.SingleOrDefault(x => x.text == r.coupon);

                if (coupon != null) {
                    switch (coupon.type) {
                        case CouponType.TotalCost:
                            total = Convert.ToDecimal(coupon.value);
                            break;
                        case CouponType.PercentOff:
                            var val = Convert.ToDecimal(coupon.value);
                            var mult = 100 - (val / 100);
                            total *= mult;
                            break;
                    }
                }
            }

            return (subtotal, total);
        }
    }

    public interface ITotalCalculator {
        (decimal subtotal, decimal total) CalcTotals(BootcampViewModel r, ScbwiContext _db);
    }
}
