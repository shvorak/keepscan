using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AddDepositEndOfTerm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "end_of_term",
                table: "deposit",
                nullable: true);

            migrationBuilder.Sql(@"update deposit
set end_of_term = timestamp + interval '6 month'
from transaction t
where t.status = 3 and t.deposit_id = deposit.id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "end_of_term",
                table: "deposit");
        }
    }
}
