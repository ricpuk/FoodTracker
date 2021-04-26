using FluentValidation;

namespace FoodTracker.Application.Products.Commands.UpdateProduct
{
    class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
    {
        public UpdateProductCommandValidator()
        {
            RuleFor(p => p.Id).NotEmpty();
            RuleFor(p => p.Servings).NotEmpty();
        }

    }
}
