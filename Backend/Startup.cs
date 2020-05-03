using System;
using code.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json.Serialization;

namespace code
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllersWithViews(configure =>
      {
        // show an 406 when format is not acceptable
        configure.ReturnHttpNotAcceptable = true;
      })
      .AddNewtonsoftJson(setupAction => 
        setupAction.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver()
      )
      .AddXmlDataContractSerializerFormatters();

      // configure strongly typed settings objects
      var appSettingsSection = Configuration.GetSection("AppSettings");
      services.Configure<AppSettings>(appSettingsSection);

      // Register the Swagger generator, defining 1 or more Swagger documents
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Admiral API", Version = "v1" });
      });

      // register AutoMapper
      services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

      // register database
      services.AddDbContext<AdmiralDbContext>(options =>
      {
        options.UseSqlServer(Configuration.GetConnectionString("AdmiralContext"));
      });
      services.AddScoped<IPlayersRepository, PlayersRepository>();
      services.AddScoped<IGamesRepository, GamesRepository>();
      services.AddScoped<IPawnsRepository, PawnsRepository>();

      // configure jwt authentication
      var appSettings = appSettingsSection.Get<AppSettings>();
      var key = Encoding.ASCII.GetBytes(appSettings.Secret);
      services.AddAuthentication(x =>
      {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(x =>
      {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false
        };
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      // Enable middleware to serve generated Swagger as a JSON endpoint.
      app.UseSwagger();
      // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Admiral API V1");
      });

      // redirects from http to https
      app.UseHttpsRedirection();
      // loads wwwroot content
      app.UseStaticFiles();
      // matches request to an endpoint.
      app.UseRouting();


      app.UseAuthentication();
      app.UseAuthorization();

      // Execute the matched endpoint
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller=Home}/{action=Index}/{id?}");
              // The below code fixes the page refresh Url in SPA
              endpoints.MapFallbackToController("Index", "Home");
      });
    }
  }
}
