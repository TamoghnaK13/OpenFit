// components/RoutineCreator.tsx

import { View, Text, StyleSheet, Pressable, Modal, TextInput } from "react-native";
import { useState } from "react";

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
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>

          <Text style={styles.header}>Create a New Routine</Text>

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

          <Pressable onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Routine</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, // Android shadow
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#333333", // Close button matches app's accent
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
    color: "#333333", // Matches app's title styling
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#f0f0f0", // Matches app's general background color
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333333", // Text matches app's primary text color
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#333333", // Matches app's dark gray accent
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});