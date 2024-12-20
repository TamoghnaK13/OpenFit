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

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const editRoutine = () => {

  };

  return (
    <View style={styles.routineBox}>
      <TouchableOpacity onPress={() => {console.log("pressed!")}}>
        <View style={styles.header}>
          <Text style={styles.routineTitle}>
            {title ? title : "Default Routine Name"}
          </Text>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#7f8c8d" />
          </TouchableOpacity>
        </View>
        <Text style={styles.routineDescription}>
          {description ? description : "Default routine description"}
        </Text>
      </TouchableOpacity>
      {menuVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={menuVisible}
          onRequestClose={toggleMenu}
        >
          <TouchableOpacity style={styles.overlay} onPress={toggleMenu}>
            <View style={styles.menu}>
              <TouchableOpacity onPress={() => console.log("Edit selected")}>
                <Text style={styles.menuItem}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteFunction(id)}>
                <Text style={styles.menuItem}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  routineBox: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Android shadow
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50", // Navy for routine titles
  },
  routineDescription: {
    fontSize: 14,
    color: "#7f8c8d", // Light gray for descriptions
  },
  menuButton: {
    padding: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    width: 150,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
  },
});