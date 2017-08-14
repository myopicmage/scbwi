using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace scbwi.Migrations
{
    public partial class snapshot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bootcamps",
                columns: table => new
                {
                    id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    address = table.Column<string>(type: "TEXT", nullable: true),
                    contact = table.Column<string>(type: "TEXT", nullable: true),
                    contactemail = table.Column<string>(type: "TEXT", nullable: true),
                    created = table.Column<DateTime>(type: "TEXT", nullable: false),
                    createdby = table.Column<string>(type: "TEXT", nullable: true),
                    date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    location = table.Column<string>(type: "TEXT", nullable: true),
                    memberprice = table.Column<decimal>(type: "TEXT", nullable: false),
                    modified = table.Column<DateTime>(type: "TEXT", nullable: false),
                    modifiedby = table.Column<string>(type: "TEXT", nullable: true),
                    nonmemberprice = table.Column<decimal>(type: "TEXT", nullable: false),
                    presenters = table.Column<string>(type: "TEXT", nullable: true),
                    topic = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bootcamps", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Coupons",
                columns: table => new
                {
                    id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    created = table.Column<DateTime>(type: "TEXT", nullable: false),
                    createdby = table.Column<string>(type: "TEXT", nullable: true),
                    modified = table.Column<DateTime>(type: "TEXT", nullable: false),
                    modifiedby = table.Column<string>(type: "TEXT", nullable: true),
                    name = table.Column<string>(type: "TEXT", nullable: true),
                    text = table.Column<string>(type: "TEXT", nullable: true),
                    type = table.Column<int>(type: "INTEGER", nullable: false),
                    value = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coupons", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    address1 = table.Column<string>(type: "TEXT", nullable: true),
                    address2 = table.Column<string>(type: "TEXT", nullable: true),
                    city = table.Column<string>(type: "TEXT", nullable: true),
                    country = table.Column<string>(type: "TEXT", nullable: true),
                    created = table.Column<DateTime>(type: "TEXT", nullable: false),
                    createdby = table.Column<string>(type: "TEXT", nullable: true),
                    email = table.Column<string>(type: "TEXT", nullable: true),
                    first = table.Column<string>(type: "TEXT", nullable: true),
                    last = table.Column<string>(type: "TEXT", nullable: true),
                    member = table.Column<bool>(type: "INTEGER", nullable: false),
                    modified = table.Column<DateTime>(type: "TEXT", nullable: false),
                    modifiedby = table.Column<string>(type: "TEXT", nullable: true),
                    phone = table.Column<string>(type: "TEXT", nullable: true),
                    state = table.Column<string>(type: "TEXT", nullable: true),
                    zip = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "BootcampRegistrations",
                columns: table => new
                {
                    id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    bootcampid = table.Column<long>(type: "INTEGER", nullable: false),
                    cleared = table.Column<DateTime>(type: "TEXT", nullable: false),
                    couponid = table.Column<long>(type: "INTEGER", nullable: true),
                    created = table.Column<DateTime>(type: "TEXT", nullable: false),
                    createdby = table.Column<string>(type: "TEXT", nullable: true),
                    modified = table.Column<DateTime>(type: "TEXT", nullable: false),
                    modifiedby = table.Column<string>(type: "TEXT", nullable: true),
                    paid = table.Column<DateTime>(type: "TEXT", nullable: false),
                    paypalid = table.Column<string>(type: "TEXT", nullable: true),
                    subtotal = table.Column<decimal>(type: "TEXT", nullable: false),
                    total = table.Column<decimal>(type: "TEXT", nullable: false),
                    userid = table.Column<long>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BootcampRegistrations", x => x.id);
                    table.ForeignKey(
                        name: "FK_BootcampRegistrations_Coupons_couponid",
                        column: x => x.couponid,
                        principalTable: "Coupons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BootcampRegistrations_Users_userid",
                        column: x => x.userid,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BootcampRegistrations_couponid",
                table: "BootcampRegistrations",
                column: "couponid");

            migrationBuilder.CreateIndex(
                name: "IX_BootcampRegistrations_userid",
                table: "BootcampRegistrations",
                column: "userid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BootcampRegistrations");

            migrationBuilder.DropTable(
                name: "Bootcamps");

            migrationBuilder.DropTable(
                name: "Coupons");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
