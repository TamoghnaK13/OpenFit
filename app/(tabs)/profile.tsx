// app/(tabs)/profile.tsx
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SettingsModal from "../../components/SettingsModal";
import AchievementsModal from "../../components/AchievementsModal";
import ProgressModal from "../../components/ProgressModal";

export default function Profile() {
  // This would normally come from your user state/context
  const mockUser = {
    name: "John Doe",
    workoutsCompleted: 47,
    streak: 12,
    memberSince: "Jan 2024",
  };

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [achievementsVisible, setAchievementsVisible] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
          <Pressable style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </Pressable>
        </View>
        <Text style={styles.name}>{mockUser.name}</Text>
        <Text style={styles.memberSince}>Member since {mockUser.memberSince}</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{mockUser.workoutsCompleted}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{mockUser.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Pressable 
          style={styles.actionButton}
          onPress={() => setSettingsVisible(true)}
        >
          <Ionicons name="settings-outline" size={24} color="#333" />
          <Text style={styles.actionButtonText}>Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </Pressable>
        <Pressable 
          style={styles.actionButton}
          onPress={() => setAchievementsVisible(true)}
        >
          <Ionicons name="trophy-outline" size={24} color="#333" />
          <Text style={styles.actionButtonText}>Achievements</Text>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </Pressable>
        <Pressable 
          style={styles.actionButton}
          onPress={() => setProgressVisible(true)}
        >
          <Ionicons name="stats-chart-outline" size={24} color="#333" />
          <Text style={styles.actionButtonText}>Progress</Text>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </Pressable>
      </View>

      <SettingsModal 
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
      <AchievementsModal 
        visible={achievementsVisible}
        onClose={() => setAchievementsVisible(false)}
      />
      <ProgressModal 
        visible={progressVisible}
        onClose={() => setProgressVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  memberSince: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
});
