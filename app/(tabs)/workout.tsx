import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Workout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Workout</Text>

      {/* Empty Workout Option */}
      <Pressable style={styles.emptyWorkoutButton}>
        <View style={styles.buttonContent}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.emptyWorkoutText}>Empty Workout</Text>
        </View>
        <Text style={styles.buttonDescription}>
          Start with a blank workout and add exercises as you go
        </Text>
      </Pressable>

      {/* Routines Section */}
      <View style={styles.routinesSection}>
        <Text style={styles.sectionTitle}>Your Routines</Text>
        <ScrollView style={styles.routinesList}>
          {/* Example routine cards */}
          <Pressable style={styles.routineCard}>
            <View style={styles.routineHeader}>
              <Ionicons name="barbell-outline" size={24} color="#333" />
              <Text style={styles.routineName}>Push Day</Text>
            </View>
            <Text style={styles.routineExercises}>8 exercises • 45-60 min</Text>
          </Pressable>

          <Pressable style={styles.routineCard}>
            <View style={styles.routineHeader}>
              <Ionicons name="barbell-outline" size={24} color="#333" />
              <Text style={styles.routineName}>Pull Day</Text>
            </View>
            <Text style={styles.routineExercises}>7 exercises • 40-50 min</Text>
          </Pressable>

          <Pressable style={styles.routineCard}>
            <View style={styles.routineHeader}>
              <Ionicons name="barbell-outline" size={24} color="#333" />
              <Text style={styles.routineName}>Leg Day</Text>
            </View>
            <Text style={styles.routineExercises}>6 exercises • 50-65 min</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Recent Workouts Preview */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Pressable style={styles.recentWorkoutCard}>
            <Text style={styles.recentWorkoutDate}>Today</Text>
            <Text style={styles.recentWorkoutName}>Push Day</Text>
            <Text style={styles.recentWorkoutStats}>8 exercises • 52 min</Text>
          </Pressable>
          <Pressable style={styles.recentWorkoutCard}>
            <Text style={styles.recentWorkoutDate}>Yesterday</Text>
            <Text style={styles.recentWorkoutName}>Pull Day</Text>
            <Text style={styles.recentWorkoutStats}>7 exercises • 45 min</Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  emptyWorkoutButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  emptyWorkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  buttonDescription: {
    color: "#fff",
    opacity: 0.8,
    fontSize: 14,
  },
  routinesSection: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  routinesList: {
    flex: 1,
  },
  routineCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  routineHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  routineName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  routineExercises: {
    color: "#666",
    fontSize: 14,
  },
  recentSection: {
    marginBottom: 16,
  },
  recentWorkoutCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentWorkoutDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  recentWorkoutName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  recentWorkoutStats: {
    fontSize: 12,
    color: "#666",
  },
}); 