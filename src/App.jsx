import React, { useState, useEffect } from 'react';
import { ChefHat } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import RecipeGrid from './components/RecipeGrid';
import RecipeDetails from './components/RecipeDetails';
import { useRecipes } from './hooks/useRecipes';
import { useFavorites } from './hooks/useFavorites';

const RecipeApp = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { recipes, loading, error, searchByName, searchByCategory, clearRecipes } = useRecipes();
  const { favorites } = useFavorites();

  useEffect(() => {
    searchByCategory('Chicken');
  }, [searchByCategory]);

  const handleSearch = (query) => {
    setActiveTab('search');
    searchByName(query);
    setActiveFilter(null);
  };

  const handleFilter = (type, value) => {
    if (type === 'clear') {
      clearRecipes();
      setActiveFilter(null);
      searchByCategory('Chicken');
    } else {
      setActiveTab('search');
      searchByCategory(value);
      setActiveFilter({ type, value });
    }
  };

  const handleClearSearch = () => {
    clearRecipes();
    setActiveFilter(null);
    searchByCategory('Chicken');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const displayedRecipes = activeTab === 'favorites' ? favorites : recipes;
  const emptyMessage = activeTab === 'favorites' 
    ? "You haven't added any favorites yet." 
    : "No recipes found. Try a different search!";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onMenuToggle={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {activeTab === 'search' && (
          <div className="mb-10 space-y-8">
            <SearchBar
              onSearch={handleSearch}
              onClear={handleClearSearch}
              placeholder="Search for delicious recipes..."
            />
            <FilterBar onFilter={handleFilter} activeFilter={activeFilter} />
          </div>
        )}

        <div className="mb-8">
          {activeTab === 'favorites' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-3">
                Your Favorite Recipes
              </h2>
              <p className="text-gray-300 text-lg">
                {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved for later
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
              <p className="text-red-400 flex items-center gap-3 text-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}

          <RecipeGrid
            recipes={displayedRecipes}
            loading={loading && activeTab === 'search'}
            onViewDetails={setSelectedMealId}
            emptyMessage={emptyMessage}
          />
        </div>
      </main>

      {selectedMealId && (
        <RecipeDetails
          mealId={selectedMealId}
          onClose={() => setSelectedMealId(null)}
        />
      )}

      <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              RecipeHub
            </span>
          </div>
          <p className="text-gray-400">
            Powered by TheMealDB API 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RecipeApp;