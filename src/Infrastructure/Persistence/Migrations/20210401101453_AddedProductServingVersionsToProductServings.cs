using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class AddedProductServingVersionsToProductServings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Calories",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "Carbohydrates",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "Fats",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "Fiber",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "Protein",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "ServingSize",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "ServingSizeUnit",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "Sodium",
                table: "ProductServings");

            migrationBuilder.CreateTable(
                name: "ProductServingVersion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductServingId = table.Column<int>(type: "integer", nullable: false),
                    ServingSize = table.Column<double>(type: "double precision", nullable: false),
                    ServingSizeUnit = table.Column<string>(type: "text", nullable: true),
                    Calories = table.Column<double>(type: "double precision", nullable: false),
                    Protein = table.Column<double>(type: "double precision", nullable: false),
                    Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    Fats = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductServingVersion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductServingVersion_ProductServings_ProductServingId",
                        column: x => x.ProductServingId,
                        principalTable: "ProductServings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductServingVersion_ProductServingId",
                table: "ProductServingVersion",
                column: "ProductServingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductServingVersion");

            migrationBuilder.AddColumn<double>(
                name: "Calories",
                table: "ProductServings",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Carbohydrates",
                table: "ProductServings",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Fats",
                table: "ProductServings",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Fiber",
                table: "ProductServings",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Protein",
                table: "ProductServings",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ServingSize",
                table: "ProductServings",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ServingSizeUnit",
                table: "ProductServings",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Sodium",
                table: "ProductServings",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
