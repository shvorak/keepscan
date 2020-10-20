using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class UpdateDepositStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"update deposit
set Status = (select status from Transaction where deposit_ID = deposit.Id order by timestamp desc limit 1)
where exists(select null from Transaction where deposit_ID = deposit.Id)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
