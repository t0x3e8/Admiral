using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace code.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 16, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 16, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pawns",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Col = table.Column<int>(nullable: false),
                    OldCol = table.Column<int>(nullable: false),
                    Row = table.Column<int>(nullable: false),
                    OldRow = table.Column<int>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    PlayerId = table.Column<Guid>(nullable: false),
                    GameId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pawns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pawns_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GamesPlayers",
                columns: table => new
                {
                    GameId = table.Column<Guid>(nullable: false),
                    PlayerId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GamesPlayers", x => new { x.GameId, x.PlayerId });
                    table.ForeignKey(
                        name: "FK_GamesPlayers_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GamesPlayers_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "Created", "Name", "Status" },
                values: new object[] { new Guid("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993"), new DateTime(2020, 4, 12, 12, 22, 1, 565, DateTimeKind.Local).AddTicks(2505), "Game number 1", 0 });

            migrationBuilder.InsertData(
                table: "Players",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("223afe6d-e6af-40a9-c57b-08d7db3a097e"), "Roman" });

            migrationBuilder.InsertData(
                table: "GamesPlayers",
                columns: new[] { "GameId", "PlayerId" },
                values: new object[] { new Guid("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993"), new Guid("223afe6d-e6af-40a9-c57b-08d7db3a097e") });

            migrationBuilder.InsertData(
                table: "Pawns",
                columns: new[] { "Id", "Col", "GameId", "OldCol", "OldRow", "PlayerId", "Row", "Type" },
                values: new object[] { new Guid("222afe6d-e6af-40a9-c57b-08d7db3a097e"), 4, new Guid("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993"), 1, 1, new Guid("223afe6d-e6af-40a9-c57b-08d7db3a097e"), 4, 3 });

            migrationBuilder.InsertData(
                table: "Pawns",
                columns: new[] { "Id", "Col", "GameId", "OldCol", "OldRow", "PlayerId", "Row", "Type" },
                values: new object[] { new Guid("111afe6d-e6af-40a9-c57b-08d7db3a097e"), 2, new Guid("7f86d95d-6ffb-4c1c-b8d9-c2a5e6be2993"), 0, 0, new Guid("223afe6d-e6af-40a9-c57b-08d7db3a097e"), 2, 2 });

            migrationBuilder.CreateIndex(
                name: "IX_GamesPlayers_PlayerId",
                table: "GamesPlayers",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Pawns_GameId",
                table: "Pawns",
                column: "GameId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GamesPlayers");

            migrationBuilder.DropTable(
                name: "Pawns");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "Games");
        }
    }
}
