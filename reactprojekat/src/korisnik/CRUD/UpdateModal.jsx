import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateModal.css';

const UpdateModal = ({ intake, onClose, onUpdate }) => {
  const [mealType, setMealType] = useState(intake.meal_type);
  const [calories, setCalories] = useState(intake.calories);
  const [description, setDescription] = useState(intake.description);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(intake.time);

  useEffect(() => {
    setDate(new Date(intake.date).toISOString().split('T')[0]);
  }, [intake.date]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem('token');

    if (!token) {
      alert('Niste autentifikovani!');
      return;
    }

    const updatedIntake = {
      meal_type: mealType,
      calories: parseInt(calories, 10),
      description: description,
      date: date,
      time: time,
    };

    try {
      await axios.put(`http://127.0.0.1:8000/api/foodIntakes/${intake.id}`, updatedIntake, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdate(); // Pozivanje funkcije za ponovno učitavanje podataka
      onClose();
    } catch (error) {
      console.error('Greška pri ažuriranju unosa hrane:', error);
      alert('Došlo je do greške pri ažuriranju unosa hrane');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Ažuriraj Unos Hrane</h2>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="mealType">Tip Obroka</label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
            >
              <option value="doručak">Doručak</option>
              <option value="ručak">Ručak</option>
              <option value="večera">Večera</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <div className="input">
            <label htmlFor="calories">Kalorije</label>
            <input
              type="number"
              id="calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="description">Opis</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="date">Datum</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="time">Vreme</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="button">
            <button type="submit">Ažuriraj Unos</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
