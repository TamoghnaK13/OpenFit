import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProgressModal from "../ProgressModal";
import { useState } from "react";
import { useTheme } from '@/utils/ThemeContext';

interface QuickActionsProps {
  onAchievementsPress: () => void;
}

export default function QuickActions({ onAchievementsPress }: QuickActionsProps) {
  const [progressVisible, setProgressVisible] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={styles.quickActions}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        <View style={styles.column}>
          <Pressable
            style={[styles.actionCard, { backgroundColor: colors.surface }]}
            onPress={() => setProgressVisible(true)}
          >
            <Ionicons name="list" size={24} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>My Routines</Text>
          </Pressable>
          <Pressable
            style={[styles.actionCard, { backgroundColor: colors.surface }]}
            onPress={() => setProgressVisible(true)}
          >
            <Ionicons name="people" size={24} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>Friends</Text>
          </Pressable>
        </View>
        <View style={styles.column}>
          <Pressable
            style={[styles.actionCard, { backgroundColor: colors.surface }]}
            onPress={onAchievementsPress}
          >
            <Ionicons name="trophy" size={24} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>Achievements</Text>
          </Pressable>
          <Pressable
            style={[styles.actionCard, { backgroundColor: colors.surface }]}
            onPress={() => setProgressVisible(true)}
          >
            <Ionicons name="stats-chart" size={24} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>Progress</Text>
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
    marginTop: 8,
    fontWeight: "500",
    textAlign: "center",
  },
}); 