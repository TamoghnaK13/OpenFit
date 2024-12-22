import { View, Text, StyleSheet, Modal, Pressable, Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';
import Dropdown from './Dropdown';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const { theme, colors, toggleTheme } = useTheme();
  const { useKilograms, toggleWeightUnit } = useSettings();

  const weightUnitOptions = [
    { label: 'Kilograms (kg)', value: 'kg' },
    { label: 'Pounds (lbs)', value: 'lbs' },
  ];

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      marginTop: 50,
      backgroundColor: colors.background,
      height: "100%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    closeButton: {
      padding: 5,
    },
    settingSection: {
      backgroundColor: colors.surface,
      borderRadius: 10, 
      padding: 15,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 15,
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
    },
    settingButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingButtonText: {
      fontSize: 16,
      color: colors.text,
    },
    logoutButton: {
      backgroundColor: colors.error,
      borderRadius: 10,
      padding: 15,
      alignItems: "center",
    },
    logoutButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    scrollContent: {
      flex: 1,
    },
    scrollContentContainer: {
      paddingBottom: 40,
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Settings</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView 
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <View style={[styles.settingSection, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
              <Dropdown
                label="Weight Unit"
                value={useKilograms ? 'kg' : 'lbs'}
                options={weightUnitOptions}
                onSelect={(value) => toggleWeightUnit()}
              />
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Dark Theme</Text>
                <Switch
                  value={theme === 'dark'}
                  onValueChange={toggleTheme}
                />
              </View>
            </View>
            
            <View style={styles.settingSection}>
              <Text style={styles.sectionTitle}>Notifications</Text>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Workout Reminders</Text>
                <Switch />
              </View>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Achievement Alerts</Text>
                <Switch />
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={styles.sectionTitle}>Account</Text>
              <Pressable style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Edit Profile</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text} />
              </Pressable>
              <Pressable style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Change Password</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text} />
              </Pressable>
              <Pressable style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Privacy Settings</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text} />
              </Pressable>
            </View>

            <View style={styles.settingSection}>
              <Text style={styles.sectionTitle}>About</Text>
              <Pressable style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Terms of Service</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text} />
              </Pressable>
              <Pressable style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Privacy Policy</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text} />
              </Pressable>
            </View>

            <Pressable style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
} 