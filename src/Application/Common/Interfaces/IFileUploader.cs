using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace FoodTracker.Application.Common.Interfaces
{
    public interface IFileUploader
    {
        /// <summary>
        /// Uploads a provided file.
        /// </summary>
        /// <param name="file">File to upload.</param>
        /// <returns>Path to file.</returns>
        Task<string> UploadAsync(IFormFile file);
    }
}
