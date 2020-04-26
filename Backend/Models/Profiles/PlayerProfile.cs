using System;
using System.Collections.Generic;
using AutoMapper;

public class PlayerProfile : AutoMapper.Profile
{
  public PlayerProfile()
  {
    this.CreateMap<PlayerToAuthenticateDTO, Player>();
    this.CreateMap<Player, PlayerAuthenticatedDTO>();
    this.CreateMap<Player, PlayerDTO>();
    this.CreateMap<PlayerToCreateDTO, Player>();
  }
}