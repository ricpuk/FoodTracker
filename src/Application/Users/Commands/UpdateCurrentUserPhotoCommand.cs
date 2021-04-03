using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace FoodTracker.Application.Users.Commands
{
    public class UpdateCurrentUserPhotoCommand : IRequest<string>
    {
        public IFormFile File { get; set; }
    }

    public class UpdateCurrentUserPhotoCommandHandler : IRequestHandler<UpdateCurrentUserPhotoCommand, string>
    {
        private readonly IIdentityService _identityService;
        private readonly IFileUploader _fileUploader;

        public UpdateCurrentUserPhotoCommandHandler(IIdentityService identityService, IFileUploader fileUploader)
        {
            _identityService = identityService;
            _fileUploader = fileUploader;
        }


        public async Task<string> Handle(UpdateCurrentUserPhotoCommand request, CancellationToken cancellationToken)
        {
            var profile = await _identityService.GetCurrentUserProfileAsync();
            var file = request.File;
            profile.ProfilePicture = await _fileUploader.UploadAsync(file);
            
            await _identityService.UpdateCurrentUserProfileAsync(profile);

            return profile.ProfilePicture;
        }
    }


}
