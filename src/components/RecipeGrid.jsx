import React from 'react';
import RecipeCard from './RecipeCard';
import LoadingSkeleton from './LoadingSkeleton';

export const RecipeGrid = ({ recipes, loading, onViewDetails, emptyMessage }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <LoadingSkeleton count={8} />
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-6">🍳</div>
        <h3 className="text-2xl font-semibold text-gray-300 mb-4">{emptyMessage}</h3>
        <p className="text-gray-400 text-lg">Try searching for different ingredients or categories.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;