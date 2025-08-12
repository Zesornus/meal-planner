import React, { useState } from 'react';
import { GroceryItem } from '../types';
import { Check, Plus, Trash2, ShoppingCart, Search } from 'lucide-react';

interface GroceryListProps {
  groceryList: GroceryItem[];
  onGroceryListChange: (groceryList: GroceryItem[]) => void;
}

// Simple dummy data for demonstration
const dummyItems: GroceryItem[] = [
  { id: '1', name: 'Milk', amount: 1, unit: 'gallon', category: 'dairy', completed: false },
  { id: '2', name: 'Bread', amount: 1, unit: 'loaf', category: 'bakery', completed: true },
  { id: '3', name: 'Eggs', amount: 12, unit: 'count', category: 'dairy', completed: false },
  { id: '4', name: 'Bananas', amount: 6, unit: 'count', category: 'produce', completed: false },
  { id: '5', name: 'Chicken Breast', amount: 2, unit: 'lbs', category: 'meat', completed: true },
  { id: '6', name: 'Rice', amount: 1, unit: 'bag', category: 'pantry', completed: false },
  { id: '7', name: 'Tomatoes', amount: 4, unit: 'count', category: 'produce', completed: false },
  { id: '8', name: 'Cheese', amount: 1, unit: 'block', category: 'dairy', completed: false },
];

export function GroceryList({ groceryList, onGroceryListChange }: GroceryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDummyData, setShowDummyData] = useState(groceryList.length === 0);

  const handleLoadDummyData = () => {
    onGroceryListChange(dummyItems);
    setShowDummyData(false);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: searchTerm.trim(),
      amount: 1,
      unit: 'item',
      category: 'other',
      completed: false,
    };

    onGroceryListChange([...groceryList, newItem]);
    setSearchTerm('');
  };

  const handleToggleItem = (itemId: string) => {
    const updatedList = groceryList.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    onGroceryListChange(updatedList);
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedList = groceryList.filter(item => item.id !== itemId);
    onGroceryListChange(updatedList);
  };

  const completedCount = groceryList.filter(item => item.completed).length;
  const totalCount = groceryList.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Shopping List</h2>
        <p className="text-gray-600">Add items you need to buy</p>
      </div>

      {/* Add Item Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleAddItem} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Add item to shopping list..."
              className="w-full pl-12 pr-16 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{completedCount}/{totalCount} items</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping List */}
      {totalCount === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your shopping list is empty</h3>
            <p className="text-gray-600 mb-6">Start adding items using the search bar above</p>
            
            {showDummyData && (
              <button
                onClick={handleLoadDummyData}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Load Sample Items
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {groceryList.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center space-x-4 p-4 transition-all ${
                    item.completed ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <button
                    onClick={() => handleToggleItem(item.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      item.completed
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {item.completed && <Check className="h-4 w-4 text-white" />}
                  </button>
                  
                  <div className="flex-1">
                    <span className={`font-medium ${
                      item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {item.name}
                    </span>
                    {item.amount > 1 && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({item.amount} {item.unit})
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}