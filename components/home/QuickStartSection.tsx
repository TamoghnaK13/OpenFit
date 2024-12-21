import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function QuickStartSection() {
  return (
    <View style={styles.quickStartSection}>
      <Link href="/(tabs)/workout" asChild>
        <Pressable style={styles.startWorkoutButton}>
          <Ionicons name="barbell-outline" size={24} color="#fff" />
          <Text style={styles.startWorkoutText}>Start Workout</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  quickStartSection: {
    padding: 20,
  },
  startWorkoutButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  startWorkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
}); 