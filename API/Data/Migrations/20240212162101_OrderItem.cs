using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class OrderItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Reservations_ReservationId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ReservationId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ReservationId",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "Reservations",
                newName: "SubmitDate");

            migrationBuilder.RenameColumn(
                name: "ReservationDate",
                table: "Reservations",
                newName: "ReservedTime");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "Reservations",
                newName: "ReservedDate");

            migrationBuilder.AddColumn<int>(
                name: "PaymentStatus",
                table: "Reservations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "OrderedItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Price = table.Column<long>(type: "INTEGER", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    Product_ProductId = table.Column<int>(type: "INTEGER", nullable: false),
                    Product_Title = table.Column<string>(type: "TEXT", nullable: false),
                    Product_ImageUrl = table.Column<string>(type: "TEXT", nullable: false),
                    ReservationId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderedItems_Reservations_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "Reservations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_ReservationId",
                table: "OrderedItems",
                column: "ReservationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderedItems");

            migrationBuilder.DropColumn(
                name: "PaymentStatus",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "SubmitDate",
                table: "Reservations",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "ReservedTime",
                table: "Reservations",
                newName: "ReservationDate");

            migrationBuilder.RenameColumn(
                name: "ReservedDate",
                table: "Reservations",
                newName: "EndTime");

            migrationBuilder.AddColumn<int>(
                name: "ReservationId",
                table: "Products",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ReservationId",
                table: "Products",
                column: "ReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Reservations_ReservationId",
                table: "Products",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id");
        }
    }
}
