using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Domain.Entities;
using MediatR;

namespace FoodTracker.Application.Users.Commands
{
    public class UpdateCurrentUserProfileCommand : IRequest<UserProfileDto>
    {
        public UserProfileDto Profile { get; set; }

    }

    public class UpdateCurrentUserProfileCommandHandler : IRequestHandler<UpdateCurrentUserProfileCommand, UserProfileDto>
    {
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;

        public UpdateCurrentUserProfileCommandHandler(IIdentityService identityService, IMapper mapper)
        {
            _identityService = identityService;
            _mapper = mapper;
        }
        public async Task<UserProfileDto> Handle(UpdateCurrentUserProfileCommand request, CancellationToken cancellationToken)
        {
            var currentProfile = await _identityService.GetCurrentUserProfileAsync();
            UpdateUserProfile(request.Profile, currentProfile);
            await _identityService.UpdateCurrentUserProfileAsync(currentProfile);
            return _mapper.Map<UserProfileDto>(currentProfile);
        }

        private void UpdateUserProfile(UserProfileDto profile, UserProfile curerentProfile)
        {
            curerentProfile.FirstName = profile.FirstName;
            curerentProfile.LastName = profile.LastName;
            curerentProfile.ShortDescription = profile.ShortDescription;
            curerentProfile.WebsiteUrl = profile.WebsiteUrl;
            curerentProfile.YoutubeUrl = profile.YoutubeUrl;
            curerentProfile.TwitterUrl = profile.TwitterUrl;
            curerentProfile.InstagramUrl = profile.InstagramUrl;
            curerentProfile.FacebookUrl = profile.FacebookUrl;
        }
    }


}
