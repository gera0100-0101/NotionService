using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace NotionServer
{
    public class TimeService
    {
        private DateTime _time;

        public async Task<DateTime> GetTime()
        {
            string url = "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Moscow";

            using HttpClient client = new HttpClient();

            try
            {
                HttpResponseMessage message = await client.GetAsync(url);
                message.EnsureSuccessStatusCode();

                string json = await message.Content.ReadAsStringAsync();
                JsonElement data = JsonSerializer.Deserialize<JsonElement>(json);
                int year = data.GetProperty("year").GetInt32();
                int month = data.GetProperty("month").GetInt32();
                int day = data.GetProperty("day").GetInt32();
                int hour = data.GetProperty("hour").GetInt32();
                int minute = data.GetProperty("minute").GetInt32();
                int seconds = data.GetProperty("seconds").GetInt32();

                DateTime dateTime = new DateTime(year, month, day, hour, minute, seconds);

                return dateTime;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка: {ex.Message}");
                return new DateTime();
            }
        }
    }
}
