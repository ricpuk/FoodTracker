using FluentValidation;

namespace FoodTracker.Application.Products.Queries.GetProductsByBarCode
{
    public class GetProductsByBarCodeQueryValidator : AbstractValidator<GetProductsByBarCodeQuery>
    {
        public GetProductsByBarCodeQueryValidator()
        {
            RuleFor(q => q.Page).GreaterThanOrEqualTo(0);
            RuleFor(q => q.BarCode).NotEmpty();
        }
    }
}
