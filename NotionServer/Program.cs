
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NotionServer.Infrastructure;

namespace NotionServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:5002")
                        .AllowCredentials()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            builder.Services.AddScoped<TimeService>();
            builder.Services.AddDbContext<AppDbContext>(options => 
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddSignalR();

            var app = builder.Build();

            app.UseCors();

            app.UseAuthorization();

            app.MapHub<TimeHub>("/timeHub");

            app.Run();
        }
    }
}