import React from 'react';
import axios from 'axios';
import { Link,  useNavigate } from 'react-router-dom';
import './Navbar.css'
const Navbar = ({ token, setToken }) => {
  const history = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setToken(null);
      sessionStorage.clear();
      history('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">GPT NUTRI APP</Link>
      </div>
      <ul className="nav-links">
        {token ? (
            <>
              <li><Link to="/sastojci">Sastojci</Link></li>
              <li><Link to="/mojprofil">Moj profil</Link></li>
              <li><Link to="/dodajHranu">Dodaj hranu</Link></li>
              <li><Link to="/dodajVodu">Dodaj vodu</Link></li>
              <li><Link to="/gpt">Generisi plan ishrane</Link></li>

              <li onClick={handleLogout}>Logout</li>
            </>
        
        ) : (
          <li><Link to="/auth">Login/Register</Link></li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
