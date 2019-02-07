using Microsoft.EntityFrameworkCore.Migrations;

namespace GTTASPCore.Migrations
{
    public partial class archivoInCertificate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "nombreArchivo",
                table: "Certificates",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nombreArchivo",
                table: "Certificates");
        }
    }
}
