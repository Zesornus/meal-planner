import { MealPlan, GroceryItem, Ingredient } from '../types';

export function generateGroceryList(mealPlans: MealPlan[]): GroceryItem[] {
  const ingredientMap = new Map<string, { 
    amount: number; 
    unit: string; 
    category: string; 
    recipeSources: string[] 
  }>();

  // Collect all ingredients from all meals
  mealPlans.forEach(plan => {
    Object.values(plan.meals).forEach(meal => {
      if (meal) {
        meal.ingredients.forEach(ingredient => {
          const key = `${ingredient.name.toLowerCase()}_${ingredient.unit}`;
          
          if (ingredientMap.has(key)) {
            const existing = ingredientMap.get(key)!;
            existing.amount += ingredient.amount;
            existing.recipeSources.push(meal.name);
          } else {
            ingredientMap.set(key, {
              amount: ingredient.amount,
              unit: ingredient.unit,
              category: ingredient.category,
              recipeSources: [meal.name]
            });
          }
        });
      }
    });
  });

  // Convert to grocery items
  const groceryItems: GroceryItem[] = [];
  ingredientMap.forEach((data, key) => {
    const name = key.split('_')[0];
    groceryItems.push({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      amount: Math.round(data.amount * 100) / 100, // Round to 2 decimal places
      unit: data.unit,
      category: data.category,
      completed: false,
      recipeSource: data.recipeSources.join(', ')
    });
  });

  return groceryItems.sort((a, b) => a.category.localeCompare(b.category));
}

export function categorizeIngredient(ingredientName: string): string {
  const categories = {
    produce: ['tomato', 'onion', 'garlic', 'lettuce', 'carrot', 'potato', 'bell pepper', 'spinach', 'broccoli', 'cucumber', 'avocado', 'lemon', 'lime', 'apple', 'banana', 'orange'],
    dairy: ['milk', 'cheese', 'butter', 'yogurt', 'cream', 'sour cream', 'cottage cheese', 'mozzarella', 'parmesan', 'cheddar'],
    meat: ['chicken', 'beef', 'pork', 'fish', 'salmon', 'tuna', 'shrimp', 'turkey', 'ham', 'bacon', 'sausage'],
    pantry: ['flour', 'sugar', 'salt', 'pepper', 'oil', 'vinegar', 'rice', 'pasta', 'beans', 'oats', 'honey', 'soy sauce', 'olive oil'],
    frozen: ['frozen', 'ice cream', 'frozen vegetables', 'frozen fruit'],
    bakery: ['bread', 'rolls', 'bagels', 'muffins', 'croissants']
  };

  const name = ingredientName.toLowerCase();
  
  for (const [category, items] of Object.entries(categories)) {
    if (items.some(item => name.includes(item))) {
      return category;
    }
  }
  
  return 'other';
}