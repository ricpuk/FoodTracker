using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Models;
using FoodTracker.Application.Diaries.Queries;
using FoodTracker.Application.Products;
using FoodTracker.Application.Products.Commands.CreateProduct;
using FoodTracker.Domain.Entities;
using FoodTracker.Infrastructure.Identity;
using FoodTracker.Infrastructure.Persistence;
using FoodTracker.WebUI;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Npgsql;
using NUnit.Framework;
using Respawn;

namespace FoodTracker.Application.IntegrationTests
{
    [SetUpFixture]
    public class Testing
    {
        private static IConfigurationRoot _configuration;
        private static IServiceScopeFactory _scopeFactory;
        private static Checkpoint _checkpoint;
        private static string _currentUserId;

        [OneTimeSetUp]
        public void RunBeforeAnyTests()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();

            var startup = new Startup(_configuration);

            var services = new ServiceCollection();

            services.AddSingleton(Mock.Of<IWebHostEnvironment>(w =>
                w.EnvironmentName == "Development" &&
                w.ApplicationName == "FoodTracker.WebUI"));

            services.AddLogging();

            startup.ConfigureServices(services);

            // Replace service registration for ICurrentUserService
            // Remove existing registration
            var currentUserServiceDescriptor = services.FirstOrDefault(d =>
                d.ServiceType == typeof(ICurrentUserService));

            services.Remove(currentUserServiceDescriptor);

            // Register testing version
            services.AddTransient(provider =>
                Mock.Of<ICurrentUserService>(s => s.UserId == _currentUserId));

            var fileUploaderServiceDescriptor = services.FirstOrDefault(d =>
                d.ServiceType == typeof(IFileUploader));

            services.Remove(fileUploaderServiceDescriptor);

            var fileUploaderMock = new Mock<IFileUploader>();
            fileUploaderMock.Setup(x => x.UploadAsync(It.IsAny<IFormFile>()))
                .Returns(Task.FromResult("Test.png"));

            services.AddTransient(provider => fileUploaderMock.Object);

            var dataServiceDesc = services.FirstOrDefault(d =>
                d.ServiceType == typeof(IDataService));

            services.Remove(dataServiceDesc);

            var dataServiceMock = new Mock<IDataService>();
            dataServiceMock.Setup(x => x.FetchProduct("22222222"))
                .Returns(Task.FromResult<DataServiceProduct>(null));
            dataServiceMock.Setup(x => x.FetchProduct("11111111"))
                .Returns(Task.FromResult<DataServiceProduct>(new DataServiceProduct
                {
                    BarCode = "11111111",
                    Name = "Test",
                    Serving = new DataServiceProductServing()
                }));

            services.AddTransient(provider => dataServiceMock.Object);

            _scopeFactory = services.BuildServiceProvider().GetService<IServiceScopeFactory>();

            _checkpoint = new Checkpoint
            {
                TablesToIgnore = new[] { "__EFMigrationsHistory" },
                SchemasToInclude = new[]
                {
                    "public"
                },
                DbAdapter = DbAdapter.Postgres
            };

            EnsureDatabase();
        }

        private static void EnsureDatabase()
        {
            using var scope = _scopeFactory.CreateScope();

            var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

            context.Database.Migrate();
        }

        public static async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
        {
            using var scope = _scopeFactory.CreateScope();

            var mediator = scope.ServiceProvider.GetService<ISender>();

            return await mediator.Send(request);
        }

        public static async Task<string> RunAsDefaultUserAsync()
        {
            return await RunAsUserAsync("test@local", "Testing1234!", new string[] { });
        }

        public static async Task<string> RunAsAdministratorAsync()
        {
            return await RunAsUserAsync("administrator@local", "Administrator1234!", new[] { "Administrator" });
        }

        public static async Task<string> RunAsUserAsync(string userName, string password, string[] roles)
        {
            using var scope = _scopeFactory.CreateScope();

            var userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();

            var userProfile = new UserProfile
            {
                UserGoals = new List<UserGoals> 
                {
                    new() {
                    CaloriesGoal = 2000,
                    CarbohydratesGoal = 200,
                    FatsGoal = 200,
                    ProteinGoal = 200,
                    StartingWeight = 85
                    }
                }
            };

            var user = new ApplicationUser { UserName = userName, Email = userName, UserProfile = userProfile };

            var result = await userManager.CreateAsync(user, password);

            if (roles.Any())
            {
                var roleManager = scope.ServiceProvider.GetService<RoleManager<IdentityRole>>();

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }

                await userManager.AddToRolesAsync(user, roles);
            }

            if (result.Succeeded)
            {
                _currentUserId = user.Id;

                return _currentUserId;
            }

            var errors = string.Join(Environment.NewLine, result.ToApplicationResult().Errors);

            throw new Exception($"Unable to create {userName}.{Environment.NewLine}{errors}");
        }

        public static async Task<UserProfile> GetCurrentUserProfileAsync()
        {
            using var scope = _scopeFactory.CreateScope();

            var identityService = scope.ServiceProvider.GetService<IIdentityService>();

            return await identityService.GetCurrentUserProfileAsync();
        }

        public static async Task ResetState()
        {
            await using (var conn = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await conn.OpenAsync();

                await _checkpoint.Reset(conn);
            }
            _currentUserId = null;
        }

        public static async Task<TEntity> FindAsync<TEntity>(params object[] keyValues)
            where TEntity : class
        {
            using var scope = _scopeFactory.CreateScope();

            var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

            return await context.FindAsync<TEntity>(keyValues);
        }

        public static ApplicationDbContext GetContext()
        {
            var scope = _scopeFactory.CreateScope();

            var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

            return context;
        }

        public static async Task AddAsync<TEntity>(TEntity entity)
            where TEntity : class
        {
            using var scope = _scopeFactory.CreateScope();

            var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

            context.Add(entity);

            await context.SaveChangesAsync();
        }

        public static async Task<int> CountAsync<TEntity>() where TEntity : class
        {
            using var scope = _scopeFactory.CreateScope();

            var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

            return await context.Set<TEntity>().CountAsync();
        }

        public static async Task<DiaryDto> GetDiaryByDate(DateTime date)
        {
            var query = new GetDiaryByDateQuery
            {
                Date = date
            };
            return await SendAsync(query);
        }

        public static async Task<ProductDto> CreateDefaultProduct()
        {
            var command = new CreateProductCommand
            {
                BarCode = "11111111",
                Name = "Test product",
                Servings = new List<ProductServingDto>
                {
                    new()
                    {
                        Carbohydrates = 20,
                        Calories = 2000,
                        Fats = 20,
                        Protein = 20,
                        ServingSize = 100,
                        ServingSizeUnit = "g"
                    }
                }
            };
            return await SendAsync(command);
        }

        public static async Task SeedDefaultUsers()
        {
            using var scope = _scopeFactory.CreateScope();

            var userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
            var roleManager = scope.ServiceProvider.GetService<RoleManager<IdentityRole>>();

            await ApplicationDbContextSeed.SeedDummyUsersAsync(userManager, roleManager);
            await ApplicationDbContextSeed.SeedDummyTrainersAsync(userManager, roleManager);
        }

        [OneTimeTearDown]
        public void RunAfterAnyTests()
        {
        }
    }
}
