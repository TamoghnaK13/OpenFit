import { View, Text, StyleSheet } from "react-native";
import { useTheme } from '@/utils/ThemeContext';

export default function WelcomeSection() {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.welcomeSection, { backgroundColor: colors.surface }]}>
      <Text style={[styles.welcomeText, { color: colors.text }]}>Welcome back!</Text>
      <Text style={[styles.dateText, { color: colors.textSecondary }]}>
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
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 16,
    marginTop: 4,
  },
}); 