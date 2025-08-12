export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  image?: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: string;
}

export interface MealPlan {
  id: string;
  date: string;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snack?: Recipe;
  };
}

export interface GroceryItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: string;
  completed: boolean;
  recipeSource?: string;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  cuisinePreferences: string[];
  cookingTime: 'quick' | 'medium' | 'long';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  servingSize: number;
}

export interface RecommendationContext {
  currentWeek: string[];
  recentMeals: Recipe[];
  preferences: UserPreferences;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  season: 'spring' | 'summer' | 'fall' | 'winter';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  totalRecipes: number;
  totalMealsPlanned: number;
  favoriteRecipes: string[];
  cookingStreak: number;
  achievements: string[];
}