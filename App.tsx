import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Recipe, MealPlan, GroceryItem, UserPreferences } from './types';
import { sampleRecipes } from './data/sampleRecipes';
import { LoginForm } from './components/Auth/LoginForm';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { MealPlanner } from './components/MealPlanner';
import { RecipeLibrary } from './components/RecipeLibrary';
import { GroceryList } from './components/GroceryList';
import { UserProfile } from './components/UserProfile';
import { HelpChatbot } from './components/HelpChatbot';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('recipes', sampleRecipes);
  const [mealPlans, setMealPlans] = useLocalStorage<MealPlan[]>('mealPlans', []);
  const [groceryList, setGroceryList] = useLocalStorage<GroceryItem[]>('groceryList', []);
  const [userPreferences, setUserPreferences] = useLocalStorage<UserPreferences>('userPreferences', {
    dietaryRestrictions: [],
    allergies: [],
    cuisinePreferences: ['Italian', 'American'],
    cookingTime: 'medium',
    skillLevel: 'intermediate',
    servingSize: 4,
  });
  const [showChatbot, setShowChatbot] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Demo authentication - accept any email/password
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <LoginForm
        onLogin={handleLogin}
        onToggleMode={() => setIsLoginMode(!isLoginMode)}
        isLogin={isLoginMode}
      />
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            mealPlans={mealPlans}
            onNavigateToPlanner={() => setCurrentView('planner')}
            onNavigateToRecipes={() => setCurrentView('recipes')}
            onNavigateToGrocery={() => setCurrentView('grocery')}
          />
        );
      case 'planner':
        return (
          <MealPlanner
            recipes={recipes}
            mealPlans={mealPlans}
            onMealPlansChange={setMealPlans}
            onGenerateGroceryList={setGroceryList}
            userPreferences={userPreferences}
          />
        );
      case 'recipes':
        return (
          <RecipeLibrary
            recipes={recipes}
            onRecipesChange={setRecipes}
          />
        );
      case 'grocery':
        return (
          <GroceryList
            groceryList={groceryList}
            onGroceryListChange={setGroceryList}
          />
        );
      case 'profile':
        return (
          <UserProfile
            profile={{
              id: '1',
              name: 'Alex Johnson',
              email: 'alex.johnson@email.com',
              joinDate: '2024-01-01',
              achievements: ['first-recipe', 'week-planner']
            }}
            onProfileUpdate={() => {}}
            preferences={userPreferences}
            onPreferencesChange={setUserPreferences}
          />
        );
      default:
        return <Dashboard mealPlans={mealPlans} onNavigateToPlanner={() => setCurrentView('planner')} onNavigateToRecipes={() => setCurrentView('recipes')} onNavigateToGrocery={() => setCurrentView('grocery')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-200 to-transparent rounded-full blur-3xl transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-purple-200 to-transparent rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>
      
      <Header currentView={currentView} onViewChange={setCurrentView} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {renderView()}
      </main>
      
      <HelpChatbot 
        isOpen={showChatbot} 
        onToggle={() => setShowChatbot(!showChatbot)} 
      />
    </div>
  );
}

export default App;