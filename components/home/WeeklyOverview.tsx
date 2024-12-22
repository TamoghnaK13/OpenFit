import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/utils/ThemeContext';

interface WeeklyOverviewProps {
  progress: {
    workoutsPlanned: number;
    workoutsCompleted: number;
    currentStreak: number;
  };
}

export default function WeeklyOverview({ progress }: WeeklyOverviewProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.weeklySection}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Overview</Text>
      <View style={[styles.weeklyCard, { 
        backgroundColor: colors.surface,
        shadowColor: colors.text 
      }]}>
        <View style={styles.weeklyProgressRow}>
          <Text style={[styles.weeklyLabel, { color: colors.text }]}>Workout Progress</Text>
          <Text style={[styles.weeklyStats, { color: colors.text }]}>
            {progress.workoutsCompleted}/{progress.workoutsPlanned}
          </Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${(progress.workoutsCompleted / progress.workoutsPlanned) * 100}%`,
                backgroundColor: colors.primary 
              }
            ]} 
          />
        </View>
        <View style={styles.streakContainer}>
          <Ionicons name="flame" size={20} color={colors.primary} />
          <Text style={[styles.streakText, { color: colors.text }]}>
            {progress.currentStreak} Day Streak!
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weeklySection: {
    padding: 20,
  },
  weeklyCard: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  weeklyProgressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  weeklyLabel: {
    fontSize: 16,
  },
  weeklyStats: {
    fontSize: 16,
    fontWeight: "600",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  streakText: {
    fontSize: 16,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
}); 