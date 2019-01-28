using Microsoft.EntityFrameworkCore.Migrations;

namespace GTTASPCore.Migrations
{
    public partial class RelationUserJira : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "role",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "user_jiraid",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "component",
                table: "Jiras",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "proyect",
                table: "Jiras",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "url",
                table: "Jiras",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_user_jiraid",
                table: "Users",
                column: "user_jiraid");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Jiras_user_jiraid",
                table: "Users",
                column: "user_jiraid",
                principalTable: "Jiras",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Jiras_user_jiraid",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_user_jiraid",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "role",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "user_jiraid",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "component",
                table: "Jiras");

            migrationBuilder.DropColumn(
                name: "proyect",
                table: "Jiras");

            migrationBuilder.DropColumn(
                name: "url",
                table: "Jiras");
        }
    }
}
