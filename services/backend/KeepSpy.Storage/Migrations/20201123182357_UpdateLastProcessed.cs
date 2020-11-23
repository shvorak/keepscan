using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class UpdateLastProcessed2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("update network set last_block_processed = null where Kind = 1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
