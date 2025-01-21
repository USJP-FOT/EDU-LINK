import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import CameraProvider from '@/context/cameraContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CameraProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false, headerTitleAlign: "center" }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="notice" options={{ headerShown: true, title: "Send Notices" }} />
            <Stack.Screen name="notification" options={{ headerShown: false }} />
            <Stack.Screen name="attendance" options={{ headerShown: true, title: "Attendance Marking" }} />
            <Stack.Screen name="camera" options={{ headerShown: true, title: "Take a Picture" }} />
          </Stack>
        </GestureHandlerRootView>
      </CameraProvider>
    </ThemeProvider>
  );
}
