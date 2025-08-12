import React, { useState } from 'react';
import { Recipe, MealPlan, GroceryItem, UserPreferences } from '../types';
import { generateGroceryList } from '../utils/groceryUtils';
import { AIRecommendations } from './AIRecommendations';
import { RecipeSelector } from './RecipeSelector';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { DailyCalendar } from './DailyCalendar';

interface MealPlannerProps {
  recipes: Recipe[];
  mealPlans: MealPlan[];
  onMealPlansChange: (mealPlans: MealPlan[]) => void;
  onGenerateGroceryList: (groceryList: GroceryItem[]) => void;
  userPreferences: UserPreferences;
}

export function MealPlanner({
  recipes,
  mealPlans,
  onMealPlansChange,
  onGenerateGroceryList,
  userPreferences,
}: MealPlannerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');

  const handleMealSelect = (date: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setSelectedMealType(mealType);
    setShowRecipeSelector(true);
  };

  const handleGetRecommendations = (date: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setSelectedMealType(mealType);
    setShowRecommendations(true);
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    const existingPlan = mealPlans.find(plan => plan.date === selectedDate);
    
    if (existingPlan) {
      const updatedPlans = mealPlans.map(plan =>
        plan.date === selectedDate
          ? { ...plan, meals: { ...plan.meals, [selectedMealType]: recipe } }
          : plan
      );
      onMealPlansChange(updatedPlans);
    } else {
      const newPlan: MealPlan = {
        id: Date.now().toString(),
        date: selectedDate,
        meals: { [selectedMealType]: recipe },
      };
      onMealPlansChange([...mealPlans, newPlan]);
    }

    setShowRecipeSelector(false);
    setShowRecommendations(false);
  };

  const handleGenerateGroceryList = () => {
    const weekMealPlans = mealPlans.filter(plan => {
      const planDate = new Date(plan.date);
      const currentDate = new Date(selectedDate);
      const diffTime = Math.abs(planDate.getTime() - currentDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });
    const groceryList = generateGroceryList(weekMealPlans);
    onGenerateGroceryList(groceryList);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button onClick={() => navigateDay('prev')} className="p-3 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
          </div>
          
          <button onClick={() => navigateDay('next')} className="p-3 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        
        <button
          onClick={handleGenerateGroceryList}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Generate Shopping List</span>
        </button>
      </div>

      <DailyCalendar
        selectedDate={selectedDate}
        mealPlans={mealPlans}
        onMealSelect={handleMealSelect}
        onGetRecommendations={handleGetRecommendations}
      />

      {showRecipeSelector && (
        <RecipeSelector
          recipes={recipes}
          onRecipeSelect={handleRecipeSelect}
          onClose={() => setShowRecipeSelector(false)}
          mealType={selectedMealType}
        />
      )}

      {showRecommendations && (
        <AIRecommendations
          recipes={recipes}
          mealPlans={mealPlans}
          userPreferences={userPreferences}
          selectedDate={selectedDate}
          mealType={selectedMealType}
          onRecipeSelect={handleRecipeSelect}
          onClose={() => setShowRecommendations(false)}
          onViewAllRecipes={() => {
            setShowRecommendations(false);
            setShowRecipeSelector(true);
          }}
        />
      )}
    </div>
  );
}