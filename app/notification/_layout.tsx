import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router, Stack } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const Layout = () => {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerTitleAlign: "center",
        }}>
            <Stack.Screen name="index" options={{ title: "Notification"}} />
            <Stack.Screen name="[id]" options={{title:""}}/>
        </Stack>
    )
}

export default Layout