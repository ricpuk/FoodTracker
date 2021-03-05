using FluentValidation;

namespace FoodTracker.Application.Products.Commands.CreateProduct
{
    class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommandValidator()
        {
            RuleFor(p => p.BarCode).NotEmpty();
            RuleFor(p => p.Name).NotEmpty();
            RuleFor(p => p.Servings).NotEmpty();
        }

    }
}
