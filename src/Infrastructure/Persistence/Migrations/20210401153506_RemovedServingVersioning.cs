using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using NpgsqlTypes;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class RemovedServingVersioning : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiaryEntries_Products_ProductId",
                table: "DiaryEntries");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductServings_Products_ProductId",
                table: "ProductServings");

            migrationBuilder.DropTable(
                name: "ProductServingVersion");

            migrationBuilder.DropIndex(
                name: "IX_DiaryEntries_ProductId",
                table: "DiaryEntries");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "DiaryEntries");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "ProductServings",
                newName: "ProductVersionId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductServings_ProductId",
                table: "ProductServings",
                newName: "IX_ProductServings_ProductVersionId");

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

            migrationBuilder.AlterColumn<int>(
                name: "ServingId",
                table: "DiaryEntries",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductVersionId",
                table: "DiaryEntries",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DiaryEntries_ProductVersionId",
                table: "DiaryEntries",
                column: "ProductVersionId");

            migrationBuilder.CreateIndex(
                name: "IX_DiaryEntries_ServingId",
                table: "DiaryEntries",
                column: "ServingId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiaryEntries_ProductServings_ServingId",
                table: "DiaryEntries",
                column: "ServingId",
                principalTable: "ProductServings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DiaryEntries_ProductVersion_ProductVersionId",
                table: "DiaryEntries",
                column: "ProductVersionId",
                principalTable: "ProductVersion",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductServings_ProductVersion_ProductVersionId",
                table: "ProductServings",
                column: "ProductVersionId",
                principalTable: "ProductVersion",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiaryEntries_ProductServings_ServingId",
                table: "DiaryEntries");

            migrationBuilder.DropForeignKey(
                name: "FK_DiaryEntries_ProductVersion_ProductVersionId",
                table: "DiaryEntries");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductServings_ProductVersion_ProductVersionId",
                table: "ProductServings");

            migrationBuilder.DropIndex(
                name: "IX_DiaryEntries_ProductVersionId",
                table: "DiaryEntries");

            migrationBuilder.DropIndex(
                name: "IX_DiaryEntries_ServingId",
                table: "DiaryEntries");

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
                name: "Protein",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "ServingSize",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "ServingSizeUnit",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "ProductVersionId",
                table: "DiaryEntries");

            migrationBuilder.RenameColumn(
                name: "ProductVersionId",
                table: "ProductServings",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductServings_ProductVersionId",
                table: "ProductServings",
                newName: "IX_ProductServings_ProductId");

            migrationBuilder.AlterColumn<int>(
                name: "ServingId",
                table: "DiaryEntries",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "DiaryEntries",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProductServingVersion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Calories = table.Column<double>(type: "double precision", nullable: false),
                    Carbohydrates = table.Column<double>(type: "double precision", nullable: false),
                    Fats = table.Column<double>(type: "double precision", nullable: false),
                    ProductServingId = table.Column<int>(type: "integer", nullable: false),
                    Protein = table.Column<double>(type: "double precision", nullable: false),
                    ServingSize = table.Column<double>(type: "double precision", nullable: false),
                    ServingSizeUnit = table.Column<string>(type: "text", nullable: true)
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
                name: "IX_DiaryEntries_ProductId",
                table: "DiaryEntries",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductServingVersion_ProductServingId",
                table: "ProductServingVersion",
                column: "ProductServingId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiaryEntries_Products_ProductId",
                table: "DiaryEntries",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductServings_Products_ProductId",
                table: "ProductServings",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
