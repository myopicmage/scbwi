using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using scbwi.Models.Database;

namespace scbwi.Models {
    public class ScbwiContext : DbContext {
        public ScbwiContext(DbContextOptions<ScbwiContext> options) : base(options) { }

        public virtual DbSet<Bootcamp> Bootcamps { get; set; }
        public virtual DbSet<BootcampRegistration> BootcampRegistrations { get; set; }
        public virtual DbSet<Coupon> Coupons { get; set; }
        public virtual DbSet<User> Users { get; set; }

        public string user { get; set; } = "anonymous";

        public override int SaveChanges() {
            var changeSet = ChangeTracker.Entries<Common>();

            if (changeSet != null) {
                foreach (var entry in changeSet.Where(x => x.State != EntityState.Unchanged)) {
                    if (entry.State == EntityState.Added) {
                        entry.Entity.created = DateTime.Now;
                        entry.Entity.createdby = user;
                    }

                    entry.Entity.modified = DateTime.Now;
                    entry.Entity.modifiedby = user;
                }
            }

            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken)) {
            var changeSet = ChangeTracker.Entries<Common>();

            if (changeSet != null) {
                foreach (var entry in changeSet.Where(x => x.State != EntityState.Unchanged)) {
                    if (entry.State == EntityState.Added) {
                        entry.Entity.created = DateTime.Now;
                        entry.Entity.createdby = user;
                    }

                    entry.Entity.modified = DateTime.Now;
                    entry.Entity.modifiedby = user;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
