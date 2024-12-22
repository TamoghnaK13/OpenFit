import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/contexts/ThemeContext';

interface AchievementsModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof achievementIcons;
  progress: number;
  total: number;
  completed: boolean;
}

const achievementIcons = {
  streak: "flame",
  workout: "barbell",
  timer: "timer",
  trophy: "trophy",
  star: "star",
} as const;

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Workout Warrior",
    description: "Complete 50 workouts",
    icon: "workout",
    progress: 47,
    total: 50,
    completed: false,
  },
  {
    id: "2",
    title: "Consistency King",
    description: "Maintain a 30-day streak",
    icon: "streak",
    progress: 12,
    total: 30,
    completed: false,
  },
  {
    id: "3",
    title: "Early Bird",
    description: "Complete 10 workouts before 8 AM",
    icon: "timer",
    progress: 10,
    total: 10,
    completed: true,
  },
  {
    id: "4",
    title: "Power Lifter",
    description: "Log 1000kg total weight in one session",
    icon: "trophy",
    progress: 850,
    total: 1000,
    completed: false,
  },
  {
    id: "5",
    title: "Perfect Week",
    description: "Complete all planned workouts in a week",
    icon: "star",
    progress: 1,
    total: 1,
    completed: true,
  },
];

export default function AchievementsModal({ visible, onClose }: AchievementsModalProps) {
  const { colors } = useTheme();

  const renderAchievement = (achievement: Achievement) => {
    const progressPercentage = (achievement.progress / achievement.total) * 100;
    
    return (
      <View 
        key={achievement.id} 
        style={[
          styles.achievementCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
          achievement.completed && { borderColor: "#FFD700", borderWidth: 2 }
        ]}
      >
        <View style={styles.achievementHeader}>
          <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
            <Ionicons 
              name={achievementIcons[achievement.icon]} 
              size={24} 
              color={achievement.completed ? "#FFD700" : colors.textSecondary} 
            />
          </View>
          <View style={styles.achievementInfo}>
            <Text style={[styles.achievementTitle, { color: colors.text }]}>
              {achievement.title}
            </Text>
            <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
              {achievement.description}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
            <View 
              style={[
                styles.progressFill,
                { width: `${progressPercentage}%`, backgroundColor: colors.primary }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            {achievement.progress}/{achievement.total}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Achievements</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.achievementsList}>
            {mockAchievements.map(renderAchievement)}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    marginTop: 50,
    backgroundColor: "#f0f0f0",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  achievementsList: {
    flex: 1,
  },
  achievementCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  achievementCompleted: {
    borderColor: "#FFD700",
    borderWidth: 2,
  },
  achievementHeader: {
    flexDirection: "row",
    marginBottom: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    color: "#666",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    width: 45,
    textAlign: "right",
  },
}); 