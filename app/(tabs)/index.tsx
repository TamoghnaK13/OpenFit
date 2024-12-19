// app/(tabs)/index.tsx
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcome to OpenFit!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Softer light gray background
  },
  welcomeMessage: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333333", // Match text color to dark gray
  },
});
