import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AddFriendModal from "@/components/AddFriendModal";
import { useTheme } from '@/utils/ThemeContext';

// Mock data
const mockFriends = [
  { id: 1, name: "Sarah Wilson", workouts: 47, streak: 5 },
  { id: 2, name: "Mike Johnson", workouts: 32, streak: 3 },
  { id: 3, name: "Emma Davis", workouts: 56, streak: 8 },
];

export default function Friends() {
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Friends List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Friends</Text>
          {mockFriends.map((friend) => (
            <Pressable key={friend.id} style={[styles.friendCard, { backgroundColor: colors.surface }]}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person-circle" size={50} color={colors.primary} />
              </View>
              <View style={styles.friendInfo}>
                <Text style={[styles.friendName, { color: colors.text }]}>{friend.name}</Text>
                <View style={styles.statsContainer}>
                  <Text style={[styles.statText, { color: colors.textSecondary }]}>
                    {friend.workouts} workouts
                  </Text>
                  <View style={styles.streakContainer}>
                    <Ionicons name="flame" size={16} color="#FF9500" />
                    <Text style={[styles.statText, { color: colors.textSecondary }]}>
                      {friend.streak} day streak
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
            </Pressable>
          ))}
        </View>

        {/* Add Friend Button */}
        <Pressable 
          style={[styles.addFriendButton, { backgroundColor: colors.primary }]}
          onPress={() => setIsAddFriendModalVisible(true)}
        >
          <Ionicons name="person-add" size={20} color="#fff" />
          <Text style={styles.addFriendText}>Add Friend</Text>
        </Pressable>
      </ScrollView>

      <AddFriendModal 
        visible={isAddFriendModalVisible}
        onClose={() => setIsAddFriendModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 14,
    marginRight: 12,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addFriendButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  addFriendText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
}); 