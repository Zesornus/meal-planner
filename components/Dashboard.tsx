import React, { useState } from 'react';
import { MealPlan, Recipe } from '../types';
import { TrendingUp } from 'lucide-react';
import { isToday, formatDate } from '../utils/dateUtils';
import { StatsGrid } from './Dashboard/StatsGrid';
import { TodaysMeals } from './Dashboard/TodaysMeals';
import { QuickActions } from './Dashboard/QuickActions';

interface DashboardProps {
  mealPlans: MealPlan[];
  onNavigateToPlanner: () => void;
  onNavigateToRecipes: () => void;
  onNavigateToGrocery: () => void;
}

interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealsPlanned: number;
  totalMeals: number;
}

export function Dashboard({ mealPlans, onNavigateToPlanner, onNavigateToRecipes, onNavigateToGrocery }: DashboardProps) {
  const today = new Date().toISOString().split('T')[0];
  const todaysPlan = mealPlans.find(plan => plan.date === today);
  
  // Calculate today's nutrition
  const calculateNutrition = (): NutritionSummary => {
    if (!todaysPlan) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0, mealsPlanned: 0, totalMeals: 4 };
    }

    const meals = Object.values(todaysPlan.meals).filter(meal => meal !== undefined) as Recipe[];
    const mealsPlanned = meals.length;
    
    const totals = meals.reduce((acc, meal) => {
      if (meal.nutrition) {
        acc.calories += meal.nutrition.calories;
        acc.protein += meal.nutrition.protein;
        acc.carbs += meal.nutrition.carbs;
        acc.fat += meal.nutrition.fat;
      }
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

    return { ...totals, mealsPlanned, totalMeals: 4 };
  };

  const nutrition = calculateNutrition();
  
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Good Morning! 👋</h1>
        <p className="text-gray-600">Here's your nutrition overview for {formatDate(today)}</p>
      </div>

      {/* Nutrition Overview Cards */}
      <StatsGrid nutrition={nutrition} />

      {/* Today's Meals Overview */}
      <TodaysMeals todaysPlan={todaysPlan} onNavigateToPlanner={onNavigateToPlanner} />

      {/* Quick Actions */}
      <QuickActions 
        onNavigateToPlanner={onNavigateToPlanner}
        onNavigateToRecipes={onNavigateToRecipes}
        onNavigateToGrocery={onNavigateToGrocery}
      />

      {/* Weekly Summary */}
      <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          <span>This Week's Progress</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">5</div>
            <div className="text-sm text-gray-600">Days Planned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">12</div>
            <div className="text-sm text-gray-600">Meals Scheduled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">3</div>
            <div className="text-sm text-gray-600">New Recipes Tried</div>
          </div>
        </div>
      </div>
    </div>
  );
}