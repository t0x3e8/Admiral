using System;

public class PawnDTO
{
  public Guid Id { get; set; }
  public int Col { get; set; }
  public int OldCol { get; set; }
  public int Row { get; set; }
  public int OldRow { get; set; }
  public int Type { get; set; }
  public Guid PlayerId { get; set; }
  public int DamageLevel { get; set; }
}