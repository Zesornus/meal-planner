import React from 'react';
import { Recipe } from '../types';
import { Clock, Users, Edit2, Trash2 } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: () => void;
  onDelete: () => void;
}

export function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {
  const categoryColors = {
    breakfast: 'bg-yellow-100 text-yellow-800',
    lunch: 'bg-blue-100 text-blue-800',
    dinner: 'bg-purple-100 text-purple-800',
    snack: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1">
      {recipe.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[recipe.category]}`}>
              {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
            </span>
          </div>
          {recipe.nutrition && (
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-sm font-medium">
              {recipe.nutrition.calories} cal
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.name}</h3>
            {!recipe.image && (
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[recipe.category]}`}>
                {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="text-emerald-600 font-medium text-sm">
            <span>Quick & Easy</span>
          </div>
          {recipe.nutrition && !recipe.image && (
            <div className="flex items-center space-x-1 font-medium text-emerald-600">
              <span>{recipe.nutrition.calories} cal</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700 text-sm">Key ingredients:</h4>
          <div className="text-sm text-gray-600">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <span key={ingredient.id}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
                {index < Math.min(recipe.ingredients.length, 3) - 1 ? ', ' : ''}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="text-gray-400"> +{recipe.ingredients.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}