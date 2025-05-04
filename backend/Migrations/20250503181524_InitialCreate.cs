using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "varchar(180)", nullable: false),
                    Phone = table.Column<string>(type: "varchar(64)", nullable: true),
                    Password = table.Column<string>(type: "varchar(255)", nullable: false),
                    Image = table.Column<string>(type: "varchar(255)", nullable: true),
                    FirstName = table.Column<string>(type: "varchar(191)", nullable: true),
                    LastName = table.Column<string>(type: "varchar(191)", nullable: true),
                    Gender = table.Column<string>(type: "varchar(2)", nullable: true),
                    Country = table.Column<string>(type: "varchar(191)", nullable: true),
                    City = table.Column<string>(type: "varchar(255)", nullable: true),
                    ZipCode = table.Column<string>(type: "varchar(20)", nullable: true),
                    Address = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<short>(type: "smallint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Activity",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    Event = table.Column<string>(type: "varchar(255)", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<short>(type: "smallint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Activity_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Authentication",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    Type = table.Column<string>(type: "varchar(150)", nullable: true),
                    Credential = table.Column<string>(type: "varchar(180)", nullable: true),
                    Token = table.Column<string>(type: "varchar(36)", nullable: true),
                    Status = table.Column<short>(type: "smallint", nullable: false),
                    ExpiredAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authentication", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Authentication_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activity_CreatedAt",
                table: "Activity",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Activity_Event",
                table: "Activity",
                column: "Event");

            migrationBuilder.CreateIndex(
                name: "IX_Activity_Status",
                table: "Activity",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Activity_UpdatedAt",
                table: "Activity",
                column: "UpdatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Activity_UserId",
                table: "Activity",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Authentication_CreatedAt",
                table: "Authentication",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Authentication_Credential",
                table: "Authentication",
                column: "Credential");

            migrationBuilder.CreateIndex(
                name: "IX_Authentication_Status",
                table: "Authentication",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Authentication_Token",
                table: "Authentication",
                column: "Token");

            migrationBuilder.CreateIndex(
                name: "IX_Authentication_Type",
                table: "Authentication",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_Authentication_UpdatedAt",
                table: "Authentication",
                column: "UpdatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Authentication_UserId",
                table: "Authentication",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_User_City",
                table: "User",
                column: "City");

            migrationBuilder.CreateIndex(
                name: "IX_User_Country",
                table: "User",
                column: "Country");

            migrationBuilder.CreateIndex(
                name: "IX_User_CreatedAt",
                table: "User",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "User",
                column: "Email");

            migrationBuilder.CreateIndex(
                name: "IX_User_FirstName",
                table: "User",
                column: "FirstName");

            migrationBuilder.CreateIndex(
                name: "IX_User_Gender",
                table: "User",
                column: "Gender");

            migrationBuilder.CreateIndex(
                name: "IX_User_Image",
                table: "User",
                column: "Image");

            migrationBuilder.CreateIndex(
                name: "IX_User_LastName",
                table: "User",
                column: "LastName");

            migrationBuilder.CreateIndex(
                name: "IX_User_Password",
                table: "User",
                column: "Password");

            migrationBuilder.CreateIndex(
                name: "IX_User_Phone",
                table: "User",
                column: "Phone");

            migrationBuilder.CreateIndex(
                name: "IX_User_Status",
                table: "User",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_User_UpdatedAt",
                table: "User",
                column: "UpdatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_User_ZipCode",
                table: "User",
                column: "ZipCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Activity");

            migrationBuilder.DropTable(
                name: "Authentication");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
