import * as DiariesStore from "../store/Diaries";

export const getTotalNutrientsConsumed = (diary?: DiariesStore.Diary) => {
  if (!diary) {
    return {
      remaining: 100,
      protein: 0,
      fats: 0,
      carbs: 0,
      calories: 0,
    };
  }
  const result = diary.entries.reduce(
    (total, value) => {
      const { product, servingId, numberOfServings } = value;
      const index = product.servings.findIndex((x) => x.id === servingId);
      if (index === -1) {
        return total;
      }
      const serving = product.servings[index];

      return {
        remaining: 0,
        protein: total.protein + serving.protein * numberOfServings,
        fats: total.fats + serving.fats * numberOfServings,
        carbs: total.carbs + serving.carbohydrates * numberOfServings,
        calories: total.calories + serving.calories * numberOfServings,
      };
    },
    {
      remaining: 0,
      protein: 0,
      fats: 0,
      carbs: 0,
      calories: 0,
    }
  );

  return result;
};

const round = (num: number, precision: number) =>
  Number(Math.round(Number(`${num}e+${precision}`)) + "e-" + precision);

export const servingValue = (value: number, numberOfServings: number) =>
  `${round(value * numberOfServings, 1)}g`;

export const servingValueNumeric = (value: number, numberOfServings: number) =>
  round(value * numberOfServings, 1);
