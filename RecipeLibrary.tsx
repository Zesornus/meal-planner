import React, { useState } from 'react';
import { Recipe } from '../types';
import { RecipeForm } from './RecipeForm';
import { RecipeCard } from './RecipeCard';
import { Plus, Search, Filter, Scan, Star } from 'lucide-react';

interface RecipeLibraryProps {
  recipes: Recipe[];
  onRecipesChange: (recipes: Recipe[]) => void;
}

export function RecipeLibrary({ recipes, onRecipesChange }: RecipeLibraryProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showTrending, setShowTrending] = useState(true);

  const handleAddRecipe = (recipe: Recipe) => {
    onRecipesChange([...recipes, recipe]);
    setShowForm(false);
  };

  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    onRecipesChange(recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
    setEditingRecipe(null);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    onRecipesChange(recipes.filter(r => r.id !== recipeId));
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || recipe.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Recipes' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snacks' },
  ];

  // Safe trending recipes - only show if we have enough recipes
  const trendingRecipes = recipes && recipes.length >= 3 ? recipes.slice(0, 3) : [];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Recipes</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Recipe</span>
        </button>
      </div>

      {/* Trending Section - Only show if we have enough recipes */}
      {showTrending && trendingRecipes.length >= 3 && (
        <div className="bg-gradient-to-r from-orange-50/80 to-red-50/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔥</span>
              <h3 className="text-xl font-semibold text-gray-900">Trending Right Now</h3>
            </div>
            <button
              onClick={() => setShowTrending(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trendingRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100/50 hover:shadow-lg hover:scale-105 transition-all cursor-pointer relative"
                onClick={() => setEditingRecipe(recipe)}
              >
                {index === 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    #1
                  </div>
                )}
                {recipe.image && (
                  <div className="w-full h-24 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={recipe.image} 
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">{recipe.name}</h4>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{recipe.prepTime + recipe.cookTime} min</span>
                  {recipe.nutrition && (
                    <span className="font-medium text-orange-600">{recipe.nutrition.calories} cal</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              🌟 Popular recipes based on recent activity and user favorites
            </p>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-gray-50"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">No recipes found</p>
          <p className="text-gray-400 text-sm mt-1">
            {recipes.length === 0 ? 'Add your first recipe to get started' : 'Try adjusting your search or filter'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={() => setEditingRecipe(recipe)}
              onDelete={() => handleDeleteRecipe(recipe.id)}
            />
          ))}
        </div>
      )}

      {/* Forms */}
      {showForm && (
        <RecipeForm
          onSubmit={handleAddRecipe}
          onClose={() => setShowForm(false)}
        />
      )}

      {editingRecipe && (
        <RecipeForm
          recipe={editingRecipe}
          onSubmit={handleUpdateRecipe}
          onClose={() => setEditingRecipe(null)}
        />
      )}
    </div>
  );
}