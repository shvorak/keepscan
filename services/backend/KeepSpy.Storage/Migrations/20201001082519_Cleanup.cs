using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class Cleanup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"delete from transaction");
            migrationBuilder.Sql(@"delete from redeem");
            migrationBuilder.Sql(@"delete from deposit");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
