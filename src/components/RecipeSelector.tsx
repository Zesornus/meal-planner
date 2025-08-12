import React, { useState } from 'react';
import { Recipe } from '../types';
import { X, Search, Clock, Users } from 'lucide-react';

interface RecipeSelectorProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  onClose: () => void;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export function RecipeSelector({ recipes, onRecipeSelect, onClose, mealType }: RecipeSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMealType = recipe.category === mealType;
    return matchesSearch && matchesMealType;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            Select a {mealType.charAt(0).toUpperCase() + mealType.slice(1)} Recipe
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No recipes found for {mealType}</p>
              <p className="text-gray-400 text-sm mt-2">Try adding some recipes to your library first</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => onRecipeSelect(recipe)}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
                >
                  {recipe.image && (
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={recipe.image} 
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                      {recipe.nutrition && (
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                          {recipe.nutrition.calories} cal
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{recipe.name}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.prepTime + recipe.cookTime}min</span>
                        </div>
                        <div className="text-emerald-600 font-medium text-xs">
                          <span>Easy Cook</span>
                        </div>
                      </div>
                      {recipe.nutrition && !recipe.image && (
                        <div className="font-medium text-emerald-600">
                          {recipe.nutrition.calories} cal
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}