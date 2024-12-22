// app/(tabs)/profile.tsx
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/utils/ThemeContext';
import SettingsModal from "../../components/SettingsModal";
import AchievementsModal from "../../components/AchievementsModal";
import ProgressModal from "../../components/ProgressModal";

export default function Profile() {
  const { colors } = useTheme();
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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
          <Pressable style={[styles.editButton, { backgroundColor: colors.primary }]}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </Pressable>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>{mockUser.name}</Text>
        <Text style={[styles.memberSince, { color: colors.textSecondary }]}>
          Member since {mockUser.memberSince}
        </Text>
      </View>

      {/* Stats Section */}
      <View style={[styles.statsContainer, { backgroundColor: colors.surface }]}>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>
            {mockUser.workoutsCompleted}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Workouts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{mockUser.streak}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <Pressable 
          style={[styles.actionButton, { borderBottomColor: colors.border }]}
          onPress={() => setSettingsVisible(true)}
        >
          <Ionicons name="settings-outline" size={24} color={colors.text} />
          <Text style={[styles.actionButtonText, { color: colors.text }]}>Settings</Text>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </Pressable>
        <Pressable 
          style={[styles.actionButton, { borderBottomColor: colors.border }]}
          onPress={() => setAchievementsVisible(true)}
        >
          <Ionicons name="trophy-outline" size={24} color={colors.text} />
          <Text style={[styles.actionButtonText, { color: colors.text }]}>Achievements</Text>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </Pressable>
        <Pressable 
          style={[styles.actionButton, { borderBottomColor: colors.border }]}
          onPress={() => setProgressVisible(true)}
        >
          <Ionicons name="stats-chart-outline" size={24} color={colors.text} />
          <Text style={[styles.actionButtonText, { color: colors.text }]}>Progress</Text>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
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
  },
  header: {
    alignItems: "center",
    padding: 20,
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
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  memberSince: {
    fontSize: 16,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    marginTop: 10,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  section: {
    marginTop: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
});
