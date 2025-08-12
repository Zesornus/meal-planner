import React from 'react';
import { MealPlan, Recipe } from '../types';
import { Plus, Sparkles, Clock, Users } from 'lucide-react';

interface DailyCalendarProps {
  selectedDate: string;
  mealPlans: MealPlan[];
  onMealSelect: (date: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
  onGetRecommendations: (date: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
}

export function DailyCalendar({ 
  selectedDate, 
  mealPlans, 
  onMealSelect, 
  onGetRecommendations 
}: DailyCalendarProps) {
  const todaysPlan = mealPlans.find(plan => plan.date === selectedDate);
  
  const mealSlots = [
    { 
      type: 'breakfast' as const, 
      label: 'Breakfast', 
      time: '8:00 AM',
      recipe: todaysPlan?.meals.breakfast,
      emoji: '🌅'
    },
    { 
      type: 'lunch' as const, 
      label: 'Lunch', 
      time: '12:30 PM',
      recipe: todaysPlan?.meals.lunch,
      emoji: '☀️'
    },
    { 
      type: 'dinner' as const, 
      label: 'Dinner', 
      time: '7:00 PM',
      recipe: todaysPlan?.meals.dinner,
      emoji: '🌙'
    },
    { 
      type: 'snack' as const, 
      label: 'Snack', 
      time: '3:00 PM',
      recipe: todaysPlan?.meals.snack,
      emoji: '🍎'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mealSlots.map((slot) => (
          <div
            key={slot.type}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6 hover:scale-105 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{slot.emoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{slot.label}</h3>
                  <p className="text-sm text-gray-500">{slot.time}</p>
                </div>
              </div>
            </div>

            {slot.recipe ? (
              <div className="space-y-4">
                {slot.recipe.image && (
                  <div className="w-full h-32 rounded-xl overflow-hidden">
                    <img 
                      src={slot.recipe.image} 
                      alt={slot.recipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{slot.recipe.name}</h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{slot.recipe.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{slot.recipe.prepTime + slot.recipe.cookTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{slot.recipe.servings} servings</span>
                      </div>
                    </div>
                    {slot.recipe.nutrition && (
                      <div className="font-medium text-blue-600">
                        {slot.recipe.nutrition.calories} cal
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => onMealSelect(selectedDate, slot.type)}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Change Recipe
                  </button>
                  <button
                    onClick={() => onGetRecommendations(selectedDate, slot.type)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm font-medium"
                  >
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <p className="text-gray-500 mb-4">No meal planned</p>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => onGetRecommendations(selectedDate, slot.type)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Get AI Suggestions</span>
                  </button>
                  
                  <button
                    onClick={() => onMealSelect(selectedDate, slot.type)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Choose Recipe</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}