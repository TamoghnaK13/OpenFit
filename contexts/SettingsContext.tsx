import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsContextType = {
  useKilograms: boolean;
  toggleWeightUnit: () => void;
  convertWeight: (kg: number) => string;
};

const SettingsContext = createContext<SettingsContextType>({
  useKilograms: true,
  toggleWeightUnit: () => {},
  convertWeight: (kg: number) => `${kg}`,
});

const WEIGHT_UNIT_KEY = '@weight_unit';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [useKilograms, setUseKilograms] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedUnit = await AsyncStorage.getItem(WEIGHT_UNIT_KEY);
        if (savedUnit !== null) {
          setUseKilograms(savedUnit === 'kg');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  const toggleWeightUnit = async () => {
    setUseKilograms(!useKilograms);
    try {
      await AsyncStorage.setItem(WEIGHT_UNIT_KEY, !useKilograms ? 'kg' : 'lbs');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const convertWeight = (kg: number): string => {
    if (useKilograms) return `${kg} kg`;
    return `${Math.round(kg * 2.2)} lbs`;
  };

  return (
    <SettingsContext.Provider value={{ useKilograms, toggleWeightUnit, convertWeight }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext); 