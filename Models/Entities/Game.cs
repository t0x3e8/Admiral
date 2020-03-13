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
    
    public Game()
    {
        this.Created = DateTime.Now;
    }
}