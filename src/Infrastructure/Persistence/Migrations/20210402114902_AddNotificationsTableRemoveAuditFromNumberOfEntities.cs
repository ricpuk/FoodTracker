using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FoodTracker.Infrastructure.Persistence.Migrations
{
    public partial class AddNotificationsTableRemoveAuditFromNumberOfEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "StartingWeight",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "WeightGoal",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "ProductServings");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Diaries");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Diaries");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "Diaries");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "Diaries");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "CoachingRequests");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "CoachingRequests");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "CoachingRequests");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "CoachingRequests");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "UserProfiles",
                newName: "NotificationsLastSeen");

            migrationBuilder.AddColumn<double>(
                name: "StartingWeight",
                table: "UserGoals",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "WeightGoal",
                table: "UserGoals",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserProfileId",
                table: "Notifications",
                column: "UserProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropColumn(
                name: "StartingWeight",
                table: "UserGoals");

            migrationBuilder.DropColumn(
                name: "WeightGoal",
                table: "UserGoals");

            migrationBuilder.RenameColumn(
                name: "NotificationsLastSeen",
                table: "UserProfiles",
                newName: "Created");

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "UserProfiles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "UserProfiles",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "UserProfiles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "StartingWeight",
                table: "UserProfiles",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "WeightGoal",
                table: "UserProfiles",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "ProductServings",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "ProductServings",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "ProductServings",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "ProductServings",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Diaries",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Diaries",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "Diaries",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "Diaries",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "CoachingRequests",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "CoachingRequests",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "CoachingRequests",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "CoachingRequests",
                type: "text",
                nullable: true);
        }
    }
}
