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

    public UserController(IOptions<AppSettings> options)
    {
        this.appSettings = options.Value;
    }

    [AllowAnonymous]
    [HttpPost]
    public IActionResult CreateJWTToken([FromBody]TokenRequest request) {
        var claims = new [] {
            new Claim(ClaimTypes.Name, request.Username)
        };

        byte[] key = Encoding.UTF8.GetBytes(this.appSettings.Secret);
        SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(key);
        SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
        
        JwtSecurityToken token = new JwtSecurityToken(
          claims: claims,
          expires: DateTime.Now.AddMinutes(30),
          signingCredentials: credentials
        );

        return Ok(new {
          token = new JwtSecurityTokenHandler().WriteToken(token)
        });
    }
  }
}