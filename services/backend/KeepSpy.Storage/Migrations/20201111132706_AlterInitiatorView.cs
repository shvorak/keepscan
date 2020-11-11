using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AlterInitiatorView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP MATERIALIZED VIEW initiator_view;
                CREATE MATERIALIZED VIEW initiator_view AS
                select sender_address id,
                       (select count(*)
                        from deposit d
                        where d.sender_address = s.sender_address
                       ) deposits_count,
                       (select sum(lot_size)
                        from deposit d
                        where d.sender_address = s.sender_address
                       ) deposits_amount,

                       (select sum(lot_size)
                        from deposit d
                                 join redeem r on d.id = r.deposit_id
                        where r.sender_address = s.sender_address
                       ) redeems_amount,
                       (select count(*) from redeem r where r.sender_address = s.sender_address) redeems_count,
                       coalesce((select max(timestamp) from transaction t where t.sender = s.sender_address),
					   (select max(r.created_at) from redeem r where s.sender_address = r.sender_address)) last_seen_at,
                       (select sum(lot_size)
                        from deposit d
                        where d.sender_address = s.sender_address and d.status between 5 and 6) minted_amount,
                       (select count(*)
                        from deposit d
                        where d.sender_address = s.sender_address and d.status between 5 and 6) minted_count,
                       (select sum(lot_size)
                        from deposit d
                                 join redeem r on d.id = r.deposit_id
                        where r.sender_address = s.sender_address
                          and r.status <> 6) redeemed_amount,
                       (select count(*) from redeem r where r.sender_address = s.sender_address and r.status <> 6) redeemed_count
                from (
                         select sender_address
                         from deposit
                         union
                         select sender_address
                         from redeem
                         where sender_address <> '') s
                order by 2 desc;
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
