namespace FoodTracker.Infrastructure.Services.S3
{
    public class S3FileUploaderOptions
    {
        public string BucketName { get; init; }
        public string EndpointUrl { get; init; }
        public string CdnEndpointUrl { get; set; }
        public string AccessKeyId { get; init; }
        public string AccessKeySecret { get; init; }

    }
}
