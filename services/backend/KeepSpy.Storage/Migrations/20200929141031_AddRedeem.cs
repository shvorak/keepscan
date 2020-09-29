using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AddRedeem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_transaction_deposit_deposit_id",
                table: "transaction");

            migrationBuilder.AlterColumn<string>(
                name: "deposit_id",
                table: "transaction",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "redeem_id",
                table: "transaction",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "redeem",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    status = table.Column<int>(nullable: false),
                    deposit_id = table.Column<string>(nullable: false),
                    created_at = table.Column<DateTime>(nullable: false),
                    sender_address = table.Column<string>(nullable: false),
                    bitcoin_address = table.Column<string>(nullable: true),
                    btc_redeemed = table.Column<decimal>(nullable: true),
                    btc_fee = table.Column<decimal>(nullable: true),
                    bitcoin_redeemed_block = table.Column<long>(nullable: true),
                    updated_at = table.Column<DateTime>(nullable: true),
                    completed_at = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_redeem", x => x.id);
                    table.ForeignKey(
                        name: "fk_redeem_deposit_deposit_id",
                        column: x => x.deposit_id,
                        principalTable: "deposit",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_transaction_redeem_id",
                table: "transaction",
                column: "redeem_id");

            migrationBuilder.CreateIndex(
                name: "ix_redeem_deposit_id",
                table: "redeem",
                column: "deposit_id");

            migrationBuilder.AddForeignKey(
                name: "fk_transaction_deposit_deposit_id",
                table: "transaction",
                column: "deposit_id",
                principalTable: "deposit",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_transaction_redeem_redeem_id",
                table: "transaction",
                column: "redeem_id",
                principalTable: "redeem",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_transaction_deposit_deposit_id",
                table: "transaction");

            migrationBuilder.DropForeignKey(
                name: "fk_transaction_redeem_redeem_id",
                table: "transaction");

            migrationBuilder.DropTable(
                name: "redeem");

            migrationBuilder.DropIndex(
                name: "ix_transaction_redeem_id",
                table: "transaction");

            migrationBuilder.DropColumn(
                name: "redeem_id",
                table: "transaction");

            migrationBuilder.AlterColumn<string>(
                name: "deposit_id",
                table: "transaction",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_transaction_deposit_deposit_id",
                table: "transaction",
                column: "deposit_id",
                principalTable: "deposit",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
