using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace GTTASPCore.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Certificates",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    alias = table.Column<string>(nullable: true),
                    entidad_emisora = table.Column<string>(nullable: true),
                    serie = table.Column<long>(nullable: false),
                    subject = table.Column<string>(nullable: true),
                    caducidad = table.Column<DateTime>(nullable: false),
                    password = table.Column<string>(nullable: true),
                    id_orga = table.Column<long>(nullable: false),
                    cliente = table.Column<string>(nullable: true),
                    itegraciones_institucion = table.Column<string>(nullable: true),
                    persona_contacto = table.Column<string>(nullable: true),
                    reporsitorio = table.Column<string>(nullable: true),
                    observaciones = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Certificates", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Jiras",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    username = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jiras", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    username = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Certificates");

            migrationBuilder.DropTable(
                name: "Jiras");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
