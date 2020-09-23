using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AddedTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "network",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    name = table.Column<string>(nullable: false),
                    kind = table.Column<int>(nullable: false),
                    is_testnet = table.Column<bool>(nullable: false),
                    last_block = table.Column<long>(nullable: false),
                    last_block_at = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_network", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "operation",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    type = table.Column<int>(nullable: false),
                    sender_address = table.Column<string>(nullable: false),
                    bitcoin_address = table.Column<string>(nullable: true),
                    lot_size = table.Column<decimal>(nullable: true),
                    lot_size_fee = table.Column<decimal>(nullable: true),
                    lot_size_minted = table.Column<decimal>(nullable: true),
                    created_at = table.Column<DateTime>(nullable: false),
                    updated_at = table.Column<DateTime>(nullable: true),
                    completed_at = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_operation", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "contract",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    name = table.Column<string>(nullable: false),
                    active = table.Column<bool>(nullable: false),
                    network_id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_contract", x => x.id);
                    table.ForeignKey(
                        name: "fk_contract_network_network_id",
                        column: x => x.network_id,
                        principalTable: "network",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "network",
                columns: new[] { "id", "is_testnet", "kind", "last_block", "last_block_at", "name" },
                values: new object[,]
                {
                    { new Guid("bf9c69d8-7fb5-4287-a41c-4d74ef7fea80"), true, 1, 0L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ropsten" },
                    { new Guid("ed3664ed-5911-403d-870a-a60491abb660"), true, 0, 0L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bitcoin Testnet" }
                });

            migrationBuilder.InsertData(
                table: "contract",
                columns: new[] { "id", "active", "name", "network_id" },
                values: new object[] { "0x4CEE725584e38413603373C9D5df593a33560293", true, "Deposit Factory", new Guid("bf9c69d8-7fb5-4287-a41c-4d74ef7fea80") });

            migrationBuilder.CreateIndex(
                name: "ix_contract_network_id",
                table: "contract",
                column: "network_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "contract");

            migrationBuilder.DropTable(
                name: "operation");

            migrationBuilder.DropTable(
                name: "network");
        }
    }
}
