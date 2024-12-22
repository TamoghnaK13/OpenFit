import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onSelect: (value: string) => void;
};

export default function Dropdown({ label, value, options, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();

  const selectedOption = options.find(opt => opt.value === value);

  const styles = StyleSheet.create({
    dropdownButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    selectedValue: {
      flex: 1,
    },
    label: {
      fontSize: 16,
      color: colors.text,
    },
    value: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionsContainer: {
      width: '80%',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 8,
      borderColor: colors.border,
      borderWidth: 1,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 8,
    },
    selectedOption: {
      backgroundColor: colors.background,
    },
    optionText: {
      fontSize: 16,
      color: colors.text,
    },
    selectedOptionText: {
      color: colors.primary,
      fontWeight: '500',
    },
  });

  return (
    <>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(true)}
      >
        <View style={styles.selectedValue}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{selectedOption?.label}</Text>
        </View>
        <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  option.value === value && styles.selectedOption
                ]}
                onPress={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
              >
                <Text style={[
                  styles.optionText,
                  option.value === value && styles.selectedOptionText
                ]}>
                  {option.label}
                </Text>
                {option.value === value && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
} 