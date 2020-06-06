using System;
using System.ComponentModel.DataAnnotations;

public class PawnToCreateDTO : PawnToWriteDTO
{
    [Required]
    public int Type { get; set; }
}