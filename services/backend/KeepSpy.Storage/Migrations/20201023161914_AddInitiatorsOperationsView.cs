using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AddInitiatorsOperationsView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                CREATE MATERIALIZED VIEW operation_view AS
                select 'deposit' as type,
                       sender_address,
                       id        as tdt,
                       status,
                       created_at,
                       lot_size,
                       bitcoin_address,
                       updated_at
                from deposit
                union
                select 'redeem' as type,
                       r.sender_address,
                       d.id     as tdt,
                       r.status,
                       r.created_at,
                       d.lot_size,
                       r.bitcoin_address,
                       r.updated_at
                from redeem r
                         join deposit d on r.deposit_id = d.id
                order by created_at DESC
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP MATERIALIZED VIEW operation_view");
        }
    }
}
