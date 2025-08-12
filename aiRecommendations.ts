import { Recipe, MealPlan, UserPreferences, RecommendationContext } from '../types';

interface RecommendationInput {
  recipes: Recipe[];
  mealPlans: MealPlan[];
  userPreferences: UserPreferences;
  selectedDate: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface RecommendationResult {
  recipe: Recipe;
  score: number;
  reasons: string[];
}

export function generateRecommendations({
  recipes,
  mealPlans,
  userPreferences,
  selectedDate,
  mealType,
}: RecommendationInput): RecommendationResult[] {
  if (recipes.length === 0) return [];

  // Filter recipes by meal type
  const filteredRecipes = recipes.filter(recipe => recipe.category === mealType);
  
  if (filteredRecipes.length === 0) return [];

  // Get recent meals for variety scoring
  const recentMeals = getRecentMeals(mealPlans, 7);
  const weekMeals = getWeekMeals(mealPlans, selectedDate);
  const season = getCurrentSeason();

  // Score each recipe
  const scoredRecipes = filteredRecipes.map(recipe => {
    const { score, reasons } = calculateRecipeScore(
      recipe,
      userPreferences,
      recentMeals,
      weekMeals,
      season,
      mealType
    );
    
    return { recipe, score, reasons };
  });

  // Sort by score and return top recommendations
  return scoredRecipes
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

function calculateRecipeScore(
  recipe: Recipe,
  preferences: UserPreferences,
  recentMeals: Recipe[],
  weekMeals: Recipe[],
  season: string,
  mealType: string
): { score: number; reasons: string[] } {
  let score = 50; // Base score
  const reasons: string[] = [];

  // Dietary restrictions compliance
  if (checkDietaryCompliance(recipe, preferences.dietaryRestrictions)) {
    score += 20;
    if (preferences.dietaryRestrictions.length > 0) {
      reasons.push(`Matches your ${preferences.dietaryRestrictions.join(', ')} preferences`);
    }
  } else {
    score -= 30; // Heavy penalty for non-compliance
  }

  // Allergy safety
  if (checkAllergyCompliance(recipe, preferences.allergies)) {
    score += 15;
  } else {
    score -= 50; // Very heavy penalty for allergens
    reasons.push('⚠️ Contains allergens you want to avoid');
  }

  // Cooking time preference
  const totalTime = recipe.prepTime + recipe.cookTime;
  if (preferences.cookingTime === 'quick' && totalTime <= 30) {
    score += 15;
    reasons.push('Quick to prepare - perfect for busy days');
  } else if (preferences.cookingTime === 'medium' && totalTime > 30 && totalTime <= 60) {
    score += 10;
    reasons.push('Moderate cooking time fits your schedule');
  } else if (preferences.cookingTime === 'long' && totalTime > 60) {
    score += 10;
    reasons.push('Perfect for when you have time to cook');
  }

  // Skill level appropriateness
  const recipeComplexity = getRecipeComplexity(recipe);
  if (isSkillLevelAppropriate(recipeComplexity, preferences.skillLevel)) {
    score += 10;
    reasons.push(`Great match for ${preferences.skillLevel} cooking skills`);
  }

  // Serving size match
  if (Math.abs(recipe.servings - preferences.servingSize) <= 1) {
    score += 5;
    reasons.push('Perfect serving size for your household');
  }

  // Cuisine preference
  const recipeCuisine = inferCuisineType(recipe);
  if (preferences.cuisinePreferences.includes(recipeCuisine)) {
    score += 15;
    reasons.push(`Features your favorite ${recipeCuisine} cuisine`);
  }

  // Variety bonus (haven't had recently)
  if (!recentMeals.some(meal => meal.id === recipe.id)) {
    score += 10;
    reasons.push('Fresh choice - you haven\'t had this recently');
  } else {
    score -= 15;
    reasons.push('You had this recently');
  }

  // Weekly variety
  if (!weekMeals.some(meal => meal.id === recipe.id)) {
    score += 5;
  } else {
    score -= 10;
  }

  // Seasonal ingredients bonus
  if (hasSeasonalIngredients(recipe, season)) {
    score += 8;
    reasons.push('Features fresh seasonal ingredients');
  }

  // Nutritional balance for meal type
  if (isNutritionallyAppropriate(recipe, mealType)) {
    score += 8;
    reasons.push(`Well-balanced nutrition for ${mealType}`);
  }

  // Popular ingredients bonus
  if (hasPopularIngredients(recipe)) {
    score += 5;
    reasons.push('Uses common, easy-to-find ingredients');
  }

  // Complexity vs time of day
  if (mealType === 'breakfast' && totalTime <= 20) {
    score += 10;
    reasons.push('Quick breakfast option to start your day right');
  }

  return { score: Math.max(0, Math.min(100, score)), reasons };
}

function checkDietaryCompliance(recipe: Recipe, restrictions: string[]): boolean {
  if (restrictions.length === 0) return true;
  
  const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
  const recipeText = `${recipe.name} ${recipe.description}`.toLowerCase();
  
  for (const restriction of restrictions) {
    switch (restriction.toLowerCase()) {
      case 'vegetarian':
        if (recipeIngredients.some(ing => 
          ['chicken', 'beef', 'pork', 'fish', 'meat', 'bacon', 'ham'].some(meat => ing.includes(meat))
        )) return false;
        break;
      case 'vegan':
        if (recipeIngredients.some(ing => 
          ['chicken', 'beef', 'pork', 'fish', 'meat', 'bacon', 'ham', 'cheese', 'milk', 'butter', 'egg', 'yogurt', 'cream'].some(animal => ing.includes(animal))
        )) return false;
        break;
      case 'gluten-free':
        if (recipeIngredients.some(ing => 
          ['wheat', 'flour', 'bread', 'pasta', 'gluten'].some(gluten => ing.includes(gluten))
        )) return false;
        break;
      case 'dairy-free':
        if (recipeIngredients.some(ing => 
          ['milk', 'cheese', 'butter', 'cream', 'yogurt'].some(dairy => ing.includes(dairy))
        )) return false;
        break;
      case 'keto':
        if (recipeIngredients.some(ing => 
          ['rice', 'pasta', 'bread', 'potato', 'sugar', 'flour'].some(carb => ing.includes(carb))
        )) return false;
        break;
    }
  }
  
  return true;
}

function checkAllergyCompliance(recipe: Recipe, allergies: string[]): boolean {
  if (allergies.length === 0) return true;
  
  const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
  
  for (const allergy of allergies) {
    switch (allergy.toLowerCase()) {
      case 'nuts':
        if (recipeIngredients.some(ing => 
          ['almond', 'walnut', 'pecan', 'cashew', 'pistachio', 'hazelnut', 'macadamia'].some(nut => ing.includes(nut))
        )) return false;
        break;
      case 'peanuts':
        if (recipeIngredients.some(ing => ing.includes('peanut'))) return false;
        break;
      case 'shellfish':
        if (recipeIngredients.some(ing => 
          ['shrimp', 'crab', 'lobster', 'scallop', 'clam', 'mussel', 'oyster'].some(shellfish => ing.includes(shellfish))
        )) return false;
        break;
      case 'fish':
        if (recipeIngredients.some(ing => 
          ['salmon', 'tuna', 'cod', 'fish', 'anchovy'].some(fish => ing.includes(fish))
        )) return false;
        break;
      case 'eggs':
        if (recipeIngredients.some(ing => ing.includes('egg'))) return false;
        break;
      case 'dairy':
        if (recipeIngredients.some(ing => 
          ['milk', 'cheese', 'butter', 'cream', 'yogurt'].some(dairy => ing.includes(dairy))
        )) return false;
        break;
      case 'soy':
        if (recipeIngredients.some(ing => 
          ['soy', 'tofu', 'tempeh', 'miso'].some(soy => ing.includes(soy))
        )) return false;
        break;
      case 'wheat/gluten':
        if (recipeIngredients.some(ing => 
          ['wheat', 'flour', 'bread', 'pasta', 'gluten'].some(gluten => ing.includes(gluten))
        )) return false;
        break;
    }
  }
  
  return true;
}

function getRecipeComplexity(recipe: Recipe): 'simple' | 'moderate' | 'complex' {
  const ingredientCount = recipe.ingredients.length;
  const instructionCount = recipe.instructions.length;
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  if (ingredientCount <= 5 && instructionCount <= 4 && totalTime <= 30) {
    return 'simple';
  } else if (ingredientCount <= 10 && instructionCount <= 8 && totalTime <= 60) {
    return 'moderate';
  } else {
    return 'complex';
  }
}

function isSkillLevelAppropriate(complexity: string, skillLevel: string): boolean {
  if (skillLevel === 'beginner') return complexity === 'simple';
  if (skillLevel === 'intermediate') return complexity !== 'complex';
  return true; // Advanced can handle any complexity
}

function inferCuisineType(recipe: Recipe): string {
  const text = `${recipe.name} ${recipe.description}`.toLowerCase();
  const ingredients = recipe.ingredients.map(ing => ing.name.toLowerCase()).join(' ');
  const combined = `${text} ${ingredients}`;
  
  if (combined.includes('pasta') || combined.includes('italian') || combined.includes('parmesan')) return 'Italian';
  if (combined.includes('taco') || combined.includes('mexican') || combined.includes('salsa')) return 'Mexican';
  if (combined.includes('soy sauce') || combined.includes('asian') || combined.includes('ginger')) return 'Asian';
  if (combined.includes('curry') || combined.includes('indian') || combined.includes('turmeric')) return 'Indian';
  if (combined.includes('olive oil') || combined.includes('mediterranean') || combined.includes('feta')) return 'Mediterranean';
  if (combined.includes('french') || combined.includes('baguette') || combined.includes('brie')) return 'French';
  if (combined.includes('thai') || combined.includes('coconut milk') || combined.includes('lemongrass')) return 'Thai';
  
  return 'American';
}

function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

function hasSeasonalIngredients(recipe: Recipe, season: string): boolean {
  const ingredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
  
  const seasonalIngredients = {
    spring: ['asparagus', 'peas', 'artichoke', 'strawberry', 'spinach', 'lettuce'],
    summer: ['tomato', 'corn', 'zucchini', 'berries', 'peach', 'cucumber', 'bell pepper'],
    fall: ['pumpkin', 'squash', 'apple', 'sweet potato', 'brussels sprouts', 'cranberry'],
    winter: ['root vegetables', 'cabbage', 'citrus', 'pomegranate', 'kale', 'winter squash']
  };
  
  return ingredients.some(ing => 
    seasonalIngredients[season as keyof typeof seasonalIngredients]?.some(seasonal => ing.includes(seasonal))
  );
}

function isNutritionallyAppropriate(recipe: Recipe, mealType: string): boolean {
  const ingredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
  
  switch (mealType) {
    case 'breakfast':
      return ingredients.some(ing => 
        ['egg', 'oats', 'yogurt', 'fruit', 'milk', 'cereal'].some(breakfast => ing.includes(breakfast))
      );
    case 'lunch':
      return ingredients.some(ing => 
        ['salad', 'sandwich', 'soup', 'protein', 'vegetables'].some(lunch => ing.includes(lunch))
      );
    case 'dinner':
      return ingredients.some(ing => 
        ['protein', 'vegetables', 'starch', 'rice', 'pasta'].some(dinner => ing.includes(dinner))
      );
    case 'snack':
      return recipe.prepTime + recipe.cookTime <= 15;
    default:
      return true;
  }
}

function hasPopularIngredients(recipe: Recipe): boolean {
  const commonIngredients = [
    'onion', 'garlic', 'tomato', 'chicken', 'rice', 'pasta', 'cheese', 
    'olive oil', 'salt', 'pepper', 'egg', 'milk', 'flour', 'butter'
  ];
  
  const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
  return recipeIngredients.some(ing => 
    commonIngredients.some(common => ing.includes(common))
  );
}

function getRecentMeals(mealPlans: MealPlan[], days: number): Recipe[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return mealPlans
    .filter(plan => new Date(plan.date) >= cutoffDate)
    .flatMap(plan => Object.values(plan.meals))
    .filter((meal): meal is Recipe => meal !== undefined);
}

function getWeekMeals(mealPlans: MealPlan[], selectedDate: string): Recipe[] {
  const date = new Date(selectedDate);
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  return mealPlans
    .filter(plan => {
      const planDate = new Date(plan.date);
      return planDate >= startOfWeek && planDate <= endOfWeek;
    })
    .flatMap(plan => Object.values(plan.meals))
    .filter((meal): meal is Recipe => meal !== undefined);
}