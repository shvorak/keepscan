using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AddDepositProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "contract_id",
                table: "deposit",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "deposit",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "network",
                keyColumn: "id",
                keyValue: new Guid("bf9c69d8-7fb5-4287-a41c-4d74ef7fea80"),
                column: "last_block",
                value: 8594983L);

            migrationBuilder.CreateIndex(
                name: "ix_deposit_contract_id",
                table: "deposit",
                column: "contract_id");

            migrationBuilder.AddForeignKey(
                name: "fk_deposit_contract_contract_id",
                table: "deposit",
                column: "contract_id",
                principalTable: "contract",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_deposit_contract_contract_id",
                table: "deposit");

            migrationBuilder.DropIndex(
                name: "ix_deposit_contract_id",
                table: "deposit");

            migrationBuilder.DropColumn(
                name: "contract_id",
                table: "deposit");

            migrationBuilder.DropColumn(
                name: "status",
                table: "deposit");

            migrationBuilder.UpdateData(
                table: "network",
                keyColumn: "id",
                keyValue: new Guid("bf9c69d8-7fb5-4287-a41c-4d74ef7fea80"),
                column: "last_block",
                value: 0L);
        }
    }
}
