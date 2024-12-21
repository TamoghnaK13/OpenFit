import { View, Text, StyleSheet } from "react-native";

export default function WelcomeSection() {
  return (
    <View style={styles.welcomeSection}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.dateText}>
        {new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeSection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
}); 