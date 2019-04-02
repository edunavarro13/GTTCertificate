using Microsoft.EntityFrameworkCore.Migrations;

namespace GTTASPCore.Migrations
{
    public partial class UpdateCertificate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "serie",
                table: "Certificates",
                nullable: true,
                oldClrType: typeof(long));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "serie",
                table: "Certificates",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
