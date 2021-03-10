using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class AddedDiariesStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Diary_UserProfile_UserProfileId",
                table: "Diary");

            migrationBuilder.DropForeignKey(
                name: "FK_DiaryEntry_Diary_DiaryId",
                table: "DiaryEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_DiaryEntry_Products_ProductId",
                table: "DiaryEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductServing_Products_ProductId",
                table: "ProductServing");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductServing",
                table: "ProductServing");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DiaryEntry",
                table: "DiaryEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Diary",
                table: "Diary");

            migrationBuilder.RenameTable(
                name: "ProductServing",
                newName: "ProductServings");

            migrationBuilder.RenameTable(
                name: "DiaryEntry",
                newName: "DiaryEntries");

            migrationBuilder.RenameTable(
                name: "Diary",
                newName: "Diaries");

            migrationBuilder.RenameIndex(
                name: "IX_ProductServing_ProductId",
                table: "ProductServings",
                newName: "IX_ProductServings_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_DiaryEntry_ProductId",
                table: "DiaryEntries",
                newName: "IX_DiaryEntries_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_DiaryEntry_DiaryId",
                table: "DiaryEntries",
                newName: "IX_DiaryEntries_DiaryId");

            migrationBuilder.RenameIndex(
                name: "IX_Diary_UserProfileId",
                table: "Diaries",
                newName: "IX_Diaries_UserProfileId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductServings",
                table: "ProductServings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiaryEntries",
                table: "DiaryEntries",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Diaries",
                table: "Diaries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DiaryEntries_Diaries_DiaryId",
                table: "DiaryEntries",
                column: "DiaryId",
                principalTable: "Diaries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DiaryEntries_Products_ProductId",
                table: "DiaryEntries",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Diaries_UserProfile_UserProfileId",
                table: "Diaries",
                column: "UserProfileId",
                principalTable: "UserProfile",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiaryEntries_Diaries_DiaryId",
                table: "DiaryEntries");

            migrationBuilder.DropForeignKey(
                name: "FK_DiaryEntries_Products_ProductId",
                table: "DiaryEntries");

            migrationBuilder.DropForeignKey(
                name: "FK_Diaries_UserProfile_UserProfileId",
                table: "Diaries");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductServings_Products_ProductId",
                table: "ProductServings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductServings",
                table: "ProductServings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Diaries",
                table: "Diaries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DiaryEntries",
                table: "DiaryEntries");

            migrationBuilder.RenameTable(
                name: "ProductServings",
                newName: "ProductServing");

            migrationBuilder.RenameTable(
                name: "Diaries",
                newName: "Diary");

            migrationBuilder.RenameTable(
                name: "DiaryEntries",
                newName: "DiaryEntry");

            migrationBuilder.RenameIndex(
                name: "IX_ProductServings_ProductId",
                table: "ProductServing",
                newName: "IX_ProductServing_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Diaries_UserProfileId",
                table: "Diary",
                newName: "IX_Diary_UserProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_DiaryEntries_ProductId",
                table: "DiaryEntry",
                newName: "IX_DiaryEntry_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_DiaryEntries_DiaryId",
                table: "DiaryEntry",
                newName: "IX_DiaryEntry_DiaryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductServing",
                table: "ProductServing",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Diary",
                table: "Diary",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiaryEntry",
                table: "DiaryEntry",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Diary_UserProfile_UserProfileId",
                table: "Diary",
                column: "UserProfileId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DiaryEntry_Diary_DiaryId",
                table: "DiaryEntry",
                column: "DiaryId",
                principalTable: "Diary",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DiaryEntry_Products_ProductId",
                table: "DiaryEntry",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductServing_Products_ProductId",
                table: "ProductServing",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
