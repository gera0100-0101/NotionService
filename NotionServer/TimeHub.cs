using Microsoft.AspNetCore.SignalR;

namespace NotionServer
{
    public class TimeHub : Hub
    {
        private readonly TimeService _timeService;

        public TimeHub(TimeService timeService)
        {
            _timeService = timeService;
        }

        public async Task GetTime(string message)
        {
            DateTime currentDateTime;

            while (true)
            {
                currentDateTime = _timeService.GetTime().Result;
                await Clients.All.SendAsync("ReceiveTime", currentDateTime);
                await Task.Delay(1000);
            }
        }
    }
}
