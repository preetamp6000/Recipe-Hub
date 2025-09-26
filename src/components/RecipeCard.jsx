import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

export const RecipeCard = ({ recipe, onViewDetails }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  return (
    <div
      className="group bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer border border-gray-700 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.02] transform"
      onClick={() => onViewDetails(recipe.idMeal)}
    >
      <div className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="w-full h-48 bg-gray-700 animate-pulse"></div>
        )}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className={`w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2.5 bg-gray-900/80 backdrop-blur-sm rounded-full transition-all hover:bg-gray-900 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          aria-label={isFavorite(recipe.idMeal) ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              isFavorite(recipe.idMeal)
                ? 'text-red-500 fill-red-500'
                : 'text-white hover:text-red-500'
            }`}
          />
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg mb-3 text-white group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight">
          {recipe.strMeal}
        </h3>
        
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(recipe.idMeal);
            }}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            View Recipe
          </button>
          
          <span className="text-xs text-gray-400 bg-gray-700 px-3 py-1.5 rounded-lg">
            {recipe.strCategory || 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;