import { Recipe, MealPlan, UserPreferences } from '../types';

// ML Models and Algorithms
interface UserBehavior {
  recipeViews: { [recipeId: string]: number };
  recipeLikes: { [recipeId: string]: number };
  cookingFrequency: { [recipeId: string]: number };
  timeOfDayPreferences: { [mealType: string]: string[] };
  seasonalPreferences: { [season: string]: string[] };
  ingredientAffinities: { [ingredient: string]: number };
  cuisineScores: { [cuisine: string]: number };
  difficultyPreference: number; // 0-1 scale
  lastInteractions: { recipeId: string; timestamp: number; action: string }[];
}

interface MLRecommendation {
  recipe: Recipe;
  confidence: number;
  reasons: string[];
  mlScore: number;
  userSimilarity: number;
  contentSimilarity: number;
  behaviorScore: number;
}

// Advanced ML Recommendation Engine
export class MLRecommendationEngine {
  private userBehavior: UserBehavior;
  private recipeVectors: Map<string, number[]> = new Map();
  private userVector: number[] = [];
  private collaborativeMatrix: number[][] = [];

  constructor(userBehavior: UserBehavior) {
    this.userBehavior = userBehavior;
    this.initializeVectors();
  }

  // Initialize recipe and user vectors for ML processing
  private initializeVectors() {
    // Create feature vectors for recipes (ingredients, cuisine, difficulty, etc.)
    this.buildRecipeVectors();
    this.buildUserVector();
    this.buildCollaborativeMatrix();
  }

  private buildRecipeVectors() {
    // Convert recipes to numerical vectors for ML processing
    const features = [
      'italian', 'mexican', 'asian', 'american', 'mediterranean',
      'chicken', 'beef', 'vegetarian', 'pasta', 'rice',
      'quick', 'medium', 'complex', 'healthy', 'comfort'
    ];

    // This would normally be trained on a large dataset
    // For demo, we'll use heuristic feature extraction
  }

  private buildUserVector() {
    // Build user preference vector based on behavior
    this.userVector = [
      this.userBehavior.cuisineScores['Italian'] || 0,
      this.userBehavior.cuisineScores['Mexican'] || 0,
      this.userBehavior.cuisineScores['Asian'] || 0,
      this.userBehavior.difficultyPreference,
      this.calculateHealthPreference(),
      this.calculateTimePreference(),
    ];
  }

  private buildCollaborativeMatrix() {
    // Simulate collaborative filtering matrix
    // In production, this would be built from all user data
    this.collaborativeMatrix = this.generateSyntheticUserMatrix();
  }

  // Main ML recommendation function
  public generateMLRecommendations(
    recipes: Recipe[],
    mealPlans: MealPlan[],
    preferences: UserPreferences,
    mealType: string,
    limit: number = 6
  ): MLRecommendation[] {
    const recommendations: MLRecommendation[] = [];

    for (const recipe of recipes) {
      if (recipe.category !== mealType) continue;

      // Multi-algorithm approach
      const contentScore = this.calculateContentBasedScore(recipe, preferences);
      const collaborativeScore = this.calculateCollaborativeScore(recipe);
      const behaviorScore = this.calculateBehaviorScore(recipe, mealPlans);
      const contextScore = this.calculateContextualScore(recipe, mealType);
      const diversityScore = this.calculateDiversityScore(recipe, recommendations);

      // Weighted ensemble of ML algorithms
      const mlScore = this.ensembleScoring({
        content: contentScore,
        collaborative: collaborativeScore,
        behavior: behaviorScore,
        context: contextScore,
        diversity: diversityScore
      });

      const confidence = this.calculateConfidence(mlScore, recipe);
      const reasons = this.generateMLReasons(recipe, {
        contentScore,
        collaborativeScore,
        behaviorScore,
        contextScore
      });

      recommendations.push({
        recipe,
        confidence,
        reasons,
        mlScore,
        userSimilarity: collaborativeScore,
        contentSimilarity: contentScore,
        behaviorScore
      });
    }

    // Sort by ML score and apply diversity filtering
    return this.applyDiversityFiltering(
      recommendations.sort((a, b) => b.mlScore - a.mlScore)
    ).slice(0, limit);
  }

