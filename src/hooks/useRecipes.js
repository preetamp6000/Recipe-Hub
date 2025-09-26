import { useState, useCallback } from 'react';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchByName = useCallback(async (query) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError('Failed to fetch recipes');
    }
    setLoading(false);
  }, []);

  const searchByCategory = useCallback(async (category) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError('Failed to fetch recipes');
    }
    setLoading(false);
  }, []);

  const clearRecipes = () => {
    setRecipes([]);
    setError('');
  };

  return { recipes, loading, error, searchByName, searchByCategory, clearRecipes };
};