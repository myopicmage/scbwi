using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using scbwi.Models;
using scbwi.Models.Database;

namespace scbwi.Controllers {
    public class AdminController : Controller {
        private readonly ScbwiContext _db;
        private readonly ILogger _logger;

        public AdminController(ScbwiContext db, ILoggerFactory factory) {
            _db = db;
            _logger = factory.CreateLogger<AdminController>();
        }

        public async Task<List<Bootcamp>> Bootcamps() => await _db.Bootcamps.ToListAsync();
    }
}