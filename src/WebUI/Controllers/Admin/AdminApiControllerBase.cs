using Microsoft.AspNetCore.Mvc;
using FoodTracker.WebUI.Filters;

namespace FoodTracker.WebUI.Controllers.Admin
{
    [Administrator]
    [Route("api/admin/[controller]")]
    public class AdminApiControllerBase : ApiControllerBase
    {
    }
}
