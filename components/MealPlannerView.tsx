import React, { useState } from 'react';
import { DailyCalendar } from './DailyCalendar';
import { RecipeSelector } from './RecipeSelector';
import { AIRecommendations } from './AIRecommendations';
import { Recipe, MealPlan, GroceryItem, UserPreferences } from '../types';
import { generateGroceryList } from '../utils/groceryUtils';
import { getWeekDates, formatDate, isToday } from '../utils/dateUtils';
import { ShoppingCart, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface MealPlannerViewProps {
  recipes: Recipe[];
  mealPlans: MealPlan[];
  onMealPlansChange: (mealPlans: MealPlan[]) => void;
  onGenerateGroceryList: (groceryList: GroceryItem[]) => void;
  userPreferences: UserPreferences;
}

export function MealPlannerView({
  recipes,
  mealPlans,
  onMealPlansChange,
  onGenerateGroceryList,
  userPreferences,
}: MealPlannerViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMealDate, setSelectedMealDate] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentDate = new Date(selectedDate);

  const handleMealSelect = (date: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setSelectedMealDate(date);
    setSelectedMealType(mealType);
    setShowRecipeSelector(true);
  };

  const handleGetRecommendations = (date: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setSelectedMealDate(date);
    setSelectedMealType(mealType);
    setShowRecommendations(true);
  };
  const handleRecipeSelect = (recipe: Recipe) => {
    if (!selectedMealDate) return;

    const existingPlan = mealPlans.find(plan => plan.date === selectedMealDate);
    
    if (existingPlan) {
      const updatedPlans = mealPlans.map(plan =>
        plan.date === selectedMealDate
          ? { ...plan, meals: { ...plan.meals, [selectedMealType]: recipe } }
          : plan
      );
      onMealPlansChange(updatedPlans);
    } else {
      const newPlan: MealPlan = {
        id: Date.now().toString(),
        date: selectedMealDate,
        meals: { [selectedMealType]: recipe },
      };
      onMealPlansChange([...mealPlans, newPlan]);
    }

    setShowRecipeSelector(false);
    setShowRecommendations(false);
  };

  const handleGenerateGroceryList = () => {
    const weekDates = getWeekDates(currentDate);
    const weekMealPlans = mealPlans.filter(plan => 
      weekDates.includes(plan.date)
    );
    const groceryList = generateGroceryList(weekMealPlans);
    onGenerateGroceryList(groceryList);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const weekMealPlans = mealPlans.filter(plan => {
    const weekDates = getWeekDates(currentDate);
    return weekDates.includes(plan.date);
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => navigateDay('prev')}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar className="h-5 w-5 text-gray-600" />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                {isToday(selectedDate) ? 'Today' : formatDate(selectedDate)}
              </h2>
              <p className="text-sm text-gray-500">
                {currentDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => navigateDay('next')}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        
        {showDatePicker && (
          <div className="mb-6">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateSelect(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        )}
        
        <button
          onClick={handleGenerateGroceryList}
          disabled={weekMealPlans.length === 0}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          onClose={() => {
            setShowRecipeSelector(false);
            setShowRecommendations(false);
          }}
          mealType={selectedMealType}
        />
      )}

      {showRecommendations && (
        <AIRecommendations
          recipes={recipes}
          mealPlans={mealPlans}
          userPreferences={userPreferences}
          selectedDate={selectedMealDate!}
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