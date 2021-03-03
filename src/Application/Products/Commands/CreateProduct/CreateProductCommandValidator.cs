using FluentValidation;

namespace FoodTracker.Application.Products.Commands.CreateProduct
{
    class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommandValidator()
        {
            RuleFor(p => p.Carbohydrates).NotEmpty();
            RuleFor(p => p.Calories).NotEmpty();
            RuleFor(p => p.Protein).NotEmpty();
            RuleFor(p => p.Fats).NotEmpty();
        }

    }
}
