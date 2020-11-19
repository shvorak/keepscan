using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class StakeEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "stake_event",
                columns: table => new
                {
                    log_index = table.Column<string>(nullable: false),
                    transaction_id = table.Column<string>(nullable: false),
                    signer_id = table.Column<string>(nullable: false),
                    amount = table.Column<decimal>(nullable: true),
                    type = table.Column<int>(nullable: false),
                    deposit_id = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_stake_event", x => new { x.log_index, x.transaction_id });
                    table.ForeignKey(
                        name: "fk_stake_event_deposit_deposit_id",
                        column: x => x.deposit_id,
                        principalTable: "deposit",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_stake_event_signer_signer_id",
                        column: x => x.signer_id,
                        principalTable: "signer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_stake_event_transaction_transaction_id",
                        column: x => x.transaction_id,
                        principalTable: "transaction",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_stake_event_deposit_id",
                table: "stake_event",
                column: "deposit_id");

            migrationBuilder.CreateIndex(
                name: "ix_stake_event_signer_id",
                table: "stake_event",
                column: "signer_id");

            migrationBuilder.CreateIndex(
                name: "ix_stake_event_transaction_id",
                table: "stake_event",
                column: "transaction_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "stake_event");
        }
    }
}
