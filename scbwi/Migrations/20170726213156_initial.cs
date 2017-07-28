using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace scbwi.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bootcamps",
                columns: table => new
                {
                    id = table.Column<long>(type: "int8", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    address = table.Column<string>(type: "text", nullable: true),
                    contact = table.Column<string>(type: "text", nullable: true),
                    contactemail = table.Column<string>(type: "text", nullable: true),
                    created = table.Column<DateTime>(type: "timestamp", nullable: false),
                    createdby = table.Column<string>(type: "text", nullable: true),
                    date = table.Column<DateTime>(type: "timestamp", nullable: false),
                    location = table.Column<string>(type: "text", nullable: true),
                    memberprice = table.Column<decimal>(type: "numeric", nullable: false),
                    modified = table.Column<DateTime>(type: "timestamp", nullable: false),
                    modifiedby = table.Column<string>(type: "text", nullable: true),
                    nonmemberprice = table.Column<decimal>(type: "numeric", nullable: false),
                    presenters = table.Column<string>(type: "text", nullable: true),
                    topic = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bootcamps", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Coupons",
                columns: table => new
                {
                    id = table.Column<long>(type: "int8", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    created = table.Column<DateTime>(type: "timestamp", nullable: false),
                    createdby = table.Column<string>(type: "text", nullable: true),
                    modified = table.Column<DateTime>(type: "timestamp", nullable: false),
                    modifiedby = table.Column<string>(type: "text", nullable: true),
                    name = table.Column<string>(type: "text", nullable: true),
                    text = table.Column<string>(type: "text", nullable: true),
                    type = table.Column<int>(type: "int4", nullable: false),
                    value = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coupons", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<long>(type: "int8", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    address1 = table.Column<string>(type: "text", nullable: true),
                    address2 = table.Column<string>(type: "text", nullable: true),
                    city = table.Column<string>(type: "text", nullable: true),
                    country = table.Column<string>(type: "text", nullable: true),
                    created = table.Column<DateTime>(type: "timestamp", nullable: false),
                    createdby = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    first = table.Column<string>(type: "text", nullable: true),
                    last = table.Column<string>(type: "text", nullable: true),
                    member = table.Column<bool>(type: "bool", nullable: false),
                    modified = table.Column<DateTime>(type: "timestamp", nullable: false),
                    modifiedby = table.Column<string>(type: "text", nullable: true),
                    phone = table.Column<string>(type: "text", nullable: true),
                    state = table.Column<string>(type: "text", nullable: true),
                    zip = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "BootcampRegistrations",
                columns: table => new
                {
                    id = table.Column<long>(type: "int8", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    bootcampid = table.Column<long>(type: "int8", nullable: false),
                    cleared = table.Column<DateTime>(type: "timestamp", nullable: false),
                    created = table.Column<DateTime>(type: "timestamp", nullable: false),
                    createdby = table.Column<string>(type: "text", nullable: true),
                    modified = table.Column<DateTime>(type: "timestamp", nullable: false),
                    modifiedby = table.Column<string>(type: "text", nullable: true),
                    paid = table.Column<DateTime>(type: "timestamp", nullable: false),
                    subtotal = table.Column<decimal>(type: "numeric", nullable: false),
                    total = table.Column<decimal>(type: "numeric", nullable: false),
                    userid = table.Column<long>(type: "int8", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BootcampRegistrations", x => x.id);
                    table.ForeignKey(
                        name: "FK_BootcampRegistrations_Users_userid",
                        column: x => x.userid,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

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
