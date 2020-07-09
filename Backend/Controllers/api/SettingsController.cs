using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace code.api.Controllers
{
    [ApiController]
    [Route("api/settings")]
    public class SettingsController : ControllerBase {
        public SettingsController()
        {
            
        }

        public ActionResult<GameSettings> GetSettings() {
            var settingsFactory = new DefaultSettingsFactory();
            
            return Ok(settingsFactory.GetSettings());
        }
    }
}