import React from 'react';
import { Flame, Zap, Target, Droplets } from 'lucide-react';

interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealsPlanned: number;
  totalMeals: number;
}

interface StatsGridProps {
  nutrition: NutritionSummary;
}

export function StatsGrid({ nutrition }: StatsGridProps) {
  const goals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-blue-500';
    if (percentage >= 70) return 'bg-indigo-500';
    if (percentage >= 50) return 'bg-purple-500';
    return 'bg-gray-300';
  };

  const quickStats = [
    {
      label: 'Today\'s Calories',
      value: nutrition.calories,
      goal: goals.calories,
      icon: Flame,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      unit: 'kcal'
    },
    {
      label: 'Protein',
      value: nutrition.protein,
      goal: goals.protein,
      icon: Zap,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      unit: 'g'
    },
    {
      label: 'Carbs',
      value: nutrition.carbs,
      goal: goals.carbs,
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      unit: 'g'
    },
    {
      label: 'Fat',
      value: nutrition.fat,
      goal: goals.fat,
      icon: Droplets,
      color: 'text-violet-500',
      bgColor: 'bg-violet-50',
      unit: 'g'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickStats.map((stat, index) => {
        const percentage = getProgressPercentage(stat.value, stat.goal);
        return (
          <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6 hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">/ {stat.goal} {stat.unit}</div>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{stat.label}</span>
                <span>{Math.round(percentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${getProgressColor(percentage)}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}