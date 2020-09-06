using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Allegero.API.Migrations
{
    public partial class update_Items : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "WhenOccasionWasStarted",
                table: "Items",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<decimal>(
                name: "NewestPrice",
                table: "Items",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GraphicCard",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HaveDedictedCard",
                table: "Items",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Proccesor",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RAM",
                table: "Items",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "GraphicCard",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "HaveDedictedCard",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Proccesor",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "RAM",
                table: "Items");

            migrationBuilder.AlterColumn<DateTime>(
                name: "WhenOccasionWasStarted",
                table: "Items",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "NewestPrice",
                table: "Items",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);
        }
    }
}
