//dokumentacija za api:
//https://fdc.nal.usda.gov/api-guide.html#bkmk-6 


import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import './Ingredients.css';
import IngredientRow from './IngredientRow';

const fetchIngredients = async (searchTerm) => {
  const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchTerm}&pageSize=50&api_key=HltNbgWlYukGRJua7Z8ed0Y2A2V6LuE13PpZ5d9k`);
  return response.data.foods.filter(ingredient => ingredient.foodNutrients);
};

const IngredientTable = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('energy');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { data: ingredients = [] } = useQuery(['ingredients', searchTerm], () => fetchIngredients(searchTerm));

  const sortedIngredients = [...ingredients].sort((a, b) => {
    switch (sortBy) {
      case 'energy':
        return getNutrientValue(a, 'Energy') - getNutrientValue(b, 'Energy');
      case 'protein':
        return getNutrientValue(a, 'Protein') - getNutrientValue(b, 'Protein');
      case 'carbs':
        return getNutrientValue(a, 'Carbohydrate, by difference') - getNutrientValue(b, 'Carbohydrate, by difference');
      case 'fat':
        return getNutrientValue(a, 'Total lipid (fat)') - getNutrientValue(b, 'Total lipid (fat)');
      default:
        return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedIngredients.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="ingredient-table">
      <h2 className="ingredient-title">Lista sastojaka</h2>
      <div className="controls">
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Pretraži sastojke..." />
        <label htmlFor="sort">Sortiraj po:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="energy">Kalorije</option>
          <option value="protein">Proteini</option>
          <option value="carbs">Ugljeni hidrati</option>
          <option value="fat">Masti</option>
        </select>
      </div>
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
          {currentItems.map(ingredient => (
            <IngredientRow key={ingredient.fdcId} ingredient={ingredient} />
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={sortedIngredients.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const getNutrientValue = (ingredient, nutrientName) => {
  const nutrient = ingredient.foodNutrients.find(nutrient => nutrient.nutrientName === nutrientName);
  return nutrient ? nutrient.value : 0;
};

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map(number => (
        <li key={number}>
          <button onClick={() => onPageChange(number)}>{number}</button>
        </li>
      ))}
    </ul>
  );
};

export default IngredientTable;
