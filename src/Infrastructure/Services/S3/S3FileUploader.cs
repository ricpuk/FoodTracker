using System;
using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Transfer;
using FoodTracker.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace FoodTracker.Infrastructure.Services.S3
{
    public class S3FileUploader : IFileUploader
    {

        private readonly string _bucketName;
        private readonly string _cdnEndpointUrl;
        private readonly AmazonS3Client _s3Client;
        public S3FileUploader(IOptionsMonitor<S3FileUploaderOptions> options)
        {
            var s3Options = options.CurrentValue;
            _bucketName = s3Options.BucketName;
            _cdnEndpointUrl = s3Options.CdnEndpointUrl;
            var s3ClientConfig = new AmazonS3Config
            {
                ServiceURL = s3Options.EndpointUrl,
            };
            _s3Client = new AmazonS3Client(s3Options.AccessKeyId, s3Options.AccessKeySecret, s3ClientConfig);
        }
        public async Task<string> UploadAsync(IFormFile file)
        {
            await using var newMemoryStream = new MemoryStream();
            await file.CopyToAsync(newMemoryStream);

            var extension = Path.GetExtension(file.FileName)?.Substring(1).ToLower();
            var guid = Guid.NewGuid();
            var fileName = $"{guid:N}.{extension}";

            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = newMemoryStream,
                Key = fileName,
                BucketName = _bucketName,
                CannedACL = S3CannedACL.PublicRead
            };

            var fileTransferUtility = new TransferUtility(_s3Client);
            await fileTransferUtility.UploadAsync(uploadRequest);
            return $"{_cdnEndpointUrl}/{fileName}";
        }
    }
}
