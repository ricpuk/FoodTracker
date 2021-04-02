using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class UpdatedUserProfileAndUserGoalsRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserGoals_UserProfileId",
                table: "UserGoals");

            migrationBuilder.CreateIndex(
                name: "IX_UserGoals_UserProfileId",
                table: "UserGoals",
                column: "UserProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserGoals_UserProfileId",
                table: "UserGoals");

            migrationBuilder.CreateIndex(
                name: "IX_UserGoals_UserProfileId",
                table: "UserGoals",
                column: "UserProfileId",
                unique: true);
        }
    }
}
