import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import NotifiCard from '@/components/NotifiCard'

const Notification = () => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <NotifiCard />
      <NotifiCard />
      <NotifiCard />
    </ScrollView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap:10
  },

})