import { Recipe, MealPlan, UserPreferences } from '../types';

interface SimpleRecommendation {
  recipe: Recipe;
  score: number;
  reasons: string[];
  algorithm: 'content' | 'collaborative';
}

// Simplified ML with just 2 algorithms
export class SimplifiedMLEngine {
  
  // Algorithm 1: Content-Based Filtering (60% weight)
  private calculateContentScore(recipe: Recipe, preferences: UserPreferences, recentMeals: Recipe[]): { score: number; reasons: string[] } {
    let score = 50; // Base score
    const reasons: string[] = [];

    // Dietary restrictions (most important)
    if (this.checkDietaryCompliance(recipe, preferences.dietaryRestrictions)) {
      score += 25;
      if (preferences.dietaryRestrictions.length > 0) {
        reasons.push(`Matches your ${preferences.dietaryRestrictions.join(', ')} diet`);
      }
    } else {
      score -= 40;
    }

    // Allergy safety
    if (!this.checkAllergyCompliance(recipe, preferences.allergies)) {
      score -= 50;
      reasons.push('⚠️ Contains allergens');
      return { score: Math.max(0, score), reasons };
    }

    // Cooking time preference
    const totalTime = recipe.prepTime + recipe.cookTime;
    if (preferences.cookingTime === 'quick' && totalTime <= 30) {
      score += 15;
      reasons.push('Quick to make - perfect for busy days');
    } else if (preferences.cookingTime === 'medium' && totalTime > 30 && totalTime <= 60) {
      score += 10;
      reasons.push('Moderate cooking time');
    } else if (preferences.cookingTime === 'long' && totalTime > 60) {
      score += 10;
      reasons.push('Perfect for when you have time to cook');
    }

    // Cuisine preference
    const recipeCuisine = this.inferCuisine(recipe);
    if (preferences.cuisinePreferences.includes(recipeCuisine)) {
      score += 15;
      reasons.push(`Your favorite ${recipeCuisine} cuisine`);
    }

    // Variety bonus
    if (!recentMeals.some(meal => meal.id === recipe.id)) {
      score += 10;
      reasons.push('Fresh choice - you haven\'t had this recently');
    }

    return { score: Math.max(0, Math.min(100, score)), reasons };
  }

  // Algorithm 2: Collaborative Filtering (40% weight)
  private calculateCollaborativeScore(recipe: Recipe, preferences: UserPreferences): { score: number; reasons: string[] } {
    let score = 50; // Base score
    const reasons: string[] = [];

    // Simulate user similarity based on preferences
    const popularityBonus = this.getRecipePopularity(recipe);
    score += popularityBonus;
    
    if (popularityBonus > 15) {
      reasons.push('Highly rated by users with similar tastes');
    } else if (popularityBonus > 5) {
      reasons.push('Popular choice among similar users');
    }

    // Skill level matching
    const complexity = this.getRecipeComplexity(recipe);
    if (this.isSkillAppropriate(complexity, preferences.skillLevel)) {
      score += 15;
      reasons.push(`Perfect for ${preferences.skillLevel} cooks`);
    }

    // Seasonal bonus
    if (this.isSeasonallyAppropriate(recipe)) {
      score += 10;
      reasons.push('Great for this season');
    }

    return { score: Math.max(0, Math.min(100, score)), reasons };
  }

