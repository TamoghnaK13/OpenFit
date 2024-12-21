import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { Exercise } from "./RoutineEditor";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
};

// Temporary mock data - this would normally come from an API or database
const MOCK_EXERCISES: Exercise[] = [
  { id: 1, name: "Bench Press" },
  { id: 2, name: "Squat" },
  { id: 3, name: "Deadlift" },
  { id: 4, name: "Pull-ups" },
  { id: 5, name: "Push-ups" },
  { id: 6, name: "Dumbbell Rows" },
  { id: 7, name: "Shoulder Press" },
  { id: 8, name: "Lunges" },
];

export default function ExerciseSelector({ isVisible, onClose, onSelect }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = MOCK_EXERCISES.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Select Exercise</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <ScrollView style={styles.exerciseList}>
            {filteredExercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                style={styles.exerciseItem}
                onPress={() => onSelect(exercise)}
              >
                <Text style={styles.exerciseName}>{exercise.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
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
    maxHeight: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    width: "100%",
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  exerciseList: {
    maxHeight: 300,
  },
  exerciseItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  exerciseName: {
    fontSize: 16,
    color: "#333333",
  },
  cancelButton: {
    backgroundColor: "#ff4444",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
}); 