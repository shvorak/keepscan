using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class RenameOperationToDeposit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "operation");

            migrationBuilder.CreateTable(
                name: "deposit",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
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
                    table.PrimaryKey("pk_deposit", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "deposit");

            migrationBuilder.CreateTable(
                name: "operation",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    bitcoin_address = table.Column<string>(type: "text", nullable: true),
                    completed_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    lot_size = table.Column<decimal>(type: "numeric", nullable: true),
                    lot_size_fee = table.Column<decimal>(type: "numeric", nullable: true),
                    lot_size_minted = table.Column<decimal>(type: "numeric", nullable: true),
                    sender_address = table.Column<string>(type: "text", nullable: false),
                    type = table.Column<int>(type: "integer", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_operation", x => x.id);
                });
        }
    }
}
