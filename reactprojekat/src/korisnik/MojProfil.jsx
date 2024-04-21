import React, { useState, useEffect } from 'react';
import useFoodIntakes from '../useFoodIntakes';
 

const MojProfil = () => {
  const [foodIntakes, setFoodIntakes] = useFoodIntakes('http://127.0.0.1:8000/api/foodIntakes');
  const [sortedIntakes, setSortedIntakes] = useState([]);

  // Efekat koji sortira podatke o unosima hrane hrnonološki kada se promene
  useEffect(() => {
    const sorted = [...foodIntakes].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortedIntakes(sorted);
  }, [foodIntakes]);

  return (
    <div>
      <h1>Moji unosi hrane</h1>
      <table>
        <thead>
          <tr>
            <th>Tip obroka</th>
            <th>Kalorije</th>
            <th>Opis</th>
            <th>Datum</th>
            <th>Vreme</th>
          </tr>
        </thead>
        <tbody>
          {sortedIntakes.map((intake) => (
            <tr key={intake.id}>
              <td>{intake.meal_type}</td>
              <td>{intake.calories}</td>
              <td>{intake.description}</td>
              <td>{new Date(intake.date).toLocaleDateString()}</td>
              <td>{new Date(intake.time).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MojProfil;
