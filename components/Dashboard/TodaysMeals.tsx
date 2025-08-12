import React from 'react';
import { MealPlan, Recipe } from '../../types';
import { Calendar, ChevronRight, Plus, Clock, Users } from 'lucide-react';

interface TodaysMealsProps {
  todaysPlan: MealPlan | undefined;
  onNavigateToPlanner: () => void;
}

export function TodaysMeals({ todaysPlan, onNavigateToPlanner }: TodaysMealsProps) {
  const upcomingMeals = [
    { time: '8:00 AM', meal: 'Breakfast', recipe: todaysPlan?.meals.breakfast },
    { time: '12:30 PM', meal: 'Lunch', recipe: todaysPlan?.meals.lunch },
    { time: '7:00 PM', meal: 'Dinner', recipe: todaysPlan?.meals.dinner },
    { time: '3:00 PM', meal: 'Snack', recipe: todaysPlan?.meals.snack }
  ];

  const mealsPlanned = upcomingMeals.filter(meal => meal.recipe).length;
  const totalMeals = 4;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span>Today's Meal Plan</span>
        </h2>
        <button
          onClick={onNavigateToPlanner}
          className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <span>View Calendar</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {upcomingMeals.map((mealSlot, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-900">{mealSlot.meal}</div>
              <div className="text-xs text-gray-500">{mealSlot.time}</div>
            </div>
            
            {mealSlot.recipe ? (
              <div className="space-y-2">
                {mealSlot.recipe.image && (
                  <div className="w-full h-20 rounded-lg overflow-hidden">
                    <img 
                      src={mealSlot.recipe.image} 
                      alt={mealSlot.recipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h4 className="font-medium text-gray-900 text-sm">{mealSlot.recipe.name}</h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⏱️ {mealSlot.recipe.prepTime + mealSlot.recipe.cookTime} min</span>
                  {mealSlot.recipe.nutrition && (
                    <span className="font-medium text-green-600">{mealSlot.recipe.nutrition.calories} cal</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-gray-400 mb-2">🍽️</div>
                <p className="text-xs text-gray-500 mb-2">No meal planned</p>
                <button
                  onClick={onNavigateToPlanner}
                  className="flex items-center space-x-1 text-xs text-blue-500 hover:text-blue-600 mx-auto"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add meal</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Meal Planning Progress</h3>
            <p className="text-sm text-gray-600">
              {mealsPlanned} of {totalMeals} meals planned for today
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((mealsPlanned / totalMeals) * 100)}%
            </div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
        </div>
        <div className="mt-3 w-full bg-blue-200 rounded-full h-2">
          <div 
            className="h-2 bg-blue-500 rounded-full transition-all"
            style={{ width: `${(mealsPlanned / totalMeals) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}