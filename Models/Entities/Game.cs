using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Game
{
    [Key]
    public Guid Id { get; set; }
    public DateTime Created { get; set; }
    public List<Player> Players { get; set; }
    [Required]
    public int Status { get; set; }
    [MinLength(3, ErrorMessage="Game name is too short. Min is 3 letters.")]
    [MaxLength(16, ErrorMessage="Game name is too long. Max is 16 letters.")]
    [Required(ErrorMessage="Game cannot be null or empty.")]
    public string Name { get; set; }

    public Game()
    {
        this.Id = Guid.NewGuid();
        this.Created = DateTime.Now;
        this.Status = 0;
        this.Players = new List<Player>();
    }
}