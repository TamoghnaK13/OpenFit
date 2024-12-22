// app/_layout.tsx
import { Stack } from 'expo-router';
import ThemeProvider from '@/components/ThemeProvider';
import { SettingsProvider } from '@/contexts/SettingsContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SettingsProvider>
    </ThemeProvider>
  );
}
