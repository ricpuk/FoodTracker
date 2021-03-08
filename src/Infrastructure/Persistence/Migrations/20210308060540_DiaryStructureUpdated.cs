using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class DiaryStructureUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiaryEntry_Diary_DiaryId",
                table: "DiaryEntry");

            migrationBuilder.AlterColumn<int>(
                name: "DiaryId",
                table: "DiaryEntry",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EntryType",
                table: "DiaryEntry",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "DiaryEntry",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServingId",
                table: "DiaryEntry",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeLogged",
                table: "DiaryEntry",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "WaterIntake",
                table: "DiaryEntry",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Diary",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_DiaryEntry_ProductId",
                table: "DiaryEntry",
                column: "ProductId");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiaryEntry_Diary_DiaryId",
                table: "DiaryEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_DiaryEntry_Products_ProductId",
                table: "DiaryEntry");

            migrationBuilder.DropIndex(
                name: "IX_DiaryEntry_ProductId",
                table: "DiaryEntry");

            migrationBuilder.DropColumn(
                name: "EntryType",
                table: "DiaryEntry");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "DiaryEntry");

            migrationBuilder.DropColumn(
                name: "ServingId",
                table: "DiaryEntry");

            migrationBuilder.DropColumn(
                name: "TimeLogged",
                table: "DiaryEntry");

            migrationBuilder.DropColumn(
                name: "WaterIntake",
                table: "DiaryEntry");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Diary");

            migrationBuilder.AlterColumn<int>(
                name: "DiaryId",
                table: "DiaryEntry",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_DiaryEntry_Diary_DiaryId",
                table: "DiaryEntry",
                column: "DiaryId",
                principalTable: "Diary",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
