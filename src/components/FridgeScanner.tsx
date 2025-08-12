import React, { useState, useEffect } from 'react';
import { Camera, X, Scan, Sparkles, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Recipe } from '../types';

interface FridgeScannerProps {
  recipes: Recipe[];
  onClose: () => void;
  onRecipeSelect: (recipe: Recipe) => void;
}

interface DetectedIngredient {
  name: string;
  confidence: number;
  category: string;
}

export function FridgeScanner({ recipes, onClose, onRecipeSelect }: FridgeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState<DetectedIngredient[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [scanStep, setScanStep] = useState<'camera' | 'analyzing' | 'results'>('camera');

  // Dummy fridge image - a realistic fridge photo
  const dummyFridgeImage = 'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=800';

  const startDummyScan = () => {
    setScanStep('analyzing');
    analyzeImage();
  };

  const analyzeImage = async () => {
    setIsScanning(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Dummy detection specifically for Chicken Alfredo Pasta ingredients
    const mockDetectedIngredients: DetectedIngredient[] = [
      { name: 'fettuccine pasta', confidence: 94, category: 'pantry' },
      { name: 'chicken breast', confidence: 91, category: 'meat' },
      { name: 'heavy cream', confidence: 89, category: 'dairy' },
      { name: 'parmesan cheese', confidence: 93, category: 'dairy' },
      { name: 'butter', confidence: 87, category: 'dairy' },
      { name: 'garlic', confidence: 92, category: 'produce' },
      { name: 'olive oil', confidence: 85, category: 'pantry' },
      { name: 'eggs', confidence: 88, category: 'dairy' },
      { name: 'milk', confidence: 86, category: 'dairy' },
      { name: 'onion', confidence: 84, category: 'produce' },
      { name: 'tomatoes', confidence: 90, category: 'produce' },
      { name: 'bell peppers', confidence: 87, category: 'produce' },
      { name: 'carrots', confidence: 83, category: 'produce' },
      { name: 'spinach', confidence: 89, category: 'produce' }
    ];

    setDetectedIngredients(mockDetectedIngredients);
    
    // Find recipes that match detected ingredients
    const matchingRecipes = findMatchingRecipes(mockDetectedIngredients);
    setRecommendedRecipes(matchingRecipes);
    
    setIsScanning(false);
    setScanStep('results');
  };

  const findMatchingRecipes = (ingredients: DetectedIngredient[]): Recipe[] => {
    const ingredientNames = ingredients.map(ing => ing.name.toLowerCase());
    
    return recipes
      .map(recipe => {
        const matchingIngredients = recipe.ingredients.filter(recipeIng =>
          ingredientNames.some(detectedIng => 
            recipeIng.name.toLowerCase().includes(detectedIng) ||
            detectedIng.includes(recipeIng.name.toLowerCase())
          )
        );
        
        const matchPercentage = (matchingIngredients.length / recipe.ingredients.length) * 100;
        
        return {
          recipe,
          matchPercentage,
          matchingIngredients: matchingIngredients.length,
          totalIngredients: recipe.ingredients.length
        };
      })
      .filter(item => item.matchPercentage >= 30) // At least 30% ingredient match
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 6)
      .map(item => item.recipe);
  };

  const retakeScan = () => {
    setDetectedIngredients([]);
    setRecommendedRecipes([]);
    setScanStep('camera');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-2 rounded-lg">
              <Scan className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Smart Fridge Scanner</h3>
              <p className="text-sm text-gray-600">
                {scanStep === 'camera' && 'Demo: Scan your fridge contents'}
                {scanStep === 'analyzing' && 'Analyzing ingredients...'}
                {scanStep === 'results' && 'Recipe recommendations based on your ingredients'}
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

        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {scanStep === 'camera' && (
            <div className="space-y-6">
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
                <img 
                  src={dummyFridgeImage}
                  alt="Demo fridge contents"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 border-4 border-dashed border-white/50 m-8 rounded-xl flex items-center justify-center">
                  <div className="text-white text-center bg-black bg-opacity-50 p-6 rounded-xl">
                    <Camera className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-lg font-medium">Demo Fridge Contents</p>
                    <p className="text-sm opacity-90">This is a sample fridge scan for demonstration</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 p-1 rounded-full">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Demo Mode</h4>
                    <p className="text-blue-700 text-sm">
                      This is a demonstration of the fridge scanner. Click "Scan Demo Fridge" to see how 
                      the AI would detect ingredients and recommend recipes based on what's available.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={startDummyScan}
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-600 hover:to-blue-700 transition-all font-medium text-lg shadow-lg"
                >
                  <Scan className="h-5 w-5 inline mr-2" />
                  Scan Demo Fridge
                </button>
              </div>
            </div>
          )}

          {scanStep === 'analyzing' && (
            <div className="text-center py-16">
              <div className="relative mb-8">
                <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-600 rounded-full animate-spin border-t-transparent mx-auto"></div>
              </div>
              
              <div className="mb-6">
                <img 
                  src={dummyFridgeImage} 
                  alt="Analyzing fridge contents"
                  className="w-64 h-48 object-cover rounded-xl mx-auto shadow-lg"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Fridge</h3>
              <p className="text-gray-600 mb-4">AI is identifying ingredients and finding matching recipes...</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Detecting ingredients</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                  <span>Matching with recipes</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
                  <span>Calculating compatibility</span>
                </div>
              </div>
            </div>
          )}

          {scanStep === 'results' && (
            <div className="space-y-8">
              {/* Detected Ingredients */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Detected Ingredients</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {detectedIngredients.length} items found
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {detectedIngredients.map((ingredient, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-green-200/50 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 capitalize">{ingredient.name}</span>
                        <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full">{ingredient.confidence}%</span>
                      </div>
                      <span className="text-xs text-gray-500 capitalize">{ingredient.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recipe Recommendations */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Recommended Recipes</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {recommendedRecipes.length} matches found
                    </span>
                  </div>
                  <button
                    onClick={retakeScan}
                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span className="text-sm">Scan Again</span>
                  </button>
                </div>

                {recommendedRecipes.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No matching recipes found</p>
                    <p className="text-gray-500 text-sm mt-1">Try adding more recipes to your library</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendedRecipes.map((recipe, index) => (
                      <div
                        key={recipe.id}
                        onClick={() => onRecipeSelect(recipe)}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer relative"
                      >
                        {index === 0 && (
                          <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg z-10">
                            BEST MATCH
                          </div>
                        )}
                        
                        {recipe.image && (
                          <div className="relative h-40 overflow-hidden">
                            <img 
                              src={recipe.image} 
                              alt={recipe.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              ✓ AVAILABLE
                            </div>
                            {recipe.nutrition && (
                              <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-sm font-medium">
                                {recipe.nutrition.calories} cal
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{recipe.name}</h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
                          
                          <div className="flex items-center justify-between text-sm mb-3">
                            <span className="text-gray-500">⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                            <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full text-xs">
                              🍳 READY TO COOK
                            </span>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="text-xs text-green-800 font-medium mb-1">Available ingredients:</div>
                            <div className="text-xs text-green-700">
                              {recipe.ingredients.slice(0, 4).map(ing => ing.name).join(', ')}
                              {recipe.ingredients.length > 4 && ` +${recipe.ingredients.length - 4} more`}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}