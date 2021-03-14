using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NpgsqlTypes;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class AddedFullTextSearchIndexToProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Diaries_UserProfile_UserProfileId",
                table: "Diaries");

            migrationBuilder.AddColumn<NpgsqlTsVector>(
                name: "SearchVector",
                table: "Products",
                type: "tsvector",
                nullable: true)
                .Annotation("Npgsql:TsVectorConfig", "english")
                .Annotation("Npgsql:TsVectorProperties", new[] { "Name" });

            migrationBuilder.AlterColumn<int>(
                name: "UserProfileId",
                table: "Diaries",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DiarySection",
                table: "DiaryEntries",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "NumberOfServings",
                table: "DiaryEntries",
                type: "double precision",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_SearchVector",
                table: "Products",
                column: "SearchVector")
                .Annotation("Npgsql:IndexMethod", "GIN");

            migrationBuilder.AddForeignKey(
                name: "FK_Diaries_UserProfile_UserProfileId",
                table: "Diaries",
                column: "UserProfileId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Diaries_UserProfile_UserProfileId",
                table: "Diaries");

            migrationBuilder.DropIndex(
                name: "IX_Products_SearchVector",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SearchVector",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "DiarySection",
                table: "DiaryEntries");

            migrationBuilder.DropColumn(
                name: "NumberOfServings",
                table: "DiaryEntries");

            migrationBuilder.AlterColumn<int>(
                name: "UserProfileId",
                table: "Diaries",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Diaries_UserProfile_UserProfileId",
                table: "Diaries",
                column: "UserProfileId",
                principalTable: "UserProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
