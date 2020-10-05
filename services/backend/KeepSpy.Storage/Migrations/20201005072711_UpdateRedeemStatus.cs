using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class UpdateRedeemStatus2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"update Redeem
set Status = (select redeem_status from Transaction where Redeem_ID = Redeem.Id order by timestamp desc limit 1)
where exists(select null from Transaction where Redeem_ID = Redeem.Id)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
