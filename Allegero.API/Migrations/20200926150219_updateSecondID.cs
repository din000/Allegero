using Microsoft.EntityFrameworkCore.Migrations;

namespace Allegero.API.Migrations
{
    public partial class updateSecondID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SecondId",
                table: "Photos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SecondId",
                table: "Photos");
        }
    }
}
