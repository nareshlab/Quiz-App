import { Tabs } from 'expo-router';
import { Brain, Trophy } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#6366f1',
        tabBarStyle: Platform.select({
          web: {
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Quizzes',
          tabBarIcon: ({ size, color }) => <Brain size={size} color={color} />,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontFamily: 'Inter-Bold',
            color: '#1f2937',
          },
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Results',
          tabBarIcon: ({ size, color }) => <Trophy size={size} color={color} />,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontFamily: 'Inter-Bold',
            color: '#1f2937',
          },
        }}
      />
    </Tabs>
  );
}