using FluentValidation;

namespace FoodTracker.Application.Products.Queries.GetProductsWithPagination
{
    class GetProductsWithPaginationQueryValidator : AbstractValidator<GetProductsWithPaginationQuery>
    {
        public GetProductsWithPaginationQueryValidator()
        {
            RuleFor(q => q.Page).GreaterThanOrEqualTo(0);
            RuleFor(q => q.PageSize).GreaterThan(0).LessThanOrEqualTo(100);
        }
    }
}
