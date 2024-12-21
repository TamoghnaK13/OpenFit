import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface WeeklyOverviewProps {
  progress: {
    workoutsPlanned: number;
    workoutsCompleted: number;
    currentStreak: number;
  };
}

export default function WeeklyOverview({ progress }: WeeklyOverviewProps) {
  return (
    <View style={styles.weeklySection}>
      <Text style={styles.sectionTitle}>Weekly Overview</Text>
      <View style={styles.weeklyCard}>
        <View style={styles.weeklyProgressRow}>
          <Text style={styles.weeklyLabel}>Workout Progress</Text>
          <Text style={styles.weeklyStats}>
            {progress.workoutsCompleted}/{progress.workoutsPlanned}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(progress.workoutsCompleted / progress.workoutsPlanned) * 100}%` }
            ]} 
          />
        </View>
        <View style={styles.streakContainer}>
          <Ionicons name="flame" size={20} color="#FF9500" />
          <Text style={styles.streakText}>
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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
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
    color: "#333",
  },
  weeklyStats: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#34C759",
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
    color: "#333",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
}); 