using Microsoft.EntityFrameworkCore.Migrations;

namespace GTTASPCore.Migrations
{
    public partial class JiraV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "descripcion",
                table: "Jiras",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "issue_type",
                table: "Jiras",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "descripcion",
                table: "Jiras");

            migrationBuilder.DropColumn(
                name: "issue_type",
                table: "Jiras");
        }
    }
}
