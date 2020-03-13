using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Player {
    [Key]
    public Guid Id { get; set; }
    [Required]
    [MaxLength(32)]
    public string Name { get; set; }
    public List<Pawn> Pawns { get; set; }
}