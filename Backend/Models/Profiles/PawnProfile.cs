using System;

public class PawnProfile : AutoMapper.Profile {
    public PawnProfile()
    {
      this.CreateMap<PawnToCreateDTO, Pawn>();
      this.CreateMap<Pawn, PawnDTO>();
    }
}