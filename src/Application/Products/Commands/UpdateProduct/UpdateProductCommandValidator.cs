using FluentValidation;

namespace FoodTracker.Application.Products.Commands.UpdateProduct
{
    class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
    {
        public UpdateProductCommandValidator()
        {
            RuleFor(p => p.Id).NotEmpty();
            RuleFor(p => p.Carbohydrates).NotEmpty();
            RuleFor(p => p.Calories).NotEmpty();
            RuleFor(p => p.Protein).NotEmpty();
            RuleFor(p => p.Fats).NotEmpty();
        }

    }
}
