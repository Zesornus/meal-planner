import React from 'react';
import { Calendar, Book, ShoppingCart, User, LogOut } from 'lucide-react';

interface HeaderProps {
  currentView: 'planner' | 'recipes' | 'grocery' | 'preferences' | 'profile';
  onViewChange: (view: 'planner' | 'recipes' | 'grocery' | 'preferences' | 'profile') => void;
  onLogout: () => void;
}

export function Header({ currentView, onViewChange, onLogout }: HeaderProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'planner', label: 'Plan', icon: Calendar },
    { id: 'recipes', label: 'Recipes', icon: Book },
    { id: 'grocery', label: 'Shopping', icon: ShoppingCart },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100/50 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MealPlan Pro
            </h1>
          </div>
          
          <nav className="flex items-center space-x-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onViewChange(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}