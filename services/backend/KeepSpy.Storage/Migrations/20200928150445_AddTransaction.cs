using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AddTransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "transaction",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    deposit_id = table.Column<string>(nullable: false),
                    timestamp = table.Column<DateTime>(nullable: false),
                    status = table.Column<int>(nullable: false),
                    block = table.Column<long>(nullable: false),
                    amount = table.Column<decimal>(nullable: false),
                    fee = table.Column<decimal>(nullable: false),
                    is_error = table.Column<bool>(nullable: false),
                    error = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_transaction", x => x.id);
                    table.ForeignKey(
                        name: "fk_transaction_deposit_deposit_id",
                        column: x => x.deposit_id,
                        principalTable: "deposit",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_transaction_deposit_id",
                table: "transaction",
                column: "deposit_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "transaction");
        }
    }
}
