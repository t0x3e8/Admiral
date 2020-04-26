using System;
using System.ComponentModel.DataAnnotations;

public class PlayerToCreateDTO : PlayerToWriteDTO {
    [Required]
    public Guid? Id { get; set; }      
}