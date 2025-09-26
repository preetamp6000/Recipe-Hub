import React, { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { extractIngredients, formatInstructions } from '../utils/recipeUtils';
import LoadingSkeleton from './LoadingSkeleton';

export const RecipeDetails = ({ mealId, onClose }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await res.json();
        
        if (data.meals) {
          setRecipe(data.meals[0]);
        } else {
          setError('Recipe not found!');
        }
      } catch (err) {
        setError('Failed to fetch recipe details.');
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [mealId]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading) return <LoadingSkeleton type="detail" />;
  
  if (error) return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 text-center">
        <p className="text-red-400 mb-4 text-lg">{error}</p>
        <button 
          onClick={onClose} 
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
  
  if (!recipe) return null;

  const ingredients = extractIngredients(recipe);
  const instructions = formatInstructions(recipe.strInstructions);

  return (
    <div 
      className="fixed inset-0 bg-gray-900/95 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Section */}
        <div className="relative h-80 overflow-hidden rounded-t-3xl">
          <div 
            className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
            style={{ backgroundImage: `url(${recipe.strMealThumb})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/50 to-gray-800" />
          
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-800" />

          {/* Action Buttons */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
            <button
              onClick={() => toggleFavorite(recipe)}
              className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full transition-all hover:bg-gray-900 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  isFavorite(recipe.idMeal)
                    ? 'text-red-500 fill-red-500'
                    : 'text-white hover:text-red-500'
                }`}
              />
            </button>
            
            <button
              onClick={onClose}
              className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full transition-all hover:bg-gray-900 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Recipe Title */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{recipe.strMeal}</h1>
            <div className="flex flex-wrap gap-3">
              <span className="bg-orange-500/90 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                {recipe.strCategory}
              </span>
              <span className="bg-blue-500/90 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                {recipe.strArea}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Ingredients Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🥘</span>
              </div>
              Ingredients
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ingredients.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-gray-700 transition-all duration-200 hover:scale-105 border border-gray-600"
                >
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${item.name}-Small.png`}
                    alt={item.name}
                    className="w-12 h-12 object-cover mx-auto mb-3 rounded-lg"
                    loading="lazy"
                  />
                  <p className="font-medium text-sm text-white mb-1">{item.name}</p>
                  {item.measure && (
                    <p className="text-xs text-gray-300">{item.measure}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Instructions Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">📝</span>
              </div>
              Instructions
            </h2>
            <div className="space-y-6">
              {instructions.map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:bg-gray-700/50 transition-all duration-200"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <p className="text-gray-200 leading-relaxed flex-1 text-lg">{step.instruction}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Links */}
          {(recipe.strYoutube || recipe.strSource) && (
            <section className="border-t border-gray-700 pt-8">
              <h2 className="text-xl font-bold text-white mb-4">More Resources</h2>
              <div className="flex flex-wrap gap-4">
                {recipe.strYoutube && (
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    Watch Tutorial
                  </a>
                )}
                {recipe.strSource && (
                  <a
                    href={recipe.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    View Source
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;