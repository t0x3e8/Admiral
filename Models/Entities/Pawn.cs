using System.ComponentModel.DataAnnotations;

public class Pawn {
    [Key]
    public int Id { get; set; }
    [Required]
    public int Col { get; set; }
    [Required]
    public int Row { get; set; }
    [Required]
    public int Type { get; set; }
}