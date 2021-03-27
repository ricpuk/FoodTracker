using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class AddAlternateKeyToCoachingRequestsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoachingRequests_UserProfiles_FromId",
                table: "CoachingRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_CoachingRequests_UserProfiles_ToId",
                table: "CoachingRequests");

            migrationBuilder.DropIndex(
                name: "IX_CoachingRequests_FromId",
                table: "CoachingRequests");

            migrationBuilder.AlterColumn<int>(
                name: "ToId",
                table: "CoachingRequests",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FromId",
                table: "CoachingRequests",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_CoachingRequests_FromId_ToId",
                table: "CoachingRequests",
                columns: new[] { "FromId", "ToId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CoachingRequests_UserProfiles_FromId",
                table: "CoachingRequests",
                column: "FromId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CoachingRequests_UserProfiles_ToId",
                table: "CoachingRequests",
                column: "ToId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoachingRequests_UserProfiles_FromId",
                table: "CoachingRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_CoachingRequests_UserProfiles_ToId",
                table: "CoachingRequests");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_CoachingRequests_FromId_ToId",
                table: "CoachingRequests");

            migrationBuilder.AlterColumn<int>(
                name: "ToId",
                table: "CoachingRequests",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "FromId",
                table: "CoachingRequests",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_CoachingRequests_FromId",
                table: "CoachingRequests",
                column: "FromId");

            migrationBuilder.AddForeignKey(
                name: "FK_CoachingRequests_UserProfiles_FromId",
                table: "CoachingRequests",
                column: "FromId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CoachingRequests_UserProfiles_ToId",
                table: "CoachingRequests",
                column: "ToId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
