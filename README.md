# Quiz Game

A beautiful and interactive quiz application built with React Native and Expo, optimized for web. Test your knowledge with various quizzes and track your progress!

![Quiz Game Screenshot](https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)

## Features

- 📱 Responsive design that works on both desktop and mobile browsers
- 🎯 Multiple choice questions with immediate feedback
- ✨ Beautiful animations and transitions
- 📊 Track your quiz results and progress
- 🎨 Modern and clean user interface
- 🔍 Interactive question navigation
- 📈 Results summary and statistics

## Tech Stack

- [Expo](https://expo.dev/) - Development platform
- [React Native](https://reactnative.dev/) - Core framework
- [Expo Router](https://docs.expo.dev/routing/introduction/) - Navigation
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animations
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Google Fonts](https://fonts.google.com/) - Typography

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (v9 or newer)

## Getting Started

Follow these steps to get the project running locally:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quiz-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   - The development server will start and open your default browser
   - If it doesn't open automatically, visit: `http://localhost:8081`

## Project Structure

```
quiz-game/
├── app/                    # Application routes
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── _layout.tsx    # Tab navigation configuration
│   │   ├── index.tsx      # Quizzes list screen
│   │   └── results.tsx    # Results screen
│   ├── quiz/              # Quiz routes
│   │   └── [id].tsx       # Individual quiz screen
│   └── _layout.tsx        # Root layout configuration
├── assets/                # Static assets
│   └── images/           
├── components/            # Reusable components
├── data/                  # Mock data and constants
│   └── quizzes.ts        # Quiz questions and answers
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── package.json          # Project dependencies
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build:web` - Build the web application for production
- `npm run lint` - Run ESLint to check code quality

## Building for Production

To create a production build:

1. **Build the web application**
   ```bash
   npm run build:web
   ```

2. The build output will be in the `web-build` directory, ready for deployment.

## Development Guidelines

- Use `StyleSheet.create` for styling components
- Follow the established file structure
- Maintain type safety with TypeScript
- Use the Lucide icon library for consistency
- Implement proper error handling
- Follow React Native best practices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
