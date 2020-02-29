
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace code.api.Controllers
{
    [ApiController]
    public class GameController : ControllerBase
    {
        // GET: api/TodoItems/5
        [HttpGet]
        [Route("api/[controller]/Item/{id}")]
        public ActionResult<TestItem> GetTestItem(long id)
        {
            return new TestItem()
            {
                Id = id,
                IsComplete = false
            };
        }

    }
}