import { router, Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#2e86c1",
      headerShown: true,
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
      name="locker"
      options={{
        title: 'Locker',
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="locker" size={size} color={color} />,
      }}
    />
    <Tabs.Screen
      name="register"
      options={{
        title: 'Student Registration',
        tabBarLabel: "Registration",
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="adduser" size={size} color={color} />
        ),
      }}
    />
    </Tabs>
  );
}
