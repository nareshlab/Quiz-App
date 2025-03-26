import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { quizzes } from '@/data/quizzes';
import { Check, X } from 'lucide-react-native';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInRight, 
  SlideOutLeft,
  withSpring,
  useAnimatedStyle,
  withSequence,
  withTiming,
  useSharedValue
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const quiz = quizzes.find((q) => q.id === parseInt(id));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Animation values
  const buttonScale = useSharedValue(1);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withSpring(((currentQuestionIndex + 1) / quiz!.questions.length));
  }, [currentQuestionIndex]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );

    return () => backHandler.remove();
  }, []);

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text>Quiz not found</Text>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionPress = (optionIndex: number) => {
    if (!isAnswerChecked) {
      setSelectedOption(optionIndex);
      // Trigger button animation
      buttonScale.value = withSequence(
        withTiming(1.1, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
    }
  };

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      router.replace('/results');
    }
  };

  const getOptionStyle = (optionIndex: number) => {
    if (!isAnswerChecked) {
      return optionIndex === selectedOption ? styles.selectedOption : styles.option;
    }

    if (optionIndex === currentQuestion.correctAnswer) {
      return styles.correctOption;
    }

    if (optionIndex === selectedOption && selectedOption !== currentQuestion.correctAnswer) {
      return styles.incorrectOption;
    }

    return styles.option;
  };

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(500)}
        style={styles.header}>
        <Text style={styles.questionCount}>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </Text>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
      </Animated.View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <AnimatedTouchableOpacity
            key={index}
            entering={SlideInRight.delay(index * 100)}
            exiting={SlideOutLeft}
            style={[getOptionStyle(index), styles.optionShadow]}
            onPress={() => handleOptionPress(index)}
            disabled={isAnswerChecked}>
            <Text
              style={[
                styles.optionText,
                isAnswerChecked &&
                  index === currentQuestion.correctAnswer &&
                  styles.correctOptionText,
                isAnswerChecked &&
                  index === selectedOption &&
                  index !== currentQuestion.correctAnswer &&
                  styles.incorrectOptionText,
              ]}>
              {option}
            </Text>
            {isAnswerChecked && index === currentQuestion.correctAnswer && (
              <Animated.View entering={FadeIn.duration(300)}>
                <Check color="#22c55e" size={24} />
              </Animated.View>
            )}
            {isAnswerChecked &&
              index === selectedOption &&
              index !== currentQuestion.correctAnswer && (
                <Animated.View entering={FadeIn.duration(300)}>
                  <X color="#ef4444" size={24} />
                </Animated.View>
              )}
          </AnimatedTouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        {!isAnswerChecked ? (
          <TouchableOpacity
            style={[styles.button, selectedOption === null && styles.buttonDisabled]}
            onPress={handleCheckAnswer}
            disabled={selectedOption === null}>
            <Text style={[
              styles.buttonText,
              selectedOption === null && styles.buttonTextDisabled
            ]}>
              Check Answer
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.button, styles.nextButton]} 
            onPress={handleNextQuestion}>
            <Text style={styles.buttonText}>
              {currentQuestionIndex === quiz.questions.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressBarStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  header: {
    marginBottom: 32,
  },
  questionCount: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 28,
    marginBottom: 32,
    color: '#1f2937',
    fontFamily: 'Inter-Bold',
    lineHeight: 36,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  option: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  optionShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  selectedOption: {
    backgroundColor: '#f0f0ff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  correctOption: {
    backgroundColor: '#f0fdf4',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  incorrectOption: {
    backgroundColor: '#fef2f2',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  optionText: {
    fontSize: 18,
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
    fontFamily: 'Inter-Regular',
  },
  correctOptionText: {
    color: '#22c55e',
    fontFamily: 'Inter-Bold',
  },
  incorrectOptionText: {
    color: '#ef4444',
    fontFamily: 'Inter-Bold',
  },
  buttonContainer: {
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#6366f1',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 4px 6px rgba(99,102,241,0.3)',
      },
    }),
  },
  nextButton: {
    backgroundColor: '#22c55e',
  },
  buttonDisabled: {
    backgroundColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
      },
      web: {
        boxShadow: 'none',
      },
    }),
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  buttonTextDisabled: {
    color: '#9ca3af',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
});