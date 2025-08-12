import { Recipe } from '../types';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Avocado Toast',
    description: 'Creamy avocado on toasted sourdough with a hint of lemon and sea salt',
    category: 'breakfast',
    prepTime: 5,
    cookTime: 2,
    servings: 2,
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '1', name: 'sourdough bread', amount: 2, unit: 'slices', category: 'bakery' },
      { id: '2', name: 'ripe avocado', amount: 1, unit: 'large', category: 'produce' },
      { id: '3', name: 'lemon juice', amount: 1, unit: 'tbsp', category: 'produce' },
      { id: '4', name: 'sea salt', amount: 1, unit: 'pinch', category: 'pantry' },
      { id: '5', name: 'black pepper', amount: 1, unit: 'pinch', category: 'pantry' },
      { id: '6', name: 'red pepper flakes', amount: 0.5, unit: 'tsp', category: 'pantry' }
    ],
    instructions: [
      'Toast the bread slices until golden brown',
      'Cut avocado in half, remove pit, and scoop into a bowl',
      'Mash avocado with lemon juice, salt, and pepper until creamy',
      'Spread the avocado mixture generously on toast',
      'Sprinkle with red pepper flakes and serve immediately'
    ],
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 32,
      fat: 16
    }
  },
  {
    id: '2', 
    name: 'Fluffy Pancakes',
    description: 'Light and fluffy buttermilk pancakes perfect for weekend mornings',
    category: 'breakfast',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '7', name: 'all-purpose flour', amount: 2, unit: 'cups', category: 'pantry' },
      { id: '8', name: 'sugar', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: '9', name: 'baking powder', amount: 2, unit: 'tsp', category: 'pantry' },
      { id: '10', name: 'salt', amount: 0.5, unit: 'tsp', category: 'pantry' },
      { id: '11', name: 'buttermilk', amount: 1.75, unit: 'cups', category: 'dairy' },
      { id: '12', name: 'eggs', amount: 2, unit: 'large', category: 'dairy' },
      { id: '13', name: 'melted butter', amount: 4, unit: 'tbsp', category: 'dairy' },
      { id: '14', name: 'vanilla extract', amount: 1, unit: 'tsp', category: 'pantry' }
    ],
    instructions: [
      'In a large bowl, whisk together flour, sugar, baking powder, and salt',
      'In another bowl, whisk buttermilk, eggs, melted butter, and vanilla',
      'Pour wet ingredients into dry ingredients and stir until just combined',
      'Heat a griddle or large skillet over medium heat',
      'Pour 1/4 cup batter for each pancake onto the griddle',
      'Cook until bubbles form on surface, then flip and cook until golden',
      'Serve hot with butter and maple syrup'
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 11
    }
  },
  {
    id: '3',
    name: 'Greek Yogurt Parfait',
    description: 'Layered yogurt with fresh berries and crunchy granola',
    category: 'breakfast',
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    image: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '15', name: 'greek yogurt', amount: 2, unit: 'cups', category: 'dairy' },
      { id: '16', name: 'mixed berries', amount: 1, unit: 'cup', category: 'produce' },
      { id: '17', name: 'granola', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: '18', name: 'honey', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: '19', name: 'sliced almonds', amount: 2, unit: 'tbsp', category: 'pantry' }
    ],
    instructions: [
      'In glasses or bowls, layer half the yogurt',
      'Add half the berries and a drizzle of honey',
      'Sprinkle with half the granola',
      'Repeat layers with remaining ingredients',
      'Top with sliced almonds and serve immediately'
    ],
    nutrition: {
      calories: 250,
      protein: 18,
      carbs: 35,
      fat: 6
    }
  },
  {
    id: '4',
    name: 'Scrambled Eggs with Herbs',
    description: 'Creamy scrambled eggs with fresh chives and parsley',
    category: 'breakfast',
    prepTime: 5,
    cookTime: 5,
    servings: 2,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '20', name: 'eggs', amount: 6, unit: 'large', category: 'dairy' },
      { id: '21', name: 'butter', amount: 2, unit: 'tbsp', category: 'dairy' },
      { id: '22', name: 'heavy cream', amount: 2, unit: 'tbsp', category: 'dairy' },
      { id: '23', name: 'fresh chives', amount: 2, unit: 'tbsp', category: 'produce' },
      { id: '24', name: 'fresh parsley', amount: 1, unit: 'tbsp', category: 'produce' },
      { id: '25', name: 'salt', amount: 0.5, unit: 'tsp', category: 'pantry' },
      { id: '26', name: 'black pepper', amount: 0.25, unit: 'tsp', category: 'pantry' }
    ],
    instructions: [
      'Crack eggs into a bowl and whisk with cream, salt, and pepper',
      'Heat butter in a non-stick pan over medium-low heat',
      'Pour in eggs and let sit for 20 seconds',
      'Gently stir with a spatula, pushing eggs from edges to center',
      'Continue stirring gently until eggs are just set but still creamy',
      'Remove from heat and fold in fresh herbs',
      'Serve immediately while hot'
    ],
    nutrition: {
      calories: 290,
      protein: 20,
      carbs: 2,
      fat: 23
    }
  },
  {
    id: '5',
    name: 'Overnight Oats',
    description: 'Make-ahead breakfast with oats, chia seeds, and your favorite toppings',
    category: 'breakfast',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    image: 'https://images.pexels.com/photos/3625372/pexels-photo-3625372.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '27', name: 'rolled oats', amount: 1, unit: 'cup', category: 'pantry' },
      { id: '28', name: 'chia seeds', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: '29', name: 'almond milk', amount: 1, unit: 'cup', category: 'dairy' },
      { id: '30', name: 'maple syrup', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: '31', name: 'vanilla extract', amount: 0.5, unit: 'tsp', category: 'pantry' },
      { id: '32', name: 'banana', amount: 1, unit: 'medium', category: 'produce' },
      { id: '33', name: 'blueberries', amount: 0.5, unit: 'cup', category: 'produce' }
    ],
    instructions: [
      'In a bowl, mix oats, chia seeds, almond milk, maple syrup, and vanilla',
      'Stir well to combine all ingredients',
      'Divide mixture between two jars or containers',
      'Cover and refrigerate overnight or at least 4 hours',
      'In the morning, slice banana and add to oats',
      'Top with blueberries and any other desired toppings',
      'Enjoy cold or warm slightly in microwave'
    ],
    nutrition: {
      calories: 310,
      protein: 8,
      carbs: 58,
      fat: 7
    }
  },
  {
    id: '6',
    name: 'Chicken Caesar Salad',
    description: 'Fresh romaine lettuce with grilled chicken, parmesan, and Caesar dressing',
    category: 'lunch',
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '34', name: 'chicken breast', amount: 2, unit: 'pieces', category: 'meat' },
      { id: '35', name: 'romaine lettuce', amount: 1, unit: 'head', category: 'produce' },
      { id: '36', name: 'parmesan cheese', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: '37', name: 'caesar dressing', amount: 0.25, unit: 'cup', category: 'pantry' },
      { id: '38', name: 'croutons', amount: 1, unit: 'cup', category: 'bakery' }
    ],
    instructions: [
      'Season and grill chicken breast until cooked through',
      'Let chicken cool, then slice into strips',
      'Wash and chop romaine lettuce',
      'Toss lettuce with Caesar dressing',
      'Top with chicken, parmesan, and croutons'
    ],
    nutrition: {
      calories: 420,
      protein: 35,
      carbs: 12,
      fat: 26
    }
  },
  {
    id: '7',
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with eggs, cheese, and pancetta',
    category: 'dinner',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '39', name: 'spaghetti', amount: 400, unit: 'g', category: 'pantry' },
      { id: '40', name: 'pancetta', amount: 150, unit: 'g', category: 'meat' },
      { id: '41', name: 'eggs', amount: 3, unit: 'pieces', category: 'dairy' },
      { id: '42', name: 'parmesan cheese', amount: 1, unit: 'cup', category: 'dairy' },
      { id: '43', name: 'black pepper', amount: 1, unit: 'tsp', category: 'pantry' }
    ],
    instructions: [
      'Cook spaghetti according to package directions',
      'Cook pancetta until crispy',
      'Beat eggs with parmesan and black pepper',
      'Combine hot pasta with pancetta',
      'Add egg mixture and toss quickly to create creamy sauce'
    ],
    nutrition: {
      calories: 580,
      protein: 28,
      carbs: 72,
      fat: 18
    }
  },
  {
    id: '8',
    name: 'Trail Mix',
    description: 'Homemade mix of nuts, dried fruit, and dark chocolate',
    category: 'snack',
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '44', name: 'almonds', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: '45', name: 'cashews', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: '46', name: 'dried cranberries', amount: 0.25, unit: 'cup', category: 'pantry' },
      { id: '47', name: 'dark chocolate chips', amount: 0.25, unit: 'cup', category: 'pantry' },
      { id: '48', name: 'pumpkin seeds', amount: 2, unit: 'tbsp', category: 'pantry' }
    ],
    instructions: [
      'Combine all ingredients in a large bowl',
      'Mix well to distribute evenly',
      'Store in an airtight container',
      'Portion into small bags for easy snacking'
    ],
    nutrition: {
      calories: 180,
      protein: 6,
      carbs: 12,
      fat: 14
    }
  },
  {
    id: '19',
    name: 'Chicken Alfredo Pasta',
    description: 'Creamy, rich pasta with tender chicken in a classic alfredo sauce',
    category: 'dinner',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '106', name: 'fettuccine pasta', amount: 12, unit: 'oz', category: 'pantry' },
      { id: '107', name: 'chicken breast', amount: 1, unit: 'lb', category: 'meat' },
      { id: '108', name: 'heavy cream', amount: 1, unit: 'cup', category: 'dairy' },
      { id: '109', name: 'parmesan cheese', amount: 1, unit: 'cup', category: 'dairy' },
      { id: '110', name: 'butter', amount: 4, unit: 'tbsp', category: 'dairy' },
      { id: '111', name: 'garlic', amount: 3, unit: 'cloves', category: 'produce' },
      { id: '112', name: 'salt', amount: 1, unit: 'tsp', category: 'pantry' },
      { id: '113', name: 'black pepper', amount: 0.5, unit: 'tsp', category: 'pantry' },
      { id: '114', name: 'olive oil', amount: 2, unit: 'tbsp', category: 'pantry' }
    ],
    instructions: [
      'Cook fettuccine pasta according to package directions until al dente',
      'Season chicken breast with salt and pepper, then slice into strips',
      'Heat olive oil in a large skillet over medium-high heat',
      'Cook chicken strips until golden brown and cooked through, about 6-8 minutes',
      'Remove chicken and set aside, keep warm',
      'In the same skillet, melt butter and sauté minced garlic for 1 minute',
      'Pour in heavy cream and bring to a gentle simmer',
      'Gradually whisk in parmesan cheese until smooth and creamy',
      'Season sauce with salt and pepper to taste',
      'Add cooked pasta and chicken back to the skillet',
      'Toss everything together until well coated with sauce',
      'Serve immediately with extra parmesan cheese'
    ],
    nutrition: {
      calories: 680,
      protein: 42,
      carbs: 48,
      fat: 35
    }
  },
  {
    id: '13',
    name: 'Masala Chai',
    description: 'Aromatic spiced tea with cardamom, ginger, and cinnamon',
    category: 'breakfast',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    image: 'https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '67', name: 'water', amount: 2, unit: 'cups', category: 'pantry' },
      { id: '68', name: 'black tea', amount: 2, unit: 'tsp', category: 'pantry' },
      { id: '69', name: 'milk', amount: 1, unit: 'cup', category: 'dairy' },
      { id: '70', name: 'sugar', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: '71', name: 'cardamom pods', amount: 4, unit: 'pieces', category: 'pantry' },
      { id: '72', name: 'fresh ginger', amount: 1, unit: 'inch', category: 'produce' },
      { id: '73', name: 'cinnamon stick', amount: 1, unit: 'small', category: 'pantry' }
    ],
    instructions: [
      'Boil water with cardamom, ginger, and cinnamon for 3 minutes',
      'Add tea leaves and boil for 2 minutes',
      'Add milk and sugar, bring to boil',
      'Simmer for 2-3 minutes until fragrant',
      'Strain and serve hot'
    ],
    nutrition: {
      calories: 120,
      protein: 4,
      carbs: 18,
      fat: 3
    }
  },
  {
    id: '14',
    name: 'Aloo Paratha',
    description: 'Stuffed flatbread with spiced potato filling, perfect for breakfast',
    category: 'breakfast',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '74', name: 'whole wheat flour', amount: 2, unit: 'cups', category: 'pantry' },
      { id: '75', name: 'potatoes', amount: 3, unit: 'medium', category: 'produce' },
      { id: '76', name: 'cumin seeds', amount: 1, unit: 'tsp', category: 'pantry' },
      { id: '77', name: 'green chilies', amount: 2, unit: 'pieces', category: 'produce' },
      { id: '78', name: 'coriander leaves', amount: 2, unit: 'tbsp', category: 'produce' },
      { id: '79', name: 'ghee', amount: 3, unit: 'tbsp', category: 'dairy' }
    ],
    instructions: [
      'Make dough with flour and water, rest 20 minutes',
      'Boil and mash potatoes with spices',
      'Roll dough, stuff with potato mixture',
      'Seal edges and roll gently',
      'Cook on hot griddle with ghee until golden'
    ],
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 45,
      fat: 8
    }
  },
  {
    id: '15',
    name: 'Dal Tadka',
    description: 'Comforting yellow lentils with aromatic tempering',
    category: 'lunch',
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '80', name: 'yellow lentils', amount: 1, unit: 'cup', category: 'pantry' },
      { id: '81', name: 'turmeric', amount: 0.5, unit: 'tsp', category: 'pantry' },
      { id: '82', name: 'cumin seeds', amount: 1, unit: 'tsp', category: 'pantry' },
      { id: '83', name: 'mustard seeds', amount: 0.5, unit: 'tsp', category: 'pantry' },
      { id: '84', name: 'onion', amount: 1, unit: 'medium', category: 'produce' },
      { id: '85', name: 'tomato', amount: 1, unit: 'large', category: 'produce' },
      { id: '86', name: 'ginger-garlic paste', amount: 1, unit: 'tbsp', category: 'pantry' }
    ],
    instructions: [
      'Pressure cook lentils with turmeric until soft',
      'Heat oil, add cumin and mustard seeds',
      'Add onions, cook until golden',
      'Add ginger-garlic paste and tomatoes',
      'Mix with cooked dal, simmer 5 minutes'
    ],
    nutrition: {
      calories: 220,
      protein: 14,
      carbs: 35,
      fat: 4
    }
  },
  {
    id: '16',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken',
    category: 'dinner',
    prepTime: 30,
    cookTime: 45,
    servings: 6,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '87', name: 'basmati rice', amount: 2, unit: 'cups', category: 'pantry' },
      { id: '88', name: 'chicken', amount: 1, unit: 'lb', category: 'meat' },
      { id: '89', name: 'yogurt', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: '90', name: 'biryani masala', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: '91', name: 'saffron', amount: 1, unit: 'pinch', category: 'pantry' },
      { id: '92', name: 'fried onions', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: '93', name: 'mint leaves', amount: 0.25, unit: 'cup', category: 'produce' }
    ],
    instructions: [
      'Marinate chicken with yogurt and spices for 30 minutes',
      'Partially cook basmati rice with whole spices',
      'Cook marinated chicken until tender',
      'Layer rice and chicken in heavy-bottomed pot',
      'Cook on dum (slow heat) for 45 minutes'
    ],
    nutrition: {
      calories: 520,
      protein: 32,
      carbs: 58,
      fat: 16
    }
  },
  {
    id: '17',
    name: 'Palak Paneer',
    description: 'Creamy spinach curry with soft cottage cheese cubes',
    category: 'dinner',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '94', name: 'fresh spinach', amount: 500, unit: 'g', category: 'produce' },
      { id: '95', name: 'paneer', amount: 200, unit: 'g', category: 'dairy' },
      { id: '96', name: 'onion', amount: 1, unit: 'large', category: 'produce' },
      { id: '97', name: 'tomato', amount: 2, unit: 'medium', category: 'produce' },
      { id: '98', name: 'garam masala', amount: 1, unit: 'tsp', category: 'pantry' },
      { id: '99', name: 'cream', amount: 3, unit: 'tbsp', category: 'dairy' }
    ],
    instructions: [
      'Blanch spinach and blend to smooth puree',
      'Sauté onions until golden, add tomatoes',
      'Add spinach puree and spices',
      'Gently fold in paneer cubes',
      'Finish with cream and simmer 5 minutes'
    ],
    nutrition: {
      calories: 280,
      protein: 18,
      carbs: 12,
      fat: 20
    }
  },
  {
    id: '18',
    name: 'Samosa',
    description: 'Crispy triangular pastries filled with spiced potatoes',
    category: 'snack',
    prepTime: 45,
    cookTime: 20,
    servings: 8,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '100', name: 'all-purpose flour', amount: 2, unit: 'cups', category: 'pantry' },
      { id: '101', name: 'potatoes', amount: 4, unit: 'medium', category: 'produce' },
      { id: '102', name: 'green peas', amount: 0.5, unit: 'cup', category: 'produce' },
      { id: '103', name: 'cumin seeds', amount: 1, unit: 'tsp', category: 'pantry' },
      { id: '104', name: 'coriander seeds', amount: 1, unit: 'tsp', category: 'pantry' },
      { id: '105', name: 'oil for frying', amount: 2, unit: 'cups', category: 'pantry' }
    ],
    instructions: [
      'Make stiff dough with flour, oil, and water',
      'Prepare spiced potato and pea filling',
      'Roll dough into circles, cut in half',
      'Form cones, fill with mixture, seal edges',
      'Deep fry until golden and crispy'
    ],
    nutrition: {
      calories: 180,
      protein: 4,
      carbs: 28,
      fat: 6
    }
  }
];

