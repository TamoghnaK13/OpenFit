import { View, Text, StyleSheet, Modal, Pressable, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/contexts/ThemeContext';

// Mock data - replace with actual API call
const mockPresetRoutines = [
  {
    title: "Push/Pull/Legs Split",
    description: "Classic 3-day split focusing on pushing, pulling, and leg movements",
    category: "Strength",
  },
  {
    title: "Full Body Workout",
    description: "Complete full body workout targeting all major muscle groups",
    category: "General Fitness",
  },
  {
    title: "Upper/Lower Split",
    description: "4-day split alternating between upper and lower body workouts",
    category: "Strength",
  },
  // Add more preset routines...
];

interface PresetRoutinesModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectRoutine: (routine: { title: string; description: string }) => void;
}

export default function PresetRoutinesModal({ 
  visible, 
  onClose, 
  onSelectRoutine 
}: PresetRoutinesModalProps) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutines, setFilteredRoutines] = useState(mockPresetRoutines);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockPresetRoutines.filter(routine => 
      routine.title.toLowerCase().includes(query.toLowerCase()) ||
      routine.description.toLowerCase().includes(query.toLowerCase()) ||
      routine.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRoutines(filtered);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Preset Routines</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </Pressable>
          </View>

          <View style={[styles.searchContainer, { backgroundColor: colors.background }]}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search routines..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <FlatList
            data={filteredRoutines}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable 
                style={[styles.routineItem, { 
                  backgroundColor: colors.surface,
                  borderColor: colors.border
                }]}
                onPress={() => onSelectRoutine(item)}
              >
                <View style={styles.routineHeader}>
                  <Text style={[styles.routineTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.categoryTag, { 
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary 
                  }]}>
                    {item.category}
                  </Text>
                </View>
                <Text style={[styles.routineDescription, { color: colors.textSecondary }]}>
                  {item.description}
                </Text>
              </Pressable>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: "80%",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  routineItem: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  categoryTag: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  routineDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
}); 