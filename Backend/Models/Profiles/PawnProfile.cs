using System;

public class PawnProfile : AutoMapper.Profile {
    public PawnProfile()
    {
      this.CreateMap<PawnToCreateDTO, Pawn>().ReverseMap();
      this.CreateMap<Pawn, PawnDTO>();
      this.CreateMap<PawnToPatchDTO, Pawn>().ReverseMap();
    }
}