  // Main recommendation function
  public generateRecommendations(
    recipes: Recipe[],
    mealPlans: MealPlan[],
    preferences: UserPreferences,
    mealType: string,
    limit: number = 6
  ): SimpleRecommendation[] {
    const filteredRecipes = recipes.filter(recipe => recipe.category === mealType);
    const recentMeals = this.getRecentMeals(mealPlans, 7);
    
    const recommendations: SimpleRecommendation[] = [];

    for (const recipe of filteredRecipes) {
      // Algorithm 1: Content-Based (60% weight)
      const contentResult = this.calculateContentScore(recipe, preferences, recentMeals);
      
      // Algorithm 2: Collaborative (40% weight)  
      const collaborativeResult = this.calculateCollaborativeScore(recipe, preferences);
      
      // Combine scores with weights
      const finalScore = (contentResult.score * 0.6) + (collaborativeResult.score * 0.4);
      
      // Combine reasons
      const allReasons = [...contentResult.reasons, ...collaborativeResult.reasons];
      
      // Determine primary algorithm
      const primaryAlgorithm = contentResult.score > collaborativeResult.score ? 'content' : 'collaborative';
      
      recommendations.push({
        recipe,
        score: Math.round(finalScore),
        reasons: allReasons.slice(0, 3), // Top 3 reasons
        algorithm: primaryAlgorithm
      });
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  // Helper functions
  private checkDietaryCompliance(recipe: Recipe, restrictions: string[]): boolean {
    if (restrictions.length === 0) return true;
    
    const ingredients = recipe.ingredients.map(ing => ing.name.toLowerCase()).join(' ');
    const text = `${recipe.name} ${recipe.description} ${ingredients}`.toLowerCase();
    
    for (const restriction of restrictions) {
      switch (restriction.toLowerCase()) {
        case 'vegetarian':
          if (['chicken', 'beef', 'pork', 'fish', 'meat'].some(meat => text.includes(meat))) return false;
          break;
        case 'vegan':
          if (['chicken', 'beef', 'pork', 'fish', 'meat', 'cheese', 'milk', 'butter', 'egg'].some(animal => text.includes(animal))) return false;
          break;
        case 'gluten-free':
          if (['wheat', 'flour', 'bread', 'pasta'].some(gluten => text.includes(gluten))) return false;
          break;
        case 'keto':
          if (['rice', 'pasta', 'bread', 'potato', 'sugar'].some(carb => text.includes(carb))) return false;
          break;
      }
    }
    return true;
  }

  private checkAllergyCompliance(recipe: Recipe, allergies: string[]): boolean {
    if (allergies.length === 0) return true;
    
    const ingredients = recipe.ingredients.map(ing => ing.name.toLowerCase()).join(' ');
    
    for (const allergy of allergies) {
      switch (allergy.toLowerCase()) {
        case 'nuts':
          if (['almond', 'walnut', 'pecan', 'cashew'].some(nut => ingredients.includes(nut))) return false;
          break;
        case 'dairy':
          if (['milk', 'cheese', 'butter', 'cream'].some(dairy => ingredients.includes(dairy))) return false;
          break;
        case 'eggs':
          if (ingredients.includes('egg')) return false;
          break;
      }
    }
    return true;
  }

  private inferCuisine(recipe: Recipe): string {
    const text = `${recipe.name} ${recipe.description}`.toLowerCase();
    
    if (text.includes('pasta') || text.includes('italian')) return 'Italian';
    if (text.includes('taco') || text.includes('mexican')) return 'Mexican';
    if (text.includes('curry') || text.includes('indian')) return 'Indian';
    if (text.includes('stir') || text.includes('asian')) return 'Asian';
    
    return 'American';
  }

  private getRecipePopularity(recipe: Recipe): number {
    // Simulate popularity based on recipe characteristics
    const hasImage = recipe.image ? 10 : 0;
    const hasNutrition = recipe.nutrition ? 5 : 0;
    const timeBonus = (recipe.prepTime + recipe.cookTime) <= 30 ? 10 : 0;
    
    return Math.min(20, hasImage + hasNutrition + timeBonus);
  }

  private getRecipeComplexity(recipe: Recipe): 'simple' | 'moderate' | 'complex' {
    const ingredientCount = recipe.ingredients.length;
    const totalTime = recipe.prepTime + recipe.cookTime;
    
    if (ingredientCount <= 5 && totalTime <= 30) return 'simple';
    if (ingredientCount <= 10 && totalTime <= 60) return 'moderate';
    return 'complex';
  }

  private isSkillAppropriate(complexity: string, skillLevel: string): boolean {
    if (skillLevel === 'beginner') return complexity === 'simple';
    if (skillLevel === 'intermediate') return complexity !== 'complex';
    return true;
  }

  private isSeasonallyAppropriate(recipe: Recipe): boolean {
    const month = new Date().getMonth();
    const ingredients = recipe.ingredients.map(ing => ing.name.toLowerCase()).join(' ');
    
    // Summer ingredients
    if (month >= 5 && month <= 7) {
      return ['tomato', 'cucumber', 'berries', 'corn'].some(summer => ingredients.includes(summer));
    }
    
    // Winter ingredients  
    if (month >= 11 || month <= 1) {
      return ['soup', 'stew', 'root', 'squash'].some(winter => ingredients.includes(winter));
    }
    
    return false;
  }

  private getRecentMeals(mealPlans: MealPlan[], days: number): Recipe[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return mealPlans
      .filter(plan => new Date(plan.date) >= cutoffDate)
      .flatMap(plan => Object.values(plan.meals))
      .filter((meal): meal is Recipe => meal !== undefined);
  }
}

// Factory function
export function generateSimpleMLRecommendations(
  recipes: Recipe[],
  mealPlans: MealPlan[],
  preferences: UserPreferences,
  mealType: string
): SimpleRecommendation[] {
  const engine = new SimplifiedMLEngine();
  return engine.generateRecommendations(recipes, mealPlans, preferences, mealType);
}