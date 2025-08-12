# 🍽️ MealPlan Pro

A smart meal planning application with AI-powered recipe recommendations built with React, TypeScript, and Machine Learning.

## ✨ Features

- 🤖 **AI Recipe Recommendations** - 2-algorithm ML system (Content-Based + Collaborative Filtering)
- 📅 **Smart Meal Planning** - Weekly meal scheduling with calendar view
- 🛒 **Auto Grocery Lists** - Generate shopping lists from meal plans
- 🔍 **Recipe Library** - Add, edit, and organize your recipes
- 👤 **User Profiles** - Dietary preferences and restrictions
- 💬 **Help Chatbot** - Interactive assistance
- 📱 **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Storage**: Browser Local Storage
- **ML**: Custom 2-algorithm recommendation engine

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd mealplan-pro
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🤖 Machine Learning System

### 2-Algorithm Ensemble
```
Final Score = Content-Based (60%) + Collaborative (40%)
```

**Algorithm 1: Content-Based Filtering**
- Personal preference matching
- Dietary restriction compliance
- Cuisine preference alignment
- Cooking time optimization

**Algorithm 2: Collaborative Filtering**
- Community-driven recommendations
- Popularity scoring
- Skill level matching
- Seasonal ingredient promotion

## 🔥 Firebase Deployment

1. **Build the project**
```bash
npm run build
```

2. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

3. **Initialize Firebase**
```bash
firebase login
firebase init hosting
```

4. **Deploy**
```bash
firebase deploy
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard components
│   └── ...
├── data/               # Sample data
├── hooks/              # Custom React hooks
├── types/              # TypeScript interfaces
├── utils/              # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🎯 Key Features

- **Authentication**: Login/Register with demo mode
- **ML Recommendations**: Smart recipe suggestions
- **Meal Planning**: Weekly calendar with drag-drop
- **Grocery Lists**: Auto-generated from meal plans
- **Recipe Management**: CRUD operations for recipes
- **User Preferences**: Dietary restrictions and preferences
- **Help System**: Interactive chatbot assistance

## 📱 Demo

The app includes demo authentication - use any email/password to login and explore all features.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for beautiful styling
- Lucide for clean icons
- Vite for fast development experience