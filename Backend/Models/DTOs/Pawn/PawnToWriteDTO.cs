using System.ComponentModel.DataAnnotations;

public abstract class PawnToWriteDTO
{
    [Required]
    public int Col { get; set; }
    public int OldCol { get; set; }
    [Required]
    public int Row { get; set; }
    public int OldRow { get; set; }
    [Required]
    public int Type { get; set; }
}