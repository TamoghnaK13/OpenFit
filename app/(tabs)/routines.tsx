import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

/*
TODO:
Divide this up into some components
Make the routines buttons that will do something later
Understand what the fuck is going on because ChatGPT did the styling way too well.
*/

export default function Routines() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Routines</Text>
      
      <ScrollView contentContainerStyle={styles.routinesContainer}>
        {/* Placeholder for routine containers */}
        <View style={styles.routineBox}>
          <Text style={styles.routineTitle}>Morning Routine</Text>
          <Text style={styles.routineDescription}>A great way to start your day!</Text>
        </View>
        <View style={styles.routineBox}>
          <Text style={styles.routineTitle}>Evening Workout</Text>
          <Text style={styles.routineDescription}>Relax and energize in the evening.</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Routine</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Matches the app background
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333", // Dark gray for text
    marginBottom: 16,
  },
  routinesContainer: {
    flexGrow: 1,
    paddingBottom: 16, // Space below routines to avoid overlap with button
  },
  routineBox: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12, // Space between routine boxes
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Shadow for Android
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50", // Navy for routine titles
    marginBottom: 4,
  },
  routineDescription: {
    fontSize: 14,
    color: "#7f8c8d", // Light gray for descriptions
  },
  addButton: {
    backgroundColor: "#333333", // Matches the dark gray accent
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 16,
    right: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