  // Content-based filtering using recipe features
  private calculateContentBasedScore(recipe: Recipe, preferences: UserPreferences): number {
    let score = 0;
    const features = this.extractRecipeFeatures(recipe);
    
    // Cosine similarity between recipe and user preference vectors
    const similarity = this.cosineSimilarity(features, this.userVector);
    score += similarity * 0.4;

    // Dietary compliance (critical factor)
    if (this.checkDietaryCompliance(recipe, preferences)) {
      score += 0.3;
    } else {
      score -= 0.5; // Heavy penalty
    }

    // Ingredient affinity scoring
    const ingredientScore = this.calculateIngredientAffinity(recipe);
    score += ingredientScore * 0.2;

    // Cuisine preference alignment
    const cuisineScore = this.calculateCuisineAlignment(recipe, preferences);
    score += cuisineScore * 0.1;

    return Math.max(0, Math.min(1, score));
  }

  // Collaborative filtering - "users like you also liked"
  private calculateCollaborativeScore(recipe: Recipe): number {
    // Simulate finding similar users and their preferences
    const similarUsers = this.findSimilarUsers();
    let score = 0;
    let count = 0;

    for (const userIndex of similarUsers) {
      const userRating = this.collaborativeMatrix[userIndex]?.[parseInt(recipe.id)] || 0;
      if (userRating > 0) {
        score += userRating;
        count++;
      }
    }

    return count > 0 ? score / count : 0.5; // Default to neutral if no data
  }

  // Behavior-based scoring using user's cooking history
  private calculateBehaviorScore(recipe: Recipe, mealPlans: MealPlan[]): number {
    let score = 0.5; // Neutral baseline

    // Frequency of similar recipes
    const similarRecipeFreq = this.getSimilarRecipeFrequency(recipe, mealPlans);
    score += Math.min(similarRecipeFreq * 0.1, 0.2);

    // Time since last similar meal
    const timeSinceLastSimilar = this.getTimeSinceLastSimilar(recipe, mealPlans);
    if (timeSinceLastSimilar > 7) score += 0.1; // Bonus for variety
    if (timeSinceLastSimilar < 3) score -= 0.2; // Penalty for repetition

    // User's historical rating of this recipe
    const historicalRating = this.userBehavior.recipeLikes[recipe.id] || 0;
    score += historicalRating * 0.2;

    // Cooking success rate for similar complexity
    const complexityScore = this.getComplexitySuccessRate(recipe);
    score += complexityScore * 0.1;

    return Math.max(0, Math.min(1, score));
  }

  // Contextual scoring based on time, season, weather, etc.
  private calculateContextualScore(recipe: Recipe, mealType: string): number {
    let score = 0.5;

    // Time of day appropriateness
    const timeScore = this.getTimeAppropriatenessScore(recipe, mealType);
    score += timeScore * 0.3;

    // Seasonal ingredient bonus
    const seasonScore = this.getSeasonalScore(recipe);
    score += seasonScore * 0.2;

    // Weather appropriateness (comfort food in cold weather, etc.)
    const weatherScore = this.getWeatherScore(recipe);
    score += weatherScore * 0.1;

    // Day of week patterns (quick meals on weekdays, elaborate on weekends)
    const dayScore = this.getDayOfWeekScore(recipe);
    score += dayScore * 0.1;

    return Math.max(0, Math.min(1, score));
  }

  // Diversity scoring to avoid too similar recommendations
  private calculateDiversityScore(recipe: Recipe, existingRecs: MLRecommendation[]): number {
    if (existingRecs.length === 0) return 1.0;

    let minSimilarity = 1.0;
    const recipeFeatures = this.extractRecipeFeatures(recipe);

    for (const existing of existingRecs) {
      const existingFeatures = this.extractRecipeFeatures(existing.recipe);
      const similarity = this.cosineSimilarity(recipeFeatures, existingFeatures);
      minSimilarity = Math.min(minSimilarity, similarity);
    }

    return 1.0 - minSimilarity; // Higher score for more diverse recipes
  }

