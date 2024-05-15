import { useState, useEffect } from 'react';
import axios from 'axios';

const useWaterIntakes = (path) => {
  const [waterIntakes, setWaterIntakes] = useState([]);

  useEffect(() => {
    const fetchWaterIntakes = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await axios.get(path, config);
        setWaterIntakes(response.data.data);
      } catch (error) {
        console.error('Error fetching water intakes:', error);
      }
    };

    fetchWaterIntakes();

    return () => {
      
    };
  }, [path]);

  return [waterIntakes, setWaterIntakes];
};

export default useWaterIntakes;
