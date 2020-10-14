using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class PostgresConventionsFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_deposit_signer",
                table: "deposit_signer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_bond",
                table: "bond");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CurrencyRate",
                table: "CurrencyRate");

            migrationBuilder.RenameTable(
                name: "CurrencyRate",
                newName: "currency_rate");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "currency_rate",
                newName: "value");

            migrationBuilder.RenameColumn(
                name: "Source",
                table: "currency_rate",
                newName: "source");

            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "currency_rate",
                newName: "timestamp");

            migrationBuilder.RenameColumn(
                name: "TradePair",
                table: "currency_rate",
                newName: "trade_pair");

            migrationBuilder.AddPrimaryKey(
                name: "pk_deposit_signer",
                table: "deposit_signer",
                columns: new[] { "deposit_id", "signer_id" });

            migrationBuilder.AddPrimaryKey(
                name: "pk_bond",
                table: "bond",
                columns: new[] { "deposit_id", "signer_id" });

            migrationBuilder.AddPrimaryKey(
                name: "pk_currency_rate",
                table: "currency_rate",
                columns: new[] { "timestamp", "trade_pair", "source" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "pk_deposit_signer",
                table: "deposit_signer");

            migrationBuilder.DropPrimaryKey(
                name: "pk_bond",
                table: "bond");

            migrationBuilder.DropPrimaryKey(
                name: "pk_currency_rate",
                table: "currency_rate");

            migrationBuilder.RenameTable(
                name: "currency_rate",
                newName: "CurrencyRate");

            migrationBuilder.RenameColumn(
                name: "value",
                table: "CurrencyRate",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "source",
                table: "CurrencyRate",
                newName: "Source");

            migrationBuilder.RenameColumn(
                name: "timestamp",
                table: "CurrencyRate",
                newName: "Timestamp");

            migrationBuilder.RenameColumn(
                name: "trade_pair",
                table: "CurrencyRate",
                newName: "TradePair");

            migrationBuilder.AddPrimaryKey(
                name: "PK_deposit_signer",
                table: "deposit_signer",
                columns: new[] { "deposit_id", "signer_id" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_bond",
                table: "bond",
                columns: new[] { "deposit_id", "signer_id" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_CurrencyRate",
                table: "CurrencyRate",
                columns: new[] { "Timestamp", "TradePair", "Source" });
        }
    }
}
