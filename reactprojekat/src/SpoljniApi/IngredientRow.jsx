import React from 'react';

const IngredientRow = ({ ingredient }) => {
  return (
    <tr>
      <td>{ingredient.description}</td>
      <td>{ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy') ? `${ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy').value} kcal` : 'N/A'}</td>
      <td>{ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein') ? `${ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein').value} g` : 'N/A'}</td>
      <td>{ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference') ? `${ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference').value} g` : 'N/A'}</td>
      <td>{ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)') ? `${ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)').value} g` : 'N/A'}</td>
    </tr>
  );
};

export default IngredientRow;
