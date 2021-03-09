using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(FoodTracker.WebUI.Areas.Identity.IdentityHostingStartup))]
namespace FoodTracker.WebUI.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}