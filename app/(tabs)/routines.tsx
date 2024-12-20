import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {useState} from 'react';

import Routine from '@/components/Routine';
import RoutineCreator from '@/components/RoutineCreator';

/*
TODO:
Divide this up into some components
Make the routines buttons that will do something later
Understand what the fuck is going on because ChatGPT did the styling way too well.
*/

type RoutineInfo = {
  id: number;
  title: string;
  description: string;
};

type RoutineProps = {
  title: string,
  description: string;
}

export default function Routines() {
  const [routines, setRoutines] = useState<RoutineInfo[]>([
    {id: 0, title: "Routine", description: "This is a placeholder routine. Edit or delete it!"},
  ]);
  const [isRoutineCreatorVisible, setIsRoutineCreatorVisible] = useState<boolean>(false);

  const addRoutine = ({ title, description }: RoutineProps) => {
    const newRoutine = {
      id: routines.length,
      title: title,
      description: description
    }

    setRoutines((prevRoutines) => [...prevRoutines, newRoutine]);
  };

  const showRoutineCreator = () => {
    setIsRoutineCreatorVisible(true);
  };

  const hideRoutineCreator = () => {
    setIsRoutineCreatorVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Routines</Text>
      
      <ScrollView contentContainerStyle={styles.routinesContainer}>
        {routines.map((routine) => (
          <Routine title={routine.title} description={routine.description} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={showRoutineCreator}>
        <Text style={styles.addButtonText}>+ Add New Routine</Text>
      </TouchableOpacity>
      <RoutineCreator isVisible={isRoutineCreatorVisible} onClose={hideRoutineCreator} 
        onSave={(title, description) => addRoutine({title: title, description: description})} />
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
