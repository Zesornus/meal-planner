import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { Save, User, Clock, ChefHat, Heart, AlertTriangle, Globe } from 'lucide-react';

interface PreferencesViewProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

export function PreferencesView({ preferences, onPreferencesChange }: PreferencesViewProps) {
  const [formData, setFormData] = useState(preferences);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onPreferencesChange(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 
    'Low-Carb', 'Low-Fat', 'Mediterranean', 'Pescatarian'
  ];

  const allergyOptions = [
    'Nuts', 'Peanuts', 'Shellfish', 'Fish', 'Eggs', 'Dairy', 'Soy', 
    'Wheat/Gluten', 'Sesame', 'Sulfites'
  ];

  const cuisineOptions = [
    'Italian', 'Mexican', 'Asian', 'Indian', 'Mediterranean', 'American',
    'French', 'Thai', 'Japanese', 'Chinese', 'Greek', 'Middle Eastern'
  ];

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600 mb-6">Customize your meal planning experience</p>
        <button
          onClick={handleSave}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            saved 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <Save className="h-4 w-4" />
          <span>{saved ? 'Saved!' : 'Save Preferences'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Dietary Restrictions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold text-gray-900">Dietary Preferences</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {dietaryOptions.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dietaryRestrictions.includes(option)}
                  onChange={() => setFormData({
                    ...formData,
                    dietaryRestrictions: toggleArrayItem(formData.dietaryRestrictions, option)
                  })}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold text-gray-900">Allergies & Restrictions</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {allergyOptions.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allergies.includes(option)}
                  onChange={() => setFormData({
                    ...formData,
                    allergies: toggleArrayItem(formData.allergies, option)
                  })}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cuisine Preferences */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900">Favorite Cuisines</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {cuisineOptions.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.cuisinePreferences.includes(option)}
                  onChange={() => setFormData({
                    ...formData,
                    cuisinePreferences: toggleArrayItem(formData.cuisinePreferences, option)
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cooking Preferences */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ChefHat className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold text-gray-900">Cooking Preferences</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Preferred Cooking Time
              </label>
              <select
                value={formData.cookingTime}
                onChange={(e) => setFormData({
                  ...formData,
                  cookingTime: e.target.value as UserPreferences['cookingTime']
                })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="quick">Quick (Under 30 min)</option>
                <option value="medium">Medium (30-60 min)</option>
                <option value="long">Long (60+ min)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ChefHat className="h-4 w-4 inline mr-1" />
                Cooking Skill Level
              </label>
              <select
                value={formData.skillLevel}
                onChange={(e) => setFormData({
                  ...formData,
                  skillLevel: e.target.value as UserPreferences['skillLevel']
                })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Serving Size
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={formData.servingSize}
                onChange={(e) => setFormData({
                  ...formData,
                  servingSize: parseInt(e.target.value) || 4
                })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 max-w-4xl mx-auto">
        <div className="flex items-start space-x-3">
          <ChefHat className="h-5 w-5 text-blue-500 mt-1" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">How AI Recommendations Work</h4>
            <p className="text-blue-700 text-sm leading-relaxed">
              Our AI analyzes your preferences, dietary restrictions, cooking history, and seasonal ingredients 
              to suggest personalized meals. The more you use the app and update your preferences, the better 
              the recommendations become. Each suggestion includes a match score and reasons why it's perfect for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}