using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RealEstate_Seller_SellerId",
                table: "RealEstate");

            migrationBuilder.AlterColumn<int>(
                name: "SellerId",
                table: "RealEstate",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_RealEstate_Seller_SellerId",
                table: "RealEstate",
                column: "SellerId",
                principalTable: "Seller",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RealEstate_Seller_SellerId",
                table: "RealEstate");

            migrationBuilder.AlterColumn<int>(
                name: "SellerId",
                table: "RealEstate",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RealEstate_Seller_SellerId",
                table: "RealEstate",
                column: "SellerId",
                principalTable: "Seller",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
