import { Quiz } from '@/types/quiz';

export const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'World Geography',
    description: 'Test your knowledge about countries and capitals',
    questions: [
      {
        id: 1,
        text: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'Which is the largest continent by area?',
        options: ['North America', 'Africa', 'Europe', 'Asia'],
        correctAnswer: 3,
      },
      {
        id: 3,
        text: 'Which country is known as the Land of the Rising Sun?',
        options: ['China', 'Japan', 'Thailand', 'Vietnam'],
        correctAnswer: 1,
      },
      {
        id: 4,
        text: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'Which is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'Science Basics',
    description: 'Test your knowledge of basic scientific concepts',
    questions: [
      {
        id: 1,
        text: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Fe', 'Au', 'Cu'],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: 'What is the hardest natural substance on Earth?',
        options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What is the largest organ in the human body?',
        options: ['Heart', 'Brain', 'Liver', 'Skin'],
        correctAnswer: 3,
      },
      {
        id: 5,
        text: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctAnswer: 1,
      },
    ],
  },
];