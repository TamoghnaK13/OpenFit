// components/RoutineCreator.tsx

import { View, Text, StyleSheet, Pressable, Modal, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
};

export default function RoutineCreator({ isVisible, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onSave(title, description);
      setTitle("");
      setDescription("");
      onClose();
    } else {
      alert("Both title and description are required.");
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Routine</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Routine Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter routine name"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your routine"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
              placeholderTextColor="#999"
            />
          </View>

          <Pressable onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Create Routine</Text>
          </Pressable>
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
    backgroundColor: "#fff",
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
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});