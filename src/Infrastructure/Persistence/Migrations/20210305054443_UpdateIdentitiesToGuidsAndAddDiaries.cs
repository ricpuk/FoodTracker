using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class UpdateIdentitiesToGuidsAndAddDiaries : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Calories",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Carbohydrates",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Fats",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Fiber",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Protein",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Sodium",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Products",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Diary",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsCompleted = table.Column<bool>(type: "boolean", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "text", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diary", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Diary_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductServing",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    ServingSize = table.Column<double>(type: "double precision", nullable: false),
                    ServingSizeUnit = table.Column<string>(type: "text", nullable: true),
                    Calories = table.Column<double>(type: "double precision", nullable: false),
                    Protein = table.Column<double>(type: "double precision", nullable: false),
                    Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    Fats = table.Column<double>(type: "double precision", nullable: false),
                    Fiber = table.Column<double>(type: "double precision", nullable: false),
                    Sodium = table.Column<double>(type: "double precision", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductServing", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductServing_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DiaryEntry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DiaryId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiaryEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiaryEntry_Diary_DiaryId",
                        column: x => x.DiaryId,
                        principalTable: "Diary",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Diary_ApplicationUserId",
                table: "Diary",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_DiaryEntry_DiaryId",
                table: "DiaryEntry",
                column: "DiaryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductServing_ProductId",
                table: "ProductServing",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DiaryEntry");

            migrationBuilder.DropTable(
                name: "ProductServing");

            migrationBuilder.DropTable(
                name: "Diary");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "Calories",
                table: "Products",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Carbohydrates",
                table: "Products",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Fats",
                table: "Products",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Fiber",
                table: "Products",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Protein",
                table: "Products",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Sodium",
                table: "Products",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
