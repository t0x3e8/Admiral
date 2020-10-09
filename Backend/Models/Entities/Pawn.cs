using System;
using System.ComponentModel.DataAnnotations;

public class Pawn
{
    [Key]
    public Guid Id { get; set; }
    [Required]
    public int Col { get; set; }
    public int OldCol { get; set; }
    [Required]
    public int Row { get; set; }
    public int OldRow { get; set; }
    [Required]
    public int Type { get; set; }
    [Required]
    public Guid PlayerId { get; set; }
    public Guid GameId { get; set; }
    public int DamageLevel { get; set; }
}