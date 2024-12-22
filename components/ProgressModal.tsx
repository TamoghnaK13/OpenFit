import { View, Text, StyleSheet, Modal, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/utils/ThemeContext';

interface ProgressModalProps {
  visible: boolean;
  onClose: () => void;
}

// Mock data (moved from progress.tsx)
const weeklyStats = {
  totalWeight: "12,450 kg",
  workouts: 5,
  timeSpent: "4h 30m",
  personalRecords: 3
};

const improvements = [
  {
    exercise: "Bench Press",
    improvement: "+5kg",
    date: "2 days ago",
    previous: "80kg",
    current: "85kg"
  },
  {
    exercise: "Squat",
    improvement: "+7.5kg",
    date: "4 days ago",
    previous: "120kg",
    current: "127.5kg"
  }
];

export default function ProgressModal({ visible, onClose }: ProgressModalProps) {
  const { colors } = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { 
            backgroundColor: colors.surface,
            borderBottomColor: colors.border 
          }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Progress</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.content}>
            {/* Weekly Stats */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>This Week</Text>
              <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
                  <Ionicons name="barbell" size={24} color={colors.primary} />
                  <Text style={[styles.statValue, { color: colors.text }]}>{weeklyStats.totalWeight}</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Weight</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
                  <Ionicons name="time" size={24} color="#FF9500" />
                  <Text style={[styles.statValue, { color: colors.text }]}>{weeklyStats.timeSpent}</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Time Spent</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
                  <Ionicons name="trophy" size={24} color="#34C759" />
                  <Text style={[styles.statValue, { color: colors.text }]}>{weeklyStats.personalRecords}</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>New PRs</Text>
                </View>
              </View>
            </View>

            {/* Recent Improvements */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Improvements</Text>
              {improvements.map((item, index) => (
                <View key={index} style={[styles.improvementCard, { backgroundColor: colors.surface }]}>
                  <View style={styles.improvementHeader}>
                    <Text style={[styles.exerciseName, { color: colors.text }]}>{item.exercise}</Text>
                    <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                      <Text style={styles.badgeText}>{item.improvement}</Text>
                    </View>
                  </View>
                  <View style={styles.improvementDetails}>
                    <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                      Previous: {item.previous} → Current: {item.current}
                    </Text>
                    <Text style={[styles.dateText, { color: colors.textSecondary }]}>{item.date}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Charts */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Weight Lifted Trend</Text>
              <View style={[styles.chartPlaceholder, { backgroundColor: colors.surface }]}>
                <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                  Chart coming soon...
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Bodyweight Progress</Text>
              <View style={[styles.chartPlaceholder, { backgroundColor: colors.surface }]}>
                <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                  Graph coming soon...
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    height: "100%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  improvementCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  improvementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  improvementDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
  },
  dateText: {
    fontSize: 12,
  },
  chartPlaceholder: {
    height: 200,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  placeholderText: {
    fontSize: 16,
  },
}); 