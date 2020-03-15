using System;

public class GameProfile : AutoMapper.Profile {
    public GameProfile()
    {
        this.CreateMap<Game, GameDTO>()
            .ForMember(
                dest => dest.GameDuration,
                opt => opt.MapFrom(src => DateTime.Now.Subtract(src.Created).TotalHours))
            .ForMember(
                dest => dest.GameStatus,
                opt => opt.MapFrom(src => src.Status)
            );
    }
}