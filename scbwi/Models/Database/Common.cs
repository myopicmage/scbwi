using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scbwi.Models.Database {
    public class Common {
        public long id { get; set; }
        public string createdby { get; set; }
        public string modifiedby { get; set; }
        public DateTime created { get; set; }
        public DateTime modified { get; set; }
    }
}
