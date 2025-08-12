import React from 'react';
import { Calendar, Star, TrendingUp } from 'lucide-react';

interface QuickActionsProps {
  onNavigateToPlanner: () => void;
  onNavigateToRecipes: () => void;
  onNavigateToGrocery: () => void;
}

export function QuickActions({ onNavigateToPlanner, onNavigateToRecipes, onNavigateToGrocery }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button
        onClick={onNavigateToPlanner}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6 hover:scale-105 transition-all text-left group"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl group-hover:scale-110 transition-transform">
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Plan Your Week</h3>
            <p className="text-sm text-gray-600">Schedule meals and stay organized</p>
          </div>
        </div>
      </button>

      <button
        onClick={onNavigateToRecipes}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6 hover:scale-105 transition-all text-left group"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl group-hover:scale-110 transition-transform">
            <Star className="h-8 w-8 text-indigo-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Browse Recipes</h3>
            <p className="text-sm text-gray-600">Discover new meal ideas</p>
          </div>
        </div>
      </button>

      <button
        onClick={onNavigateToGrocery}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6 hover:scale-105 transition-all text-left group"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl group-hover:scale-110 transition-transform">
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Shopping List</h3>
            <p className="text-sm text-gray-600">Generate grocery lists</p>
          </div>
        </div>
      </button>
    </div>
  );
}