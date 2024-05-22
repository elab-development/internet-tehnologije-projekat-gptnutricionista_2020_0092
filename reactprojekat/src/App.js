import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegisterComponent from './Autorizacija/LoginRegisterComponent';
import Navbar from './headerFooter/Navbar';
import IngredientTable from './SpoljniApi/IngredientTable';
import MojProfil from './korisnik/MojProfil';
import HomePage from './Home/HomePage';
import DodajUnosHrane from './korisnik/CRUD/DodajUnosHrane';
import DodajUnosVode from './korisnik/CRUD/DodajUnosVode';
import DietPlanForm from './korisnik/DietPlanForm';
import Admin from './Admin/Admin';

function App() {
  const [token, setToken] =useState(null);
  return (
    <Router>
      <div className="App">
        <Navbar token={token} setToken={setToken}></Navbar>
        <Routes>
        <Route path="/" element={<HomePage />} />

          <Route path="/sastojci" element={<IngredientTable />} />
          <Route path="/mojprofil" element={<MojProfil />} /> 
          <Route path="/auth" element={<LoginRegisterComponent setToken={setToken} />} />

          <Route path="/gpt" element={<DietPlanForm />} />

          <Route path="/dodajHranu" element={<DodajUnosHrane />} />  
          <Route path="/dodajVodu" element={<DodajUnosVode />} />  
          <Route path="/admin" element={<Admin />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
