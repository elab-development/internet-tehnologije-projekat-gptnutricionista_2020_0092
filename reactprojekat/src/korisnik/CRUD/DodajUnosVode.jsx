import React, { useState } from 'react';
import axios from 'axios';
import './DodajUnosVode.css';

const DodajUnosVode = () => {
  const [amount, setAmount] = useState('500');
  const [date, setDate] = useState('2023-05-15');
  const [time, setTime] = useState('08:00');

  const resetForm = () => {
    setAmount('');
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

    const newWaterIntake = {
      amount: parseInt(amount, 10),
      date: date,
      time: time,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/waterIntakes', newWaterIntake, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Novi unos vode je uspešno kreiran:', response.data);
      alert('USPESNO DODATO');
      resetForm(); // Resetovanje forme nakon uspešnog dodavanja
    } catch (error) {
      alert('GRESKA');
      console.error('Greška pri kreiranju unosa vode:', error);
    }
  };

  return (
    <div className="box">
      <div className="title">Dodaj Novi Unos Vode</div>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="amount">Količina (ml)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="200"
            max="3000"
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

export default DodajUnosVode;
