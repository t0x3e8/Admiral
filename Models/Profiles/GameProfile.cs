using System;
using System.Collections.Generic;
using System.Linq;

public class GameProfile : AutoMapper.Profile
{
    public GameProfile()
    {
        this.CreateMap<Game, GameDTO>()
            .ForMember(
                dest => dest.GameDuration,
                opt => opt.MapFrom(src => DateTime.Now.Subtract(src.Created).TotalHours))
            .ForMember(
                dest => dest.GameStatus,
                opt => opt.MapFrom(src => src.Status)
            )
            .ForMember(
                dest => dest.Players,
                opt => opt.MapFrom(src => src.Players.Select(gp => gp.Player))
            );

        this.CreateMap<GameToCreateDTO, Game>()
            .ForMember(
                dest => dest.Players,
                opt => opt.MapFrom((src, dest) => new List<GamePlayer>() {
                    new GamePlayer() {
                        PlayerId = src.Players[0].Id.Value,
                        GameId = dest.Id
                    }
                })
            );

        this.CreateMap<Game, GameToPatchDTO>();
        this.CreateMap<GameToPatchDTO, Game>();
    }
}