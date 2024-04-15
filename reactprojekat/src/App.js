import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegisterComponent from './Autorizacija/LoginRegisterComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/auth" element={<LoginRegisterComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
