import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TodayStatsProps {
  stats: {
    caloriesBurned: number;
    workoutsCompleted: number;
    minutesWorked: number;
  };
}

export default function TodayStats({ stats }: TodayStatsProps) {
  return (
    <View style={styles.statsSection}>
      <Text style={styles.sectionTitle}>Today's Progress</Text>
      <View style={styles.statsGrid}>
        <StatCard 
          icon="flame" 
          iconColor="#FF9500" 
          value={stats.caloriesBurned} 
          label="Calories" 
        />
        <StatCard 
          icon="time" 
          iconColor="#007AFF" 
          value={stats.minutesWorked} 
          label="Minutes" 
        />
        <StatCard 
          icon="checkmark-circle" 
          iconColor="#34C759" 
          value={stats.workoutsCompleted} 
          label="Workouts" 
        />
      </View>
    </View>
  );
}

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  value: number;
  label: string;
}

function StatCard({ icon, iconColor, value, label }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={24} color={iconColor} />
      <Text style={styles.statNumber}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "31%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
}); 