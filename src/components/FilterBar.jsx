import React from 'react';
import { Filter } from 'lucide-react';

export const FilterBar = ({ onFilter, activeFilter }) => {
  const categories = [
    'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 
    'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian'
  ];

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onFilter('clear')}
        className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
          !activeFilter
            ? 'bg-gray-700 text-white'
            : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`}
      >
        <Filter className="w-4 h-4" />
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilter('category', category)}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
            activeFilter?.value === category
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;