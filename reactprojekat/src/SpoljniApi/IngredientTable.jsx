import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ingredients.css';
const IngredientTable = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search?query=&pageSize=50&api_key=HltNbgWlYukGRJua7Z8ed0Y2A2V6LuE13PpZ5d9k');
        const filteredIngredients = response.data.foods.filter(ingredient => ingredient.foodNutrients);
        setIngredients(filteredIngredients);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }; 
    fetchIngredients();
  }, []);

  return (
    <div className="ingredient-table">
      <h2 className="ingredient-title">Lista sastojaka</h2>
      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Kalorije</th>
            <th>Proteini</th>
            <th>Ugljeni hidrati</th>
            <th>Masti</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(ingredient => (
            <tr key={ingredient.fdcId}>
              <td>{ingredient.description}</td>
              <td>{ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy') ? `${ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy').value} kcal` : 'N/A'}</td>
              <td>{ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein') ? `${ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein').value} g` : 'N/A'}</td>
              <td>{ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference') ? `${ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference').value} g` : 'N/A'}</td>
              <td>{ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)') ? `${ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)').value} g` : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default IngredientTable;
