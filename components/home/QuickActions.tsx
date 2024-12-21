import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProgressModal from "../ProgressModal";
import { useState } from "react";

interface QuickActionsProps {
  onAchievementsPress: () => void;
}

export default function QuickActions({ onAchievementsPress }: QuickActionsProps) {
  const [progressVisible, setProgressVisible] = useState(false);

  return (
    <View style={styles.quickActions}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        <View style={styles.column}>
          <Link href="/(tabs)/routines" asChild>
            <Pressable style={styles.actionCard}>
              <Ionicons name="list" size={24} color="#333" />
              <Text style={styles.actionText}>My Routines</Text>
            </Pressable>
          </Link>
          <Link href="/(tabs)/friends" asChild>
            <Pressable style={styles.actionCard}>
              <Ionicons name="people" size={24} color="#333" />
              <Text style={styles.actionText}>Friends</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.column}>
          <Pressable 
            style={styles.actionCard}
            onPress={onAchievementsPress}
          >
            <Ionicons name="trophy" size={24} color="#333" />
            <Text style={styles.actionText}>Achievements</Text>
          </Pressable>
          <Pressable 
            style={styles.actionCard}
            onPress={() => setProgressVisible(true)}
          >
            <Ionicons name="stats-chart" size={24} color="#333" />
            <Text style={styles.actionText}>Progress</Text>
          </Pressable>
        </View>
      </View>

      <ProgressModal 
        visible={progressVisible}
        onClose={() => setProgressVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flex: 1,
    gap: 12,
  },
  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
    fontWeight: "500",
    textAlign: "center",
  },
}); 