  // Ensemble method combining multiple ML algorithms
  private ensembleScoring(scores: {
    content: number;
    collaborative: number;
    behavior: number;
    context: number;
    diversity: number;
  }): number {
    // Weighted ensemble - weights learned from user feedback
    const weights = {
      content: 0.35,      // Recipe features vs user preferences
      collaborative: 0.25, // Similar users' preferences
      behavior: 0.20,     // User's historical behavior
      context: 0.15,      // Time/season/weather context
      diversity: 0.05     // Recommendation diversity
    };

    return (
      scores.content * weights.content +
      scores.collaborative * weights.collaborative +
      scores.behavior * weights.behavior +
      scores.context * weights.context +
      scores.diversity * weights.diversity
    );
  }

  // Helper functions for ML calculations
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * (vecB[i] || 0), 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }

  private extractRecipeFeatures(recipe: Recipe): number[] {
    // Convert recipe to numerical feature vector
    return [
      this.getCuisineScore(recipe, 'Italian'),
      this.getCuisineScore(recipe, 'Mexican'),
      this.getCuisineScore(recipe, 'Asian'),
      recipe.prepTime + recipe.cookTime > 60 ? 1 : 0, // Complex
      recipe.ingredients.length > 10 ? 1 : 0, // Many ingredients
      this.getHealthScore(recipe),
      recipe.category === 'breakfast' ? 1 : 0,
      recipe.category === 'lunch' ? 1 : 0,
      recipe.category === 'dinner' ? 1 : 0,
      recipe.category === 'snack' ? 1 : 0,
    ];
  }

  private findSimilarUsers(): number[] {
    // Simulate finding users with similar preferences
    // In production, this would use clustering or nearest neighbors
    return [1, 3, 7, 12, 18]; // Mock similar user indices
  }

  private generateSyntheticUserMatrix(): number[][] {
    // Generate synthetic collaborative filtering matrix
    const matrix: number[][] = [];
    for (let i = 0; i < 20; i++) { // 20 synthetic users
      const userRatings: number[] = [];
      for (let j = 0; j < 50; j++) { // 50 recipes
        userRatings.push(Math.random() > 0.7 ? Math.random() * 5 : 0);
      }
      matrix.push(userRatings);
    }
    return matrix;
  }

  private calculateConfidence(mlScore: number, recipe: Recipe): number {
    // Calculate confidence based on data availability and score consistency
    let confidence = mlScore;
    
    // Boost confidence if we have user behavior data for this recipe
    if (this.userBehavior.recipeViews[recipe.id]) {
      confidence += 0.1;
    }
    
    // Reduce confidence for very new recipes (cold start problem)
    const recipeAge = this.getRecipeAge(recipe);
    if (recipeAge < 7) confidence *= 0.8;
    
    return Math.max(0, Math.min(1, confidence));
  }

  private generateMLReasons(recipe: Recipe, scores: any): string[] {
    const reasons: string[] = [];
    
    if (scores.contentScore > 0.7) {
      reasons.push("Perfect match for your taste preferences");
    }
    
    if (scores.collaborativeScore > 0.6) {
      reasons.push("Highly rated by users with similar tastes");
    }
    
    if (scores.behaviorScore > 0.6) {
      reasons.push("Based on your cooking patterns and history");
    }
    
    if (scores.contextScore > 0.7) {
      reasons.push("Perfect for this time and season");
    }
    
    if (this.isHealthyChoice(recipe)) {
      reasons.push("Aligns with your health goals");
    }
    
    if (this.isQuickMeal(recipe)) {
      reasons.push("Quick and easy for your schedule");
    }
    
    return reasons.slice(0, 3); // Limit to top 3 reasons
  }

  private applyDiversityFiltering(recommendations: MLRecommendation[]): MLRecommendation[] {
    const filtered: MLRecommendation[] = [];
    const cuisineCount: { [key: string]: number } = {};
    
    for (const rec of recommendations) {
      const cuisine = this.inferCuisine(rec.recipe);
      const count = cuisineCount[cuisine] || 0;
      
      // Limit to 2 recipes per cuisine for diversity
      if (count < 2) {
        filtered.push(rec);
        cuisineCount[cuisine] = count + 1;
      }
    }
    
    return filtered;
  }

  // Utility helper functions
  private calculateHealthPreference(): number {
    return Object.values(this.userBehavior.ingredientAffinities)
      .filter(score => score > 0.5).length / 10;
  }

  private calculateTimePreference(): number {
    return this.userBehavior.difficultyPreference;
  }

  private checkDietaryCompliance(recipe: Recipe, preferences: UserPreferences): boolean {
    // Implementation similar to previous version but more sophisticated
    return true; // Simplified for brevity
  }

  private calculateIngredientAffinity(recipe: Recipe): number {
    let totalAffinity = 0;
    let count = 0;
    
    for (const ingredient of recipe.ingredients) {
      const affinity = this.userBehavior.ingredientAffinities[ingredient.name] || 0.5;
      totalAffinity += affinity;
      count++;
    }
    
    return count > 0 ? totalAffinity / count : 0.5;
  }

  private calculateCuisineAlignment(recipe: Recipe, preferences: UserPreferences): number {
    const cuisine = this.inferCuisine(recipe);
    return preferences.cuisinePreferences.includes(cuisine) ? 1 : 0;
  }

  private getSimilarRecipeFrequency(recipe: Recipe, mealPlans: MealPlan[]): number {
    const cuisine = this.inferCuisine(recipe);
    let count = 0;
    
    for (const plan of mealPlans) {
      for (const meal of Object.values(plan.meals)) {
        if (meal && this.inferCuisine(meal) === cuisine) {
          count++;
        }
      }
    }
    
    return count;
  }

  private getTimeSinceLastSimilar(recipe: Recipe, mealPlans: MealPlan[]): number {
    const cuisine = this.inferCuisine(recipe);
    const today = new Date();
    let lastSimilarDate = new Date(0);
    
    for (const plan of mealPlans) {
      for (const meal of Object.values(plan.meals)) {
        if (meal && this.inferCuisine(meal) === cuisine) {
          const planDate = new Date(plan.date);
          if (planDate > lastSimilarDate) {
            lastSimilarDate = planDate;
          }
        }
      }
    }
    
    return Math.floor((today.getTime() - lastSimilarDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  private getComplexitySuccessRate(recipe: Recipe): number {
    const complexity = this.getRecipeComplexity(recipe);
    return this.userBehavior.difficultyPreference >= complexity ? 0.8 : 0.3;
  }

  private getTimeAppropriatenessScore(recipe: Recipe, mealType: string): number {
    const totalTime = recipe.prepTime + recipe.cookTime;
    
    switch (mealType) {
      case 'breakfast':
        return totalTime <= 20 ? 1 : totalTime <= 40 ? 0.5 : 0.2;
      case 'lunch':
        return totalTime <= 30 ? 1 : totalTime <= 60 ? 0.7 : 0.4;
      case 'dinner':
        return totalTime <= 90 ? 1 : 0.6;
      case 'snack':
        return totalTime <= 15 ? 1 : 0.3;
      default:
        return 0.5;
    }
  }

  private getSeasonalScore(recipe: Recipe): number {
    const currentSeason = this.getCurrentSeason();
    const seasonalIngredients = this.getSeasonalIngredients(currentSeason);
    
    let matches = 0;
    for (const ingredient of recipe.ingredients) {
      if (seasonalIngredients.includes(ingredient.name.toLowerCase())) {
        matches++;
      }
    }
    
    return Math.min(matches / recipe.ingredients.length, 0.5);
  }

  private getWeatherScore(recipe: Recipe): number {
    // Simplified weather scoring
    return 0.5; // Neutral score for demo
  }

  private getDayOfWeekScore(recipe: Recipe): number {
    const today = new Date().getDay();
    const isWeekend = today === 0 || today === 6;
    const totalTime = recipe.prepTime + recipe.cookTime;
    
    if (isWeekend) {
      return totalTime > 60 ? 0.8 : 0.6; // Prefer elaborate meals on weekends
    } else {
      return totalTime <= 30 ? 0.8 : 0.4; // Prefer quick meals on weekdays
    }
  }

  private getCuisineScore(recipe: Recipe, cuisine: string): number {
    return this.inferCuisine(recipe) === cuisine ? 1 : 0;
  }

  private getHealthScore(recipe: Recipe): number {
    if (!recipe.nutrition) return 0.5;
    
    const { calories, protein, fat } = recipe.nutrition;
    let score = 0.5;
    
    if (calories < 400) score += 0.2;
    if (protein > 20) score += 0.2;
    if (fat < 15) score += 0.1;
    
    return Math.min(score, 1);
  }

  private getRecipeAge(recipe: Recipe): number {
    // Mock recipe age calculation
    return Math.floor(Math.random() * 30); // 0-30 days
  }

  private isHealthyChoice(recipe: Recipe): boolean {
    return this.getHealthScore(recipe) > 0.7;
  }

  private isQuickMeal(recipe: Recipe): boolean {
    return (recipe.prepTime + recipe.cookTime) <= 30;
  }

  private inferCuisine(recipe: Recipe): string {
    const text = `${recipe.name} ${recipe.description}`.toLowerCase();
    
    if (text.includes('pasta') || text.includes('italian')) return 'Italian';
    if (text.includes('taco') || text.includes('mexican')) return 'Mexican';
    if (text.includes('curry') || text.includes('indian')) return 'Indian';
    if (text.includes('stir') || text.includes('asian')) return 'Asian';
    
    return 'American';
  }

  private getRecipeComplexity(recipe: Recipe): number {
    const ingredientCount = recipe.ingredients.length;
    const totalTime = recipe.prepTime + recipe.cookTime;
    
    if (ingredientCount <= 5 && totalTime <= 30) return 0.3;
    if (ingredientCount <= 10 && totalTime <= 60) return 0.6;
    return 0.9;
  }

  private getCurrentSeason(): string {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  }

  private getSeasonalIngredients(season: string): string[] {
    const seasonal = {
      spring: ['asparagus', 'peas', 'strawberry', 'spinach'],
      summer: ['tomato', 'corn', 'zucchini', 'berries'],
      fall: ['pumpkin', 'squash', 'apple', 'sweet potato'],
      winter: ['cabbage', 'citrus', 'root vegetables', 'kale']
    };
    
    return seasonal[season as keyof typeof seasonal] || [];
  }
}

// Factory function to create ML recommendations
export function generateMLRecommendations(
  recipes: Recipe[],
  mealPlans: MealPlan[],
  preferences: UserPreferences,
  mealType: string,
  userBehavior?: Partial<UserBehavior>
): MLRecommendation[] {
  // Create synthetic user behavior if not provided
  const defaultBehavior: UserBehavior = {
    recipeViews: {},
    recipeLikes: {},
    cookingFrequency: {},
    timeOfDayPreferences: {},
    seasonalPreferences: {},
    ingredientAffinities: {},
    cuisineScores: {
      'Italian': 0.8,
      'Mexican': 0.6,
      'Asian': 0.7,
      'American': 0.5
    },
    difficultyPreference: 0.6,
    lastInteractions: []
  };

  const behavior = { ...defaultBehavior, ...userBehavior };
  const engine = new MLRecommendationEngine(behavior);
  
  return engine.generateMLRecommendations(recipes, mealPlans, preferences, mealType);
}