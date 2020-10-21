using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class UpdateDepositStatus2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"update deposit
set Status = (select status from Transaction where deposit_ID = deposit.Id and is_error = false order by timestamp desc limit 1)
where exists(select null from Transaction where deposit_ID = deposit.Id)
and not exists(select null from redeem where deposit_ID = deposit.Id);

update deposit
set Status = 6
where exists(select null from redeem where deposit_ID = deposit.Id and status <> 6)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
