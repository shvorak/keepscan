using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class Transactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "kind",
                table: "transaction",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<string>(
                name: "recipient",
                table: "transaction",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "sender",
                table: "transaction",
                nullable: true);
            
            migrationBuilder.Sql(@"delete from transaction");
            migrationBuilder.Sql(@"delete from redeem");
            migrationBuilder.Sql(@"delete from deposit");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "kind",
                table: "transaction");

            migrationBuilder.DropColumn(
                name: "recipient",
                table: "transaction");

            migrationBuilder.DropColumn(
                name: "sender",
                table: "transaction");
        }
    }
}
