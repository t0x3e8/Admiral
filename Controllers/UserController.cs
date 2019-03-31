using System;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using code.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace code.Controllers {

  public class UserController : Controller
  {
    private readonly AppSettings appSettings;
    public IClientService ClientService { get; set; }

    public UserController(IClientService clientService)
    {
        this.ClientService = clientService;
    }

    public UserController(IOptions<AppSettings> options)
    {
        this.appSettings = options.Value;
    }

    [AllowAnonymous]
    [HttpPost]
    public IActionResult CreateJWTToken([FromBody]TokenRequest request) {
        var token = this.ClientService.GetJWT(request.Username, this.appSettings.Secret);

        return Ok(new {
            token = new JwtSecurityTokenHandler().WriteToken(token)
        });
    }
  }
}