using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class ResetLastBlock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("update network set last_block_processed = 11376600 where Kind = 1 and is_testnet = false");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