// Add more diverse recipes for better variety
export const additionalRecipes: Recipe[] = [
  {
    id: '9',
    name: 'Quinoa Buddha Bowl',
    description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing',
    category: 'lunch',
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '49', name: 'quinoa', amount: 1, unit: 'cup', category: 'pantry' },
      { id: '50', name: 'sweet potato', amount: 1, unit: 'large', category: 'produce' },
      { id: '51', name: 'chickpeas', amount: 1, unit: 'can', category: 'pantry' },
      { id: '52', name: 'spinach', amount: 2, unit: 'cups', category: 'produce' },
      { id: '53', name: 'tahini', amount: 3, unit: 'tbsp', category: 'pantry' }
    ],
    instructions: [
      'Cook quinoa according to package directions',
      'Roast cubed sweet potato at 400°F for 20 minutes',
      'Drain and rinse chickpeas',
      'Arrange quinoa, sweet potato, chickpeas, and spinach in bowls',
      'Drizzle with tahini dressing and serve'
    ],
    nutrition: {
      calories: 485,
      protein: 18,
      carbs: 68,
      fat: 16
    }
  },
  {
    id: '10',
    name: 'Grilled Salmon with Asparagus',
    description: 'Perfectly grilled salmon with tender asparagus and lemon',
    category: 'dinner',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '54', name: 'salmon fillets', amount: 4, unit: 'pieces', category: 'meat' },
      { id: '55', name: 'asparagus', amount: 1, unit: 'lb', category: 'produce' },
      { id: '56', name: 'olive oil', amount: 3, unit: 'tbsp', category: 'pantry' },
      { id: '57', name: 'lemon', amount: 1, unit: 'large', category: 'produce' },
      { id: '58', name: 'garlic', amount: 3, unit: 'cloves', category: 'produce' }
    ],
    instructions: [
      'Preheat grill to medium-high heat',
      'Season salmon with salt, pepper, and olive oil',
      'Trim asparagus and toss with oil and garlic',
      'Grill salmon 4-5 minutes per side',
      'Grill asparagus 3-4 minutes until tender',
      'Serve with lemon wedges'
    ],
    nutrition: {
      calories: 320,
      protein: 35,
      carbs: 8,
      fat: 16
    }
  },
  {
    id: '11',
    name: 'Energy Smoothie Bowl',
    description: 'Thick smoothie bowl topped with fresh fruits and granola',
    category: 'breakfast',
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '59', name: 'frozen banana', amount: 1, unit: 'large', category: 'frozen' },
      { id: '60', name: 'frozen berries', amount: 0.5, unit: 'cup', category: 'frozen' },
      { id: '61', name: 'almond milk', amount: 0.25, unit: 'cup', category: 'dairy' },
      { id: '62', name: 'protein powder', amount: 1, unit: 'scoop', category: 'pantry' },
      { id: '63', name: 'granola', amount: 0.25, unit: 'cup', category: 'pantry' }
    ],
    instructions: [
      'Blend frozen banana, berries, almond milk, and protein powder until thick',
      'Pour into a bowl',
      'Top with granola, fresh fruit, and nuts',
      'Serve immediately'
    ],
    nutrition: {
      calories: 380,
      protein: 25,
      carbs: 52,
      fat: 8
    }
  },
  {
    id: '12',
    name: 'Apple Slices with Peanut Butter',
    description: 'Simple and satisfying snack with crisp apples and creamy peanut butter',
    category: 'snack',
    prepTime: 3,
    cookTime: 0,
    servings: 1,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: [
      { id: '64', name: 'apple', amount: 1, unit: 'medium', category: 'produce' },
      { id: '65', name: 'peanut butter', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: '66', name: 'cinnamon', amount: 1, unit: 'pinch', category: 'pantry' }
    ],
    instructions: [
      'Wash and core the apple',
      'Cut into thin slices',
      'Serve with peanut butter for dipping',
      'Sprinkle with cinnamon if desired'
    ],
    nutrition: {
      calories: 270,
      protein: 8,
      carbs: 25,
      fat: 16
    }
  }
];