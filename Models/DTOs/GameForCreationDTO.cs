using System.ComponentModel.DataAnnotations;

public class GameForCreationDTO {
    [MinLength(3, ErrorMessage="Game name is too short. Min is 3 letters.")]
    [MaxLength(16, ErrorMessage="Game name is too long. Max is 16 letters.")]
    [Required(ErrorMessage="Game cannot be null or empty.")]
    public string Name { get; set; }

}