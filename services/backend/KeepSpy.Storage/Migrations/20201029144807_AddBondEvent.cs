using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AddBondEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "status",
                table: "transaction",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "bond_event",
                columns: table => new
                {
                    log_index = table.Column<string>(nullable: false),
                    transaction_id = table.Column<string>(nullable: false),
                    signer_id = table.Column<string>(nullable: false),
                    amount = table.Column<decimal>(nullable: false),
                    reference_id = table.Column<string>(nullable: true),
                    beneficiary = table.Column<string>(nullable: true),
                    type = table.Column<int>(nullable: false),
                    deposit_id = table.Column<string>(nullable: true),
                    released = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_bond_event", x => new { x.log_index, x.transaction_id });
                    table.ForeignKey(
                        name: "fk_bond_event_deposit_deposit_id",
                        column: x => x.deposit_id,
                        principalTable: "deposit",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_bond_event_signer_signer_id",
                        column: x => x.signer_id,
                        principalTable: "signer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_bond_event_transaction_transaction_id",
                        column: x => x.transaction_id,
                        principalTable: "transaction",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_bond_event_deposit_id",
                table: "bond_event",
                column: "deposit_id");

            migrationBuilder.CreateIndex(
                name: "ix_bond_event_signer_id",
                table: "bond_event",
                column: "signer_id");

            migrationBuilder.CreateIndex(
                name: "ix_bond_event_transaction_id",
                table: "bond_event",
                column: "transaction_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bond_event");

            migrationBuilder.AlterColumn<int>(
                name: "status",
                table: "transaction",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
