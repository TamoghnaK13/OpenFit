// components/Routine.tsx

import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from "react-native";
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons"; // Icon library
import { useTheme } from '@/utils/ThemeContext';

import RoutineEditor, { Exercise } from "./RoutineEditor";

interface Props {
  id: number;
  title: string;
  description: string;
  deleteFunction: (id: number) => void;
  updateFunction: (id: number, title: string, description: string, exercises: Exercise[]) => void;
}

export default function Routine({ id, title, description, deleteFunction, updateFunction }: Props) {
  const { colors } = useTheme();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false);

  const handleEdit = () => {
    setMenuVisible(false);
    setIsEditorVisible(true);
  };

  return (
    <View style={[styles.routineBox, { backgroundColor: colors.surface }]}>
      <TouchableOpacity onPress={() => {console.log("pressed!")}}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="barbell-outline" size={24} color={colors.primary} />
            <Text style={[styles.routineTitle, { color: colors.text }]}>
              {title ? title : "Default Routine Name"}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.routineDescription, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={() => setMenuVisible(false)}
          activeOpacity={1}
        >
          <View style={[styles.menu, { backgroundColor: colors.surface }]}>
            <TouchableOpacity 
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={handleEdit}
            >
              <Ionicons name="create-outline" size={20} color={colors.text} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.menuItem, styles.deleteItem]}
              onPress={() => {
                deleteFunction(id);
                setMenuVisible(false);
              }}
            >
              <Ionicons name="trash-outline" size={20} color={colors.error} />
              <Text style={[styles.menuItemText, { color: colors.error }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <RoutineEditor
        isVisible={isEditorVisible}
        onClose={() => setIsEditorVisible(false)}
        onSave={(title, description, exercises) => {
          updateFunction(id, title, description, exercises);
          setIsEditorVisible(false);
        }}
        title={title}
        description={description}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  routineBox: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  routineDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  menuButton: {
    padding: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    borderRadius: 12,
    width: 200,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
  deleteItem: {
    borderBottomWidth: 0,
  },
});