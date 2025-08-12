import React, { useState, useEffect } from 'react';
import { Recipe, MealPlan, UserPreferences } from '../types';
import { generateSimpleMLRecommendations } from '../utils/simplifiedML';
import { X, Sparkles, Clock, Users, ChefHat, Zap, Star } from 'lucide-react';

interface AIRecommendationsProps {
  recipes: Recipe[];
  mealPlans: MealPlan[];
  userPreferences: UserPreferences;
  selectedDate: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  onRecipeSelect: (recipe: Recipe) => void;
  onClose: () => void;
  onViewAllRecipes: () => void;
}

export function AIRecommendations({
  recipes,
  mealPlans,
  userPreferences,
  selectedDate,
  mealType,
  onRecipeSelect,
  onClose,
  onViewAllRecipes,
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<{
    recipe: Recipe;
    score: number;
    reasons: string[];
    algorithm: 'content' | 'collaborative';
  }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateRecs = async () => {
      setIsLoading(true);
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const recs = generateSimpleMLRecommendations(
        recipes,
        mealPlans,
        userPreferences,
        mealType
      );
      
      setRecommendations(recs);
      setIsLoading(false);
    };

    generateRecs();
  }, [recipes, mealPlans, userPreferences, selectedDate, mealType]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getReasonIcon = (reason: string) => {
    if (reason.includes('preference') || reason.includes('favorite')) return <Star className="h-3 w-3" />;
    if (reason.includes('quick') || reason.includes('time')) return <Zap className="h-3 w-3" />;
    if (reason.includes('skill') || reason.includes('easy')) return <ChefHat className="h-3 w-3" />;
    return <Sparkles className="h-3 w-3" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Smart ML Recommendations for {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </h3>
              <p className="text-sm text-gray-600">
                Using 2 ML algorithms: Content-Based + Collaborative Filtering
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
              </div>
              <p className="text-gray-600 mt-4 text-lg">Analyzing your preferences...</p>
              <p className="text-gray-500 text-sm mt-1">Finding the perfect meal suggestions</p>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No recommendations available</p>
              <p className="text-gray-400 text-sm mt-2">Try adding more recipes to your library</p>
              <button
                onClick={onViewAllRecipes}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Browse All Recipes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Found {recommendations.length} ML-powered recommendations
                </p>
                <button
                  onClick={onViewAllRecipes}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all recipes instead →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map(({ recipe, score, reasons, algorithm }, index) => (
                  <div
                    key={recipe.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer relative"
                    onClick={() => onRecipeSelect(recipe)}
                  >
                    {index === 0 && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                        ML TOP PICK
                      </div>
                    )}
                    
                    {recipe.image && (
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={recipe.image} 
                          alt={recipe.name}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(score)}`}>
                          {score}%
                        </div>
                        <div className="absolute top-3 right-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {algorithm === 'content' ? 'CONTENT' : 'COLLABORATIVE'}
                        </div>
                        {recipe.nutrition && (
                          <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-sm font-medium">
                            {recipe.nutrition.calories} cal
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-900 mb-1">{recipe.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                        </div>
                        {!recipe.image && (
                          <div className={`ml-4 px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(score)}`}>
                            {score}%
                            <div className="text-xs text-purple-600 font-bold mt-1">
                              {algorithm === 'content' ? 'CONTENT' : 'COLLAB'}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{recipe.prepTime + recipe.cookTime} min</span>
                          </div>
                          <div className="text-purple-600 font-medium text-sm">
                            <span>ML Match</span>
                          </div>
                        </div>
                        {recipe.nutrition && !recipe.image && (
                          <div className="font-medium text-emerald-600">
                            {recipe.nutrition.calories} cal
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900 text-sm">ML Analysis:</h5>
                        <div className="space-y-1">
                          {reasons.slice(0, 3).map((reason, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                              <span className="text-blue-500">{getReasonIcon(reason)}</span>
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
                          Select ML Recommendation
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}