import { View, Text, StyleSheet, Modal, TextInput, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ExercisePicker from "./ExercisePicker";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import { useSettings } from '@/contexts/SettingsContext';

export interface Set {
  id: number;
  reps: number;
  weight: number;
}

export interface Exercise {
  id: number;
  name: string;
  sets: Set[];
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSave: (title: string, description: string, exercises: Exercise[]) => void;
  title?: string;
  description?: string;
  exercises?: Exercise[];
}

export default function RoutineEditor({ 
  isVisible, 
  onClose, 
  onSave,
  title: initialTitle = "",
  description: initialDescription = "",
  exercises: initialExercises = []
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [isExercisePickerVisible, setIsExercisePickerVisible] = useState(false);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null);
  const [expandedExercises, setExpandedExercises] = useState<number[]>([]);
  const { convertWeight } = useSettings();

  const handleSave = () => {
    if (!title.trim()) {
      // Show error or validation message
      return;
    }
    onSave(title, description, exercises);
  };

  const addExercise = () => {
    setEditingExerciseIndex(exercises.length);
    setIsExercisePickerVisible(true);
  };

  const addSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets.push({
      id: updatedExercises[exerciseIndex].sets.length + 1,
      reps: 10,
      weight: 0
    });
    setExercises(updatedExercises);
  };

  const toggleExerciseExpanded = (exerciseId: number) => {
    setExpandedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </Pressable>
              <Text style={styles.headerTitle}>Edit Routine</Text>
              <Pressable onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>

            <ScrollView style={styles.scrollContent}>
              {/* Basic Info Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Basic Information</Text>
                <TextInput
                  style={styles.titleInput}
                  placeholder="Routine Name"
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Description (optional)"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  placeholderTextColor="#999"
                />
              </View>

              {/* Exercises Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Exercises</Text>
                  <Pressable onPress={addExercise} style={styles.addButton}>
                    <Ionicons name="add-circle" size={24} color="#007AFF" />
                    <Text style={styles.addButtonText}>Add Exercise</Text>
                  </Pressable>
                </View>

                {exercises.map((exercise, index) => (
                  <View key={exercise.id} style={styles.exerciseCard}>
                    <View style={styles.exerciseHeader}>
                      <Text style={styles.exerciseNumber}>#{index + 1}</Text>
                      <Pressable 
                        onPress={() => setExercises(exercises.filter(e => e.id !== exercise.id))}
                        style={styles.removeButton}
                      >
                        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                      </Pressable>
                    </View>
                    <Pressable 
                      style={styles.exerciseNameContainer}
                      onPress={() => {
                        setEditingExerciseIndex(index);
                        setIsExercisePickerVisible(true);
                      }}
                    >
                      <Text style={styles.exerciseName}>
                        {exercise.name || "Select Exercise"}
                      </Text>
                      <Ionicons name="chevron-forward" size={20} color="#666" />
                    </Pressable>

                    {/* Sets Section */}
                    <View style={styles.setsContainer}>
                      <Pressable 
                        style={styles.setsHeader}
                        onPress={() => toggleExerciseExpanded(exercise.id)}
                      >
                        <View style={styles.setsInfo}>
                          <Text style={styles.setsTitle}>Sets</Text>
                          <Text style={styles.setsCount}>{exercise.sets.length} sets</Text>
                        </View>
                        <Ionicons 
                          name={expandedExercises.includes(exercise.id) ? "chevron-up" : "chevron-down"} 
                          size={20} 
                          color="#666" 
                        />
                      </Pressable>

                      {expandedExercises.includes(exercise.id) && (
                        <>
                          {exercise.sets.map((set, setIndex) => (
                            <Swipeable
                              key={set.id}
                              renderLeftActions={() => (
                                <Pressable 
                                  style={styles.deleteSetAction}
                                  onPress={() => {
                                    const updatedExercises = [...exercises];
                                    updatedExercises[index].sets = exercise.sets.filter((_, i) => i !== setIndex);
                                    setExercises(updatedExercises);
                                  }}
                                >
                                  <Ionicons name="trash-outline" size={20} color="#fff" />
                                </Pressable>
                              )}
                            >
                              <View style={styles.setRow}>
                                <Text style={styles.setNumber}>{setIndex + 1}</Text>
                                <View style={styles.setInputs}>
                                  <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Reps</Text>
                                    <TextInput
                                      style={styles.numberInput}
                                      value={set.reps.toString()}
                                      onChangeText={(text) => {
                                        const updatedExercises = [...exercises];
                                        updatedExercises[index].sets[setIndex].reps = parseInt(text) || 0;
                                        setExercises(updatedExercises);
                                      }}
                                      keyboardType="number-pad"
                                    />
                                  </View>
                                  <Text style={styles.inputDivider}>×</Text>
                                  <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>
                                      Weight {convertWeight(set.weight)}
                                    </Text>
                                    <TextInput
                                      style={styles.numberInput}
                                      value={set.weight.toString()}
                                      onChangeText={(text) => {
                                        const updatedExercises = [...exercises];
                                        updatedExercises[index].sets[setIndex].weight = parseInt(text) || 0;
                                        setExercises(updatedExercises);
                                      }}
                                      keyboardType="number-pad"
                                    />
                                  </View>
                                </View>
                              </View>
                            </Swipeable>
                          ))}
                          
                          <Pressable 
                            style={styles.addSetButton}
                            onPress={() => addSet(index)}
                          >
                            <Ionicons name="add" size={16} color="#007AFF" />
                            <Text style={styles.addSetText}>Add Set</Text>
                          </Pressable>
                        </>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </GestureHandlerRootView>
      <ExercisePicker
        isVisible={isExercisePickerVisible}
        onClose={() => setIsExercisePickerVisible(false)}
        onSelect={(exerciseName) => {
          if (editingExerciseIndex !== null) {
            const newExercise: Exercise = {
              id: exercises.length + 1,
              name: exerciseName,
              sets: [{
                id: 1,
                reps: 10,
                weight: 0
              }]
            };
            const updatedExercises = [...exercises];
            updatedExercises[editingExerciseIndex] = newExercise;
            setExercises(updatedExercises);
            setEditingExerciseIndex(null);
          }
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  titleInput: {
    fontSize: 18,
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 12,
  },
  descriptionInput: {
    fontSize: 16,
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    height: 80,
    textAlignVertical: "top",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
  exerciseCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  exerciseNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  removeButton: {
    padding: 4,
  },
  exerciseNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  setsContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  setsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
  },
  setsInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  setsTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  setsCount: {
    fontSize: 14,
    color: "#666",
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  setNumber: {
    width: 24,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  setInputs: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  inputGroup: {
    width: '35%',
  },
  inputLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    textAlign: "center",
  },
  numberInput: {
    fontSize: 14,
    padding: 8,
    backgroundColor: "#f8f8f8",
    borderRadius: 6,
    textAlign: "center",
    minWidth: 60,
  },
  inputDivider: {
    fontSize: 14,
    color: "#666",
  },
  removeSetButton: {
    padding: 4,
  },
  addSetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    gap: 4,
  },
  addSetText: {
    color: "#007AFF",
    fontSize: 14,
  },
  deleteSetAction: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
}); 