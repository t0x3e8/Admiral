using System;

public class PlayerProfile : AutoMapper.Profile {
    public PlayerProfile()
    {
        this.CreateMap<PlayerToAuthenticateDTO, Player>();
        this.CreateMap<Player, PlayerDTO>();
    }
}