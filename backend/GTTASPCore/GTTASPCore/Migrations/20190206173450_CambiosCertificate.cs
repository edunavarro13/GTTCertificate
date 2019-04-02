using Microsoft.EntityFrameworkCore.Migrations;

namespace GTTASPCore.Migrations
{
    public partial class CambiosCertificate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "reporsitorio",
                table: "Certificates",
                newName: "repositorio");

            migrationBuilder.AddColumn<string>(
                name: "fichero64",
                table: "Certificates",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "fichero64",
                table: "Certificates");

            migrationBuilder.RenameColumn(
                name: "repositorio",
                table: "Certificates",
                newName: "reporsitorio");
        }
    }
}
