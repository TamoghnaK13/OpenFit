// components/Routine.tsx

import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from "react-native";
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons"; // Icon library

import { RoutineProps } from '@/app/(tabs)/routines';

type Props = {
  id: number;
  title: string;
  description: string;
  deleteFunction: (id: number) => void;
};

export default function Routine({ id, title, description, deleteFunction }: Props) {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  return (
    <View style={styles.routineBox}>
      <TouchableOpacity onPress={() => {console.log("pressed!")}}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="barbell-outline" size={24} color="#007AFF" />
            <Text style={styles.routineTitle}>
              {title ? title : "Default Routine Name"}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <Text style={styles.routineDescription}>
          {description ? description : "Default routine description"}
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
          <View style={styles.menu}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                console.log("Edit selected");
                setMenuVisible(false);
              }}
            >
              <Ionicons name="create-outline" size={20} color="#333" />
              <Text style={styles.menuItemText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.menuItem, styles.deleteItem]}
              onPress={() => {
                deleteFunction(id);
                setMenuVisible(false);
              }}
            >
              <Ionicons name="trash-outline" size={20} color="#ff3b30" />
              <Text style={[styles.menuItemText, styles.deleteText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  routineBox: {
    backgroundColor: "#fff",
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
    color: "#333",
    marginLeft: 12,
  },
  routineDescription: {
    fontSize: 14,
    color: "#666",
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
    backgroundColor: "#fff",
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
    borderBottomColor: "#eee",
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  deleteItem: {
    borderBottomWidth: 0,
  },
  deleteText: {
    color: "#ff3b30",
  },
});