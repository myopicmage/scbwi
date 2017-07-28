using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scbwi.Models.Database {
    public class Bootcamp : Common {
        public string location { get; set; }
        public string address { get; set; }
        public string topic { get; set; }
        public string contact { get; set; }
        public string contactemail { get; set; }
        public string presenters { get; set; }
        public string description { get; set; }
        public DateTime date { get; set; }
        public decimal memberprice { get; set; }
        public decimal nonmemberprice { get; set; }
    }
}
