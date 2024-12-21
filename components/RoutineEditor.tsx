import { View, Text, StyleSheet, Modal, Pressable, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import ExerciseSelector from "@/components/ExerciseSelector";

export type Exercise = {
  id: number;
  name: string;
  // We'll add more properties later like sets, reps, etc.
};

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (title: string, description: string, exercises: Exercise[]) => void;
  title: string;
  description: string;
  exercises?: Exercise[];
};

export default function RoutineEditor({ isVisible, onClose, onSave, title: initialTitle, description: initialDescription, exercises: initialExercises = [] }: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [isExerciseSelectorVisible, setIsExerciseSelectorVisible] = useState(false);

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onSave(title, description, exercises);
      onClose();
    } else {
      alert("Both title and description are required.");
    }
  };

  const removeExercise = (exerciseId: number) => {
    setExercises(exercises.filter(ex => ex.id !== exerciseId));
  };

  const addExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
    setIsExerciseSelectorVisible(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>

          <Text style={styles.header}>Edit Routine</Text>

          <TextInput
            style={styles.input}
            placeholder="Routine Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Routine Description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
          />

          <Text style={styles.sectionTitle}>Exercises</Text>
          
          <ScrollView style={styles.exerciseList}>
            {exercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
                  <Ionicons name="close-circle" size={24} color="#ff4444" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity 
            style={styles.addExerciseButton}
            onPress={() => setIsExerciseSelectorVisible(true)}
          >
            <Text style={styles.addExerciseButtonText}>+ Add Exercise</Text>
          </TouchableOpacity>

          <Pressable onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Routine</Text>
          </Pressable>

          <ExerciseSelector
            isVisible={isExerciseSelectorVisible}
            onClose={() => setIsExerciseSelectorVisible(false)}
            onSelect={addExercise}
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
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#333333",
    width: 80,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  exerciseList: {
    maxHeight: 200,
    marginBottom: 10,
  },
  exerciseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    color: "#333333",
  },
  addExerciseButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addExerciseButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#333333",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
}); 