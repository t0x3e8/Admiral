using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Player {
    [Key]
    public Guid Id { get; set; }

    [MinLength(3, ErrorMessage="Player name is too short. Min is 3 letters.")]
    [MaxLength(16, ErrorMessage="Player name is too long. Max is 16 letters.")]
    public string Name { get; set; }

    public Player()
    {
        this.Id = Guid.NewGuid();
    }
}