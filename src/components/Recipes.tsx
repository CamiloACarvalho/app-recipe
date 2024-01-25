import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Recipes() {
  const [apiData, setApiData] = useState([]);
  const location = useLocation();

  const fetchData = async (url: string, recipe: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const data = await response.json();
      const newData = data[recipe].slice(0, 12);
      setApiData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (location.pathname === '/meals') {
      fetchData('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
    } else fetchData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
  }, [location.pathname]);

  console.log(apiData);

  return (
    <div>
      {
        location.pathname === '/meals' ? 
        apiData.map(() => (
          
        ))
      }
    </div>
  );
}
