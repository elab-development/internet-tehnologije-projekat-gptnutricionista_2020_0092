import { useState, useEffect } from 'react';
import axios from 'axios';

const useFoodIntakes = (path) => {
  const [foodIntakes, setFoodIntakes] = useState([]);

  useEffect(() => {
    const fetchFoodIntakes = async () => {
      try {
        // Dobijanje tokena iz session storage-a
        const token = sessionStorage.getItem('token');

        // Postavljanje zaglavlja sa tokenom
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        // Slanje GET zahteva
        const response = await axios.get(path, config);

        // Postavljanje podataka u stanje
        setFoodIntakes(response.data.data);
         

      } catch (error) {
        console.error('Error fetching food intakes:', error);
      }
    };

    fetchFoodIntakes();

    // Cleanup funkcija
    return () => {
      // Dodajte eventualne akcije koje treba izvršiti prilikom raskidanja komponente
    };
  }, [path]);

  return [foodIntakes, setFoodIntakes];
};

export default useFoodIntakes;
