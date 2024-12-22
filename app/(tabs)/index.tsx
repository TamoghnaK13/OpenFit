// app/(tabs)/index.tsx
import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { useTheme } from '@/contexts/ThemeContext';
import WelcomeSection from "../../components/home/WelcomeSection";
import QuickStartSection from "../../components/home/QuickStartSection";
import TodayStats from "../../components/home/TodayStats";
import WeeklyOverview from "../../components/home/WeeklyOverview";
import QuickActions from "../../components/home/QuickActions";
import AchievementsModal from "../../components/AchievementsModal";

export default function Home() {
  const [achievementsVisible, setAchievementsVisible] = useState(false);
  const { colors } = useTheme();

  const todayStats = {
    caloriesBurned: 324,
    workoutsCompleted: 1,
    minutesWorked: 45,
  };

  const weeklyProgress = {
    workoutsPlanned: 5,
    workoutsCompleted: 3,
    currentStreak: 3,
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <WelcomeSection />
      <QuickStartSection />
      <TodayStats stats={todayStats} />
      <WeeklyOverview progress={weeklyProgress} />
      <QuickActions onAchievementsPress={() => setAchievementsVisible(true)} />
      
      <AchievementsModal 
        visible={achievementsVisible}
        onClose={() => setAchievementsVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});