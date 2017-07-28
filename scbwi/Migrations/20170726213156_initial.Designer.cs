﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using scbwi.Models;
using scbwi.Models.Database;
using System;

namespace scbwi.Migrations
{
    [DbContext(typeof(ScbwiContext))]
    [Migration("20170726213156_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.0.0-preview2-25794");

            modelBuilder.Entity("scbwi.Models.Database.Bootcamp", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("address");

                    b.Property<string>("contact");

                    b.Property<string>("contactemail");

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<DateTime>("date");

                    b.Property<string>("location");

                    b.Property<decimal>("memberprice");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<decimal>("nonmemberprice");

                    b.Property<string>("presenters");

                    b.Property<string>("topic");

                    b.HasKey("id");

                    b.ToTable("Bootcamps");
                });

            modelBuilder.Entity("scbwi.Models.Database.BootcampRegistration", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("bootcampid");

                    b.Property<DateTime>("cleared");

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<DateTime>("paid");

                    b.Property<decimal>("subtotal");

                    b.Property<decimal>("total");

                    b.Property<long?>("userid");

                    b.HasKey("id");

                    b.HasIndex("userid");

                    b.ToTable("BootcampRegistrations");
                });

            modelBuilder.Entity("scbwi.Models.Database.Coupon", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<string>("name");

                    b.Property<string>("text");

                    b.Property<int>("type");

                    b.Property<decimal>("value");

                    b.HasKey("id");

                    b.ToTable("Coupons");
                });

            modelBuilder.Entity("scbwi.Models.Database.User", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("address1");

                    b.Property<string>("address2");

                    b.Property<string>("city");

                    b.Property<string>("country");

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<string>("email");

                    b.Property<string>("first");

                    b.Property<string>("last");

                    b.Property<bool>("member");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<string>("phone");

                    b.Property<string>("state");

                    b.Property<string>("zip");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("scbwi.Models.Database.BootcampRegistration", b =>
                {
                    b.HasOne("scbwi.Models.Database.User", "user")
                        .WithMany()
                        .HasForeignKey("userid");
                });
#pragma warning restore 612, 618
        }
    }
}