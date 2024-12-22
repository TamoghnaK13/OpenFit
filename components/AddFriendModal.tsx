import { View, Text, StyleSheet, Modal, Pressable, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '@/contexts/ThemeContext';

// Mock data - replace with API call
const mockSearchResults = [
  { id: 1, name: "John Smith", workouts: 23 },
  { id: 2, name: "Jane Doe", workouts: 45 },
  { id: 3, name: "Alex Johnson", workouts: 12 },
];

interface AddFriendModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddFriendModal({ visible, onClose }: AddFriendModalProps) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(mockSearchResults);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Mock search - replace with API call
    const filtered = mockSearchResults.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  const copyInviteLink = () => {
    // Implement copy to clipboard functionality
    console.log("Copying invite link...");
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "90%",
      height: "80%",
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      shadowColor: colors.text,
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 5,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
    },
    closeButton: {
      padding: 4,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 10,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      marginLeft: 8,
      color: colors.text,
    },
    inviteLink: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    inviteLinkText: {
      fontSize: 16,
      color: colors.primary,
      marginLeft: 12,
      fontWeight: "500",
    },
    resultItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    userInfo: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    userDetails: {
      marginLeft: 12,
    },
    userName: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    userStats: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    addButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    },
    addButtonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add Friends</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </Pressable>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <View style={styles.userInfo}>
                  <Ionicons name="person-circle" size={40} color={colors.primary} />
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userStats}>{item.workouts} workouts</Text>
                  </View>
                </View>
                <Pressable style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
              </View>
            )}
            ListHeaderComponent={
              <Pressable style={styles.inviteLink} onPress={copyInviteLink}>
                <Ionicons name="link" size={24} color={colors.primary} />
                <Text style={styles.inviteLinkText}>Copy Invite Link</Text>
              </Pressable>
            }
          />
        </View>
      </View>
    </Modal>
  );
} 