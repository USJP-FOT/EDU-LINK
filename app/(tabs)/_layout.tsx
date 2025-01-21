import { router, Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: true,
      tabBarAllowFontScaling:false,
      tabBarHideOnKeyboard:true,
      headerTitleAlign: "center",
      tabBarStyle: Platform.select({
        ios: {
          position: 'absolute',
        },
        default: {},
      }),
    }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Dashboard',
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 20 }} onPress={()=>router.push("/notification")}>
            <Ionicons name="notifications" size={30} color="#2e86c1" />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />,
      }}
    />
    <Tabs.Screen
      name="register"
      options={{
        title: 'Student Registration',
        tabBarLabel: "Registration",
        tabBarIcon: ({ color, size }) => (
          <Octicons name="diff-added" size={size} color={color} />
        ),
      }}
    />
    </Tabs>
  );
}
