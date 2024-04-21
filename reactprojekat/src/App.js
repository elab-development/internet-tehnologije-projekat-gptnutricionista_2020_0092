import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegisterComponent from './Autorizacija/LoginRegisterComponent';
import Navbar from './headerFooter/Navbar';
import IngredientTable from './SpoljniApi/IngredientTable';
import MojProfil from './korisnik/MojProfil';

function App() {
  const [token, setToken] =useState(null)
  return (
    <Router>
      <div className="App">
        <Navbar token={token} setToken={setToken}></Navbar>
        <Routes>
          <Route path="/sastojci" element={<IngredientTable />} />
          <Route path="/mojprofil" element={<MojProfil />} />

          <Route path="/auth" element={<LoginRegisterComponent setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
