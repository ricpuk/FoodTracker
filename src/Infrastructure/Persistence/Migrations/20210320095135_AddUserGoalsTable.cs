using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class AddUserGoalsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "Diaries");

            migrationBuilder.AddColumn<double>(
                name: "StartingWeight",
                table: "UserProfile",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "WeightGoal",
                table: "UserProfile",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "UserGoalsId",
                table: "Diaries",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "Diaries",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "UserGoals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    CaloriesGoal = table.Column<double>(type: "double precision", nullable: false),
                    ProteinGoal = table.Column<double>(type: "double precision", nullable: false),
                    CarbohydratesGoal = table.Column<double>(type: "double precision", nullable: false),
                    FatsGoal = table.Column<double>(type: "double precision", nullable: false),
                    WaterGoal = table.Column<double>(type: "double precision", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGoals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGoals_UserProfile_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Diaries_UserGoalsId",
                table: "Diaries",
                column: "UserGoalsId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGoals_UserProfileId",
                table: "UserGoals",
                column: "UserProfileId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Diaries_UserGoals_UserGoalsId",
                table: "Diaries",
                column: "UserGoalsId",
                principalTable: "UserGoals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Diaries_UserGoals_UserGoalsId",
                table: "Diaries");

            migrationBuilder.DropTable(
                name: "UserGoals");

            migrationBuilder.DropIndex(
                name: "IX_Diaries_UserGoalsId",
                table: "Diaries");

            migrationBuilder.DropColumn(
                name: "StartingWeight",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "WeightGoal",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "UserGoalsId",
                table: "Diaries");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Diaries");

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "Diaries",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
