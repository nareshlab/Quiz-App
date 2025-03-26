import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { QuizResult } from '@/types/quiz';
import { quizzes } from '@/data/quizzes';

export default function ResultsScreen() {
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from storage or API
    const mockResults: QuizResult[] = [
      {
        quizId: 1,
        correctAnswers: 4,
        totalQuestions: 5,
        date: new Date().toISOString(),
      },
      {
        quizId: 2,
        correctAnswers: 3,
        totalQuestions: 5,
        date: new Date().toISOString(),
      },
    ];
    setResults(mockResults);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Quiz Results</Text>
      {results.map((result) => {
        const quiz = quizzes.find((q) => q.id === result.quizId);
        const percentage = (result.correctAnswers / result.totalQuestions) * 100;
        
        return (
          <View key={`${result.quizId}-${result.date}`} style={styles.resultCard}>
            <Text style={styles.quizTitle}>{quiz?.title}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{result.correctAnswers}</Text>
                <Text style={styles.statLabel}>Correct</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {result.totalQuestions - result.correctAnswers}
                </Text>
                <Text style={styles.statLabel}>Incorrect</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{percentage.toFixed(0)}%</Text>
                <Text style={styles.statLabel}>Score</Text>
              </View>
            </View>
            <Text style={styles.date}>
              {new Date(result.date).toLocaleDateString()}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
    color: '#1f2937',
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quizTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
    fontFamily: 'Inter-Regular',
  },
});