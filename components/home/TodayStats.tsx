import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/utils/ThemeContext';

interface TodayStatsProps {
  stats: {
    caloriesBurned: number;
    workoutsCompleted: number;
    minutesWorked: number;
  };
}

export default function TodayStats({ stats }: TodayStatsProps) {
  const { colors } = useTheme();
  
  return (
    <View style={styles.statsSection}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Progress</Text>
      <View style={styles.statsGrid}>
        <StatCard 
          icon="flame" 
          iconColor="#FF9500" 
          value={stats.caloriesBurned} 
          label="Calories"
          colors={colors}
        />
        <StatCard 
          icon="time" 
          iconColor={colors.primary}
          value={stats.minutesWorked} 
          label="Minutes"
          colors={colors}
        />
        <StatCard 
          icon="checkmark-circle" 
          iconColor="#34C759" 
          value={stats.workoutsCompleted} 
          label="Workouts"
          colors={colors}
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
  colors: any;
}

function StatCard({ icon, iconColor, value, label, colors }: StatCardProps) {
  return (
    <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
      <Ionicons name={icon} size={24} color={iconColor} />
      <Text style={[styles.statNumber, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
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
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
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
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
}); 