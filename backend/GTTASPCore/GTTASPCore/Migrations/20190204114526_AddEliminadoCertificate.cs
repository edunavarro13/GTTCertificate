using Microsoft.EntityFrameworkCore.Migrations;

namespace GTTASPCore.Migrations
{
    public partial class AddEliminadoCertificate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "eliminado",
                table: "Certificates",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "eliminado",
                table: "Certificates");
        }
    }
}
