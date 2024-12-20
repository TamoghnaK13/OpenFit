import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {useState} from 'react';

import Routine from '@/components/Routine';
import RoutineCreator from '@/components/RoutineCreator';

/*
Warning, each child in list must have unique key prop. Error for some reason. Figure out whhy and how to fix.
*/

type RoutineProps = {
  id: number,
  title: string,
  description: string;
}

export default function Routines() {
  const [routines, setRoutines] = useState<RoutineProps[]>([
    {id: 0, title: "Routine", description: "This is a placeholder routine. Edit or delete it!"},
  ]);
  const [isRoutineCreatorVisible, setIsRoutineCreatorVisible] = useState<boolean>(false);

  const addRoutine = ({ id, title, description }: RoutineProps) => {
    const newRoutine = {
      id: id,
      title: title,
      description: description
    }

    console.log(newRoutine);

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
          <Routine key={routine.id} title={routine.title} description={routine.description} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={showRoutineCreator}>
        <Text style={styles.addButtonText}>+ Add New Routine</Text>
      </TouchableOpacity>
      <RoutineCreator isVisible={isRoutineCreatorVisible} onClose={hideRoutineCreator} 
        onSave={(title, description) => addRoutine({id: routines.length, title: title, description: description})} />
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
