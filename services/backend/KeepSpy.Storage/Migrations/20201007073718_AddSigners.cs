using Microsoft.EntityFrameworkCore.Migrations;

namespace KeepSpy.Storage.Migrations
{
    public partial class AddSigners : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "honest_threshold",
                table: "deposit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "keep_address",
                table: "deposit",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "signer",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_signer", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "deposit_signer",
                columns: table => new
                {
                    deposit_id = table.Column<string>(nullable: false),
                    signer_id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_deposit_signer", x => new { x.deposit_id, x.signer_id });
                    table.ForeignKey(
                        name: "fk_deposit_signer_deposit_deposit_id",
                        column: x => x.deposit_id,
                        principalTable: "deposit",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_deposit_signer_signer_signer_id",
                        column: x => x.signer_id,
                        principalTable: "signer",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_deposit_signer_signer_id",
                table: "deposit_signer",
                column: "signer_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "deposit_signer");

            migrationBuilder.DropTable(
                name: "signer");

            migrationBuilder.DropColumn(
                name: "honest_threshold",
                table: "deposit");

            migrationBuilder.DropColumn(
                name: "keep_address",
                table: "deposit");
        }
    }
}
