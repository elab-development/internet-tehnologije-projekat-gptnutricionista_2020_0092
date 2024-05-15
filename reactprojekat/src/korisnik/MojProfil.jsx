import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFoodIntakes from '../useFoodIntakes';
import './MojProfil.css'; 
import UpdateModal from './CRUD/UpdateModal';

const MojProfil = () => {
  const [foodIntakes, setFoodIntakes] = useFoodIntakes('http://127.0.0.1:8000/api/foodIntakes');
  const [sortedIntakes, setSortedIntakes] = useState([]);
  const [modalIntake, setModalIntake] = useState(null);

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

  const handleUpdate = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/foodIntakes', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setFoodIntakes(response.data.data);
    } catch (error) {
      console.error('Greška pri učitavanju unosa hrane:', error);
      alert('Došlo je do greške pri učitavanju unosa hrane');
    }
  };

  return (
    <div className="ingredient-table">
      {modalIntake && (
        <UpdateModal
          intake={modalIntake}
          onClose={() => setModalIntake(null)}
          onUpdate={handleUpdate}
        />
      )}
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
                <button onClick={() => setModalIntake(intake)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MojProfil;
