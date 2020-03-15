using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace code.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Player",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 32, nullable: false),
                    GameId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Player", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Player_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pawn",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Col = table.Column<int>(nullable: false),
                    Row = table.Column<int>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    PlayerId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pawn", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pawn_Player_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Player",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "Created", "Status" },
                values: new object[,]
                {
                    { new Guid("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993"), new DateTime(2020, 3, 15, 15, 36, 36, 251, DateTimeKind.Local).AddTicks(1164), 0 },
                    { new Guid("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2994"), new DateTime(2020, 3, 15, 10, 0, 0, 0, DateTimeKind.Local), 0 },
                    { new Guid("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2995"), new DateTime(2020, 3, 15, 13, 0, 0, 0, DateTimeKind.Local), 0 },
                    { new Guid("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2996"), new DateTime(2020, 3, 15, 1, 0, 0, 0, DateTimeKind.Local), 0 },
                    { new Guid("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2997"), new DateTime(2020, 3, 15, 11, 0, 0, 0, DateTimeKind.Local), 0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pawn_PlayerId",
                table: "Pawn",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Player_GameId",
                table: "Player",
                column: "GameId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pawn");

            migrationBuilder.DropTable(
                name: "Player");

            migrationBuilder.DropTable(
                name: "Games");
        }
    }
}
