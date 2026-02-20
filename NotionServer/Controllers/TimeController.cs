using Microsoft.AspNetCore.Mvc;

namespace NotionServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimeController : ControllerBase
    {
        private readonly TimeService _timeService;

        public TimeController(TimeService timeService)
        {
            _timeService = timeService;
        }

        /*[HttpGet]
        public async DateTime Get()
        {

        }*/
    }
}
