import React, { useState } from 'react';
import { User, Calendar, Trophy, Flame, Heart, Edit2, Camera, Book, Save, Clock, ChefHat, AlertTriangle, Globe } from 'lucide-react';
import { UserPreferences } from '../types';

// Simplified profile interface to avoid complex dependencies
interface SimpleUserProfile {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  achievements: string[];
}

interface UserProfileProps {
  profile: SimpleUserProfile;
  onProfileUpdate: (profile: SimpleUserProfile) => void;
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

export function UserProfile({ profile, onProfileUpdate, preferences, onPreferencesChange }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: profile.name,
    email: profile.email,
  });
  const [preferencesData, setPreferencesData] = useState(preferences);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onProfileUpdate({
      ...profile,
      name: editData.name,
      email: editData.email,
    });
    setIsEditing(false);
  };

  const handleSavePreferences = () => {
    onPreferencesChange(preferencesData);
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

  // Static achievements to avoid dependency issues
  const achievements = [
    { id: 'first-recipe', name: 'Recipe Creator', description: 'Added your first recipe', icon: '📝' },
    { id: 'week-planner', name: 'Week Planner', description: 'Planned a full week of meals', icon: '📅' },
    { id: 'healthy-eater', name: 'Healthy Eater', description: 'Planned 10 healthy meals', icon: '🥗' },
    { id: 'cooking-streak', name: 'Cooking Streak', description: '7 days of meal planning', icon: '🔥' },
  ];

  // Static stats to avoid calculation issues
  const stats = [
    { label: 'Recipes Added', value: 18, icon: Book },
    { label: 'Meals Planned', value: 12, icon: Calendar },
    { label: 'Cooking Streak', value: '5 days', icon: Flame },
    { label: 'Favorites', value: 3, icon: Heart },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Profile & Settings</h2>
        <p className="text-gray-600">Manage your account and customize your meal planning experience</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-8">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-12 w-12 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200/50 hover:bg-white hover:scale-110 transition-all">
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full md:w-auto"
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full md:w-auto"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-600 mb-2">{profile.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(profile.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6 text-center hover:scale-105 transition-all">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-full shadow-md">
                <stat.icon className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Preferences Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Meal Planning Preferences</h3>
          <button
            onClick={handleSavePreferences}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              saved 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <Save className="h-4 w-4" />
            <span>{saved ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dietary Restrictions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-5 w-5 text-green-500" />
              <h4 className="font-semibold text-gray-900">Dietary Preferences</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {dietaryOptions.map(option => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferencesData.dietaryRestrictions.includes(option)}
                    onChange={() => setPreferencesData({
                      ...preferencesData,
                      dietaryRestrictions: toggleArrayItem(preferencesData.dietaryRestrictions, option)
                    })}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h4 className="font-semibold text-gray-900">Allergies & Restrictions</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {allergyOptions.map(option => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferencesData.allergies.includes(option)}
                    onChange={() => setPreferencesData({
                      ...preferencesData,
                      allergies: toggleArrayItem(preferencesData.allergies, option)
                    })}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cuisine Preferences */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-5 w-5 text-blue-500" />
              <h4 className="font-semibold text-gray-900">Favorite Cuisines</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {cuisineOptions.map(option => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferencesData.cuisinePreferences.includes(option)}
                    onChange={() => setPreferencesData({
                      ...preferencesData,
                      cuisinePreferences: toggleArrayItem(preferencesData.cuisinePreferences, option)
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cooking Preferences */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-5 w-5 text-purple-500" />
              <h4 className="font-semibold text-gray-900">Cooking Preferences</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Preferred Cooking Time
                </label>
                <select
                  value={preferencesData.cookingTime}
                  onChange={(e) => setPreferencesData({
                    ...preferencesData,
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
                  value={preferencesData.skillLevel}
                  onChange={(e) => setPreferencesData({
                    ...preferencesData,
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
                  value={preferencesData.servingSize}
                  onChange={(e) => setPreferencesData({
                    ...preferencesData,
                    servingSize: parseInt(e.target.value) || 4
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold text-gray-900">Achievements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                profile.achievements.includes(achievement.id)
                  ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-md'
                  : 'border-gray-200 bg-gray-50/80 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h4 className={`font-medium ${
                    profile.achievements.includes(achievement.id) ? 'text-yellow-800' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-sm ${
                    profile.achievements.includes(achievement.id) ? 'text-yellow-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {profile.achievements.includes(achievement.id) && (
                  <div className="ml-auto">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Info */}
      <div className="bg-blue-50/90 backdrop-blur-sm border border-blue-100 rounded-2xl p-6">
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

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-emerald-50/90 to-blue-50/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left">
            <div className="text-emerald-600 mb-2">📝</div>
            <div className="font-medium text-gray-900">Add Recipe</div>
            <div className="text-sm text-gray-600">Create a new recipe</div>
          </button>
          <button className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left">
            <div className="text-blue-600 mb-2">📅</div>
            <div className="font-medium text-gray-900">Plan Week</div>
            <div className="text-sm text-gray-600">Plan your weekly meals</div>
          </button>
          <button className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left">
            <div className="text-purple-600 mb-2">🛒</div>
            <div className="font-medium text-gray-900">Shopping List</div>
            <div className="text-sm text-gray-600">Generate grocery list</div>
          </button>
        </div>
      </div>
    </div>
  );
}