using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AddContractLog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "contract_log",
                columns: table => new
                {
                    transaction_id = table.Column<string>(nullable: false),
                    log_index = table.Column<string>(nullable: false),
                    fee = table.Column<decimal>(nullable: false),
                    time_stamp = table.Column<DateTime>(nullable: false),
                    block_number = table.Column<long>(nullable: false),
                    address = table.Column<string>(nullable: false),
                    data = table.Column<string>(nullable: false),
                    topic0 = table.Column<string>(nullable: false),
                    topic1 = table.Column<string>(nullable: false),
                    topic2 = table.Column<string>(nullable: false),
                    topic3 = table.Column<string>(nullable: false),
                    created_at = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_contract_log", x => new { x.transaction_id, x.log_index });
                });

            migrationBuilder.CreateIndex(
                name: "ix_contract_log_address",
                table: "contract_log",
                column: "address");

            migrationBuilder.CreateIndex(
                name: "ix_contract_log_topic0",
                table: "contract_log",
                column: "topic0");

            migrationBuilder.CreateIndex(
                name: "ix_contract_log_transaction_id",
                table: "contract_log",
                column: "transaction_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "contract_log");
        }
    }
}
