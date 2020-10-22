using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AddedIndexForSenderAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "ix_redeem_sender_address",
                table: "redeem",
                column: "sender_address");

            migrationBuilder.CreateIndex(
                name: "ix_deposit_sender_address",
                table: "deposit",
                column: "sender_address");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_redeem_sender_address",
                table: "redeem");

            migrationBuilder.DropIndex(
                name: "ix_deposit_sender_address",
                table: "deposit");
        }
    }
}
