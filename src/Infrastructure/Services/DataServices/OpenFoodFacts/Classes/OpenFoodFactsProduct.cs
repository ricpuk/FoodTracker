using System.Collections.Generic;
using FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Utils;
using Newtonsoft.Json;

namespace FoodTracker.Infrastructure.Services.DataServices.OpenFoodFacts.Classes
{
    public class OpenFoodFactsProduct
    {
        [JsonProperty("image_small_url")]
        public string ImageSmallUrl { get; set; }

        [JsonProperty("image_front_url")]
        public string ImageFrontUrl { get; set; }

        [JsonProperty("link")]
        public string Link { get; set; }

        [JsonProperty("traces_tags")]
        public IEnumerable<string> TracesTags { get; set; }

        [JsonProperty("allergens_hierarchy")]
        public IEnumerable<string> AllergensHierarchy { get; set; }

        [JsonProperty("brands_tags")]
        public IEnumerable<string> BrandsTags { get; set; }

        [JsonProperty("categories_tags")]
        public IEnumerable<string> CategoriesTags { get; set; }

        [JsonProperty("product_name")]
        [JsonConverter(typeof(OpenFoodFactsProductStringConverter))]
        public string ProductName { get; set; }

        [JsonProperty("generic_name")]
        [JsonConverter(typeof(OpenFoodFactsProductStringConverter))]
        public string GenericName { get; set; }

        [JsonProperty("serving_size")]
        public string ServingSize { get; set; }

        [JsonProperty("nutrition_grade_fr")]
        public string NutritionGradeFr { get; set; }

        [JsonProperty("countries_tags")]
        public IEnumerable<string> CountriesTags { get; set; }

        [JsonProperty("labels_hierarchy")]
        public IEnumerable<string> LabelsHierarchy { get; set; }

        [JsonProperty("labels_tags")]
        public IEnumerable<string> LabelsTags { get; set; }

        [JsonProperty("ingredients_from_palm_oil_n")]
        public long IngredientsFromPalmOilN { get; set; }

        [JsonProperty("image_url")]
        public string ImageUrl { get; set; }

        [JsonProperty("emb_codes_tags")]
        public IEnumerable<string> EmbCodesTags { get; set; }

        [JsonProperty("states_tags")]
        public IEnumerable<string> StatesTags { get; set; }

        [JsonProperty("vitamins_tags")]
        public IEnumerable<string> VitaminsTags { get; set; }

        [JsonProperty("minerals_tags")]
        public IEnumerable<string> MineralsTags { get; set; }

        [JsonProperty("amino_acids_tags")]
        public IEnumerable<string> AminoAcidsTags { get; set; }

        [JsonProperty("other_nutritional_substances_tags")]
        public IEnumerable<string> OtherNutritionalSubstancesTags { get; set; }

        [JsonProperty("editors_tags")]
        public IEnumerable<string> EditorsTags { get; set; }

        [JsonProperty("lang")]
        public string Lang { get; set; }

        [JsonProperty("purchase_places")]
        public string PurchasePlaces { get; set; }

        [JsonProperty("nutrition_data_per")]
        public string NutritionDataPer { get; set; }

        [JsonProperty("no_nutrition_data")]
        public string NoNutritionData { get; set; }

        [JsonProperty("other_information")]
        public string OtherInformation { get; set; }

        [JsonProperty("conservation_conditions")]
        public string ConservationConditions { get; set; }

        [JsonProperty("warning")]
        public string Warning { get; set; }

        [JsonProperty("customer_service")]
        public string CustomerService { get; set; }
    }
}
