// app/(tabs)/routines.tsx

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/contexts/ThemeContext';

import Routine from '@/components/Routine';
import RoutineCreator from '@/components/RoutineCreator';
import { Exercise } from '@/components/RoutineEditor';
import PresetRoutinesModal from '@/components/PresetRoutinesModal';

export type RoutineProps = {
  id: number;
  title: string;
  description: string;
  exercises?: Exercise[];
}

export default function Routines() {
  const { colors } = useTheme();
  const [routines, setRoutines] = useState<RoutineProps[]>([
    { id: 0, title: "Routine", description: "This is a placeholder routine. Edit or delete it!", exercises: [] },
  ]);
  const [isRoutineCreatorVisible, setIsRoutineCreatorVisible] = useState<boolean>(false);
  const [isPresetModalVisible, setIsPresetModalVisible] = useState<boolean>(false);

  const addRoutine = ({ id, title, description }: RoutineProps) => {
    const newRoutine = {
      id: id,
      title: title,
      description: description,
      exercises: []
    }
    setRoutines((prevRoutines) => [...prevRoutines, newRoutine]);
  };

  const deleteRoutine = (id: number) => {
    setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.id !== id));
  };

  const updateRoutine = (id: number, title: string, description: string, exercises: Exercise[]) => {
    setRoutines((prevRoutines) =>
      prevRoutines.map((routine) =>
        routine.id === id
          ? { ...routine, title, description, exercises }
          : routine
      )
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Your Routines</Text>

      <ScrollView 
        style={styles.routinesContainer}
        contentContainerStyle={styles.routinesContent}
      >
        {routines.map((routine) => (
          <Routine
            id={routine.id}
            key={routine.id}
            title={routine.title}
            description={routine.description}
            deleteFunction={deleteRoutine}
            updateFunction={updateRoutine} />
        ))}
      </ScrollView>

      <View style={[styles.buttonContainer, { 
        backgroundColor: colors.background,
        borderTopColor: colors.border
      }]}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.surface }]}
          onPress={() => setIsPresetModalVisible(true)}
        >
          <Ionicons name="search" size={20} color={colors.text} />
          <Text style={[styles.buttonText, { color: colors.text }]}>Browse Presets</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => setIsRoutineCreatorVisible(true)}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.buttonText}>Create Routine</Text>
        </TouchableOpacity>
      </View>

      <RoutineCreator 
        isVisible={isRoutineCreatorVisible} 
        onClose={() => setIsRoutineCreatorVisible(false)}
        onSave={(title, description) => addRoutine({ 
          id: routines.length, 
          title: title, 
          description: description 
        })} 
      />

      <PresetRoutinesModal
        visible={isPresetModalVisible}
        onClose={() => setIsPresetModalVisible(false)}
        onSelectRoutine={(routine) => {
          addRoutine({
            id: routines.length,
            ...routine
          });
          setIsPresetModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    padding: 16,
  },
  routinesContainer: {
    flex: 1,
  },
  routinesContent: {
    padding: 16,
    paddingBottom: 100,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  }
});
