import { useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('recipeAppFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const isFavorite = (id) => favorites.some(fav => fav.idMeal === id);

  const toggleFavorite = (recipe) => {
    const newFavorites = isFavorite(recipe.idMeal)
      ? favorites.filter(fav => fav.idMeal !== recipe.idMeal)
      : [...favorites, recipe];
    
    setFavorites(newFavorites);
    localStorage.setItem('recipeAppFavorites', JSON.stringify(newFavorites));
  };

  return { favorites, isFavorite, toggleFavorite };
};