import React, { useState } from 'react';
import axios from 'axios';
import './DietPlanForm.css';

const DietPlanForm = () => {
  const [formData, setFormData] = useState({
    period: '7',
    preferences: 'vegetarian',
    calories: '2000',
    height: '175',
    current_weight: '70',
    desired_weight: '65',
    activity_level: 'moderate',
    age: '30',
    gender: 'male',
  });

  const [dietPlan, setDietPlan] = useState(null); // Novo stanje za plan ishrane

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    if (!token) {
      alert('Niste autentifikovani!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/napraviPlan', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Plan ishrane je uspešno generisan:', response.data);
      setDietPlan(response.data.diet_plan.choices[0].message.content); // Postavljanje generisanog plana u stanje
      alert('Plan ishrane je uspešno generisan');
    } catch (error) {
      console.error('Greška pri generisanju plana ishrane:', error);
      alert('Došlo je do greške pri generisanju plana ishrane');
    }
  };

  return (
    <div className="box">
      <div className="title">Generiši Plan Ishrane</div>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="period">Period (dani)</label>
          <input
            type="number"
            id="period"
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="preferences">Preferencije</label>
          <input
            type="text"
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="calories">Kalorije</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="height">Visina (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="current_weight">Trenutna Težina (kg)</label>
          <input
            type="number"
            id="current_weight"
            name="current_weight"
            value={formData.current_weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="desired_weight">Željena Težina (kg)</label>
          <input
            type="number"
            id="desired_weight"
            name="desired_weight"
            value={formData.desired_weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="activity_level">Nivo Aktivnosti</label>
          <input
            type="text"
            id="activity_level"
            name="activity_level"
            value={formData.activity_level}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="age">Godine</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="gender">Pol</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button">
          <button type="submit">Generiši Plan</button>
        </div>
      </form>
      {dietPlan && (
        <div className="diet-plan">
          <h2>Generisani Plan Ishrane</h2>
          {dietPlan.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DietPlanForm;
