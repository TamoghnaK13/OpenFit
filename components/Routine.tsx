import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title?: string,
  description?: string,
}

export default function Routine({ title, description }: Props) {
  return (
    <View style={styles.routineBox}>
      <Text style={styles.routineTitle}>{title ? title : 'Default Routine Name'}</Text>
      <Text style={styles.routineDescription}>{description ? description : 'Default routine description'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});