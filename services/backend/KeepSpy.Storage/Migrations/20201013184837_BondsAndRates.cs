using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class BondsAndRates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "bond",
                columns: table => new
                {
                    deposit_id = table.Column<string>(nullable: false),
                    signer_id = table.Column<string>(nullable: false),
                    amount = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bond", x => new { x.deposit_id, x.signer_id });
                    table.ForeignKey(
                        name: "fk_bond_deposit_deposit_id",
                        column: x => x.deposit_id,
                        principalTable: "deposit",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_bond_signer_signer_id",
                        column: x => x.signer_id,
                        principalTable: "signer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CurrencyRate",
                columns: table => new
                {
                    Timestamp = table.Column<DateTime>(nullable: false),
                    TradePair = table.Column<int>(nullable: false),
                    Source = table.Column<int>(nullable: false),
                    Value = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrencyRate", x => new { x.Timestamp, x.TradePair, x.Source });
                });

            migrationBuilder.CreateIndex(
                name: "ix_bond_signer_id",
                table: "bond",
                column: "signer_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bond");

            migrationBuilder.DropTable(
                name: "CurrencyRate");
        }
    }
}
