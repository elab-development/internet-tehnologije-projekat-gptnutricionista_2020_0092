import React, { useState } from 'react';
import axios from 'axios';
import './DodajUnosHrane.css';

const DodajUnosHrane = () => {
  const [mealType, setMealType] = useState('');
  const [calories, setCalories] = useState('200');
  const [description, setDescription] = useState('opis hrane 1');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const resetForm = () => {
    setMealType('');
    setCalories('');
    setDescription('');
    setDate('');
    setTime('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem('token');

    if (!token) {
      alert('Niste autentifikovani!');
      return;
    }

    const newIntake = {
      meal_type: mealType,
      calories: parseInt(calories, 10),
      description: description,
      date: date,
      time: time,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/foodIntakes', newIntake, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Novi unos hrane je uspešno kreiran:', response.data);
      alert("USPESNO DODATO");
      resetForm(); // Resetovanje forme nakon uspešnog dodavanja
    } catch (error) {
      alert("GRESKA");
      console.error('Greška pri kreiranju unosa hrane:', error);
    }
  };

  return (
    <div className="box">
      <div className="title">Dodaj Novi Unos Hrane</div>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="mealType">Tip Obroka</label>
          <select
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            required
          >
            <option value="">Izaberite tip obroka</option>
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
          <button type="submit">Dodaj Unos</button>
        </div>
      </form>
    </div>
  );
};

export default DodajUnosHrane;
