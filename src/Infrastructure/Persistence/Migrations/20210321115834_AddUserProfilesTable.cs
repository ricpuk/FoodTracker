using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class AddUserProfilesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_UserProfile_ProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Diaries_UserProfile_UserProfileId",
                table: "Diaries");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGoals_UserProfile_UserProfileId",
                table: "UserGoals");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_UserProfile_TrainerId",
                table: "UserProfile");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProfile",
                table: "UserProfile");

            migrationBuilder.RenameTable(
                name: "UserProfile",
                newName: "UserProfiles");

            migrationBuilder.RenameIndex(
                name: "IX_UserProfile_TrainerId",
                table: "UserProfiles",
                newName: "IX_UserProfiles_TrainerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_UserProfiles_ProfileId",
                table: "AspNetUsers",
                column: "ProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Diaries_UserProfiles_UserProfileId",
                table: "Diaries",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGoals_UserProfiles_UserProfileId",
                table: "UserGoals",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfiles_UserProfiles_TrainerId",
                table: "UserProfiles",
                column: "TrainerId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_UserProfiles_ProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Diaries_UserProfiles_UserProfileId",
                table: "Diaries");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGoals_UserProfiles_UserProfileId",
                table: "UserGoals");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProfiles_UserProfiles_TrainerId",
                table: "UserProfiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles");

            migrationBuilder.RenameTable(
                name: "UserProfiles",
                newName: "UserProfile");

            migrationBuilder.RenameIndex(
                name: "IX_UserProfiles_TrainerId",
                table: "UserProfile",
                newName: "IX_UserProfile_TrainerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProfile",
                table: "UserProfile",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_UserProfile_ProfileId",
                table: "AspNetUsers",
                column: "ProfileId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Diaries_UserProfile_UserProfileId",
                table: "Diaries",
                column: "UserProfileId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGoals_UserProfile_UserProfileId",
                table: "UserGoals",
                column: "UserProfileId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfile_UserProfile_TrainerId",
                table: "UserProfile",
                column: "TrainerId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
