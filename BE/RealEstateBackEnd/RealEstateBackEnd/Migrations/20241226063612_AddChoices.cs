using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class AddChoices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "RealEstate",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<int>(
                name: "choices",
                table: "RealEstate",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "RealEstate");

            migrationBuilder.DropColumn(
                name: "choices",
                table: "RealEstate");
        }
    }
}
