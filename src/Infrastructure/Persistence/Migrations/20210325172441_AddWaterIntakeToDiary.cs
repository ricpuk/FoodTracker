using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class AddWaterIntakeToDiary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "WaterIntake",
                table: "Diaries",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WaterIntake",
                table: "Diaries");
        }
    }
}
