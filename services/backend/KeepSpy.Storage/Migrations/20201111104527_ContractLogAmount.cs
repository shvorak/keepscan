using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class ContractLogAmount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "amount",
                table: "contract_log",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "amount",
                table: "contract_log");
        }
    }
}
