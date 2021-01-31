using Microsoft.EntityFrameworkCore.Migrations;

namespace Allegero.API.Migrations
{
    public partial class update_Item3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfDescParts",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "P1_Desc",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "P2_Desc",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "P3_Desc",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "P4_Desc",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "P5_Desc",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Part1",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Part2",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Part3",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Part4",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Part5",
                table: "Items",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfDescParts",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "P1_Desc",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "P2_Desc",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "P3_Desc",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "P4_Desc",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "P5_Desc",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Part1",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Part2",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Part3",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Part4",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Part5",
                table: "Items");
        }
    }
}
