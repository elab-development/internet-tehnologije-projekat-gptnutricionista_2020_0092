import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFoodIntakes from '../useFoodIntakes';
import './MojProfil.css'; 

const MojProfil = () => {
  const [foodIntakes, setFoodIntakes] = useFoodIntakes('http://127.0.0.1:8000/api/foodIntakes');
  const [sortedIntakes, setSortedIntakes] = useState([]);

  // Efekat koji sortira podatke o unosima hrane hronološki kada se promene
  useEffect(() => {
    const sorted = [...foodIntakes].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortedIntakes(sorted);
  }, [foodIntakes]);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('token');

    try {
      await axios.delete(`http://127.0.0.1:8000/api/foodIntakes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Uklanjanje unosa iz lokalne memorije
      setFoodIntakes(foodIntakes.filter(intake => intake.id !== id));
      alert('Unos hrane je uspešno obrisan');
    } catch (error) {
      console.error('Greška pri brisanju unosa hrane:', error);
      alert('Došlo je do greške pri brisanju unosa hrane');
    }
  };

  return (
    <div className="ingredient-table">
      <div className="ingredient-title">Moji unosi hrane</div>
      <table>
        <thead>
          <tr>
            <th>Tip obroka</th>
            <th>Kalorije</th>
            <th>Opis</th>
            <th>Datum</th>
            <th>Vreme</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {sortedIntakes.map((intake) => (
            <tr key={intake.id}>
              <td>{intake.meal_type}</td>
              <td>{intake.calories}</td>
              <td>{intake.description}</td>
              <td>{new Date(intake.date).toLocaleDateString()}</td> 
              <td>{intake.time}</td>
              <td>
                <button onClick={() => handleDelete(intake.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MojProfil;
