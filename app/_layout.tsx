import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotificationProvider } from '@/context/NotificationContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <NotificationProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false, headerTitleAlign: "center", statusBarStyle: "dark" }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="notice" options={{ headerShown: true, title: "Send Notice" }} />
            <Stack.Screen name="notification" options={{ headerShown: false }} />
            <Stack.Screen name="attendance" options={{ headerShown: true, title: "Attendance" }} />
            <Stack.Screen name="addLocker" options={{ headerShown: true, title: "Add Locker" }} />
          </Stack>
        </GestureHandlerRootView>
    </NotificationProvider>
  );
}