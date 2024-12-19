// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons, Foundation } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#e5e5e5", paddingBottom: 5 }, // Lighter gray for the tab bar
        tabBarActiveTintColor: "#333333", // Dark gray for active tabs
        tabBarInactiveTintColor: "#95a5a6", // Soft gray for inactive tabs
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: "Routines",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
