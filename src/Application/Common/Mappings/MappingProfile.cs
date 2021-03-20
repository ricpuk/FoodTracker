using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using AutoMapper;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Models;
using FoodTracker.Application.Products;
using FoodTracker.Domain.Entities;

namespace FoodTracker.Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
            CreateMap<Product, ProductDto>()
                .ForMember(p => p.Servings, 
                    opt => opt.MapFrom(e => e.ProductServings));
            CreateMap<ProductServing, ProductServingDto>();
            CreateMap<ProductServingDto, ProductServing>();
            CreateMap<DataServiceProduct, ProductDto>()
                .ForMember(p => p.Servings, opt => opt.Ignore());

            CreateMap<DiaryEntry, DiaryEntryDto>();

            CreateMap<DiaryEntryDto, DiaryEntry>()
                .ForMember(x => x.Product, opt => opt.Ignore())
                .ForMember(x => x.ProductId,
                    opt => opt.MapFrom(x => x.Product.Id));

            CreateMap<UserGoalsDto, UserGoals>();
        }

        private void ApplyMappingsFromAssembly(Assembly assembly)
        {
            var types = assembly.GetExportedTypes()
                .Where(t => t.GetInterfaces().Any(i => 
                    i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapFrom<>)))
                .ToList();

            foreach (var type in types)
            {
                var instance = Activator.CreateInstance(type);

                var methodInfo = type.GetMethod("Mapping") 
                    ?? type.GetInterface("IMapFrom`1").GetMethod("Mapping");
                
                methodInfo?.Invoke(instance, new object[] { this });

            }
        }
    }
}