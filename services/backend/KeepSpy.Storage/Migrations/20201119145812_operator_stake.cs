using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class operator_stake : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("update network set last_block_processed = null where Kind = 1");
            migrationBuilder.Sql(@"CREATE OR REPLACE FUNCTION public.operator_stake(IN id text)
    RETURNS numeric
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100
    
AS $BODY$
declare
res_amount numeric default 0;
rec record;
events cursor(s_id text)  for
select se.amount, type from stake_event se
join transaction t on se.transaction_id = t.id
where signer_id = s_id order by t.timestamp;
begin
open events(id);
loop
    fetch events into rec;
    exit when not found;

    if rec.type = 1 or rec.type = 8 then 
         res_amount := res_amount + rec.amount;
    end if;
	if rec.type = 4 then 
         res_amount := rec.amount;
    end if;
	if rec.type = 5 then 
         res_amount := 0;
    end if;
end loop;  
close events;
return res_amount;
end;
$BODY$;");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP FUNCTION public.operator_stake;");
        }
    }
}
