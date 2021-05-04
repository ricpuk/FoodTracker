using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FoodTracker.Application.Common.DTOs;
using FoodTracker.Application.Common.Interfaces;
using FoodTracker.Application.Common.Mappings;
using FoodTracker.Application.Common.Models;
using FoodTracker.Application.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.ProductReports.Queries
{
    public class GetProductReportsListQuery : IRequest<PaginatedList<ProductReportDto>>
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; }
    }

    public class GetProductReportsListQueryHandler : IRequestHandler<GetProductReportsListQuery, PaginatedList<ProductReportDto>>
    {
        private readonly IApplicationDbContext _dbContext;

        public GetProductReportsListQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PaginatedList<ProductReportDto>> Handle(GetProductReportsListQuery request, CancellationToken cancellationToken)
        {
            var reports = await _dbContext.ProductReports
                .Where(x => !x.Resolved)
                .Include(x => x.Product)
                .ThenInclude(p => p.ProductVersions)
                .Select(x => new ProductReportDto
                {
                    Id = x.Id,
                    Product = new ProductDto(x.Product),
                    Reason = x.Reason,
                    Resolved = x.Resolved
                })
                .PaginatedListAsync(request.Page, request.PageSize);
            return reports;
        }
    }
}
