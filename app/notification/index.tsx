import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import NotifiCard from '@/components/NotifiCard'
import { getData, removeValue } from '@/lib/Storage'
import { FlatList } from 'react-native-gesture-handler'
import AntDesign from '@expo/vector-icons/AntDesign';

const Notification = () => {
  const [notification, setNotification] = useState<any[]>([]);

  useEffect(() => {
    fetchNotification()
  }, [])

  const fetchNotification = async () => {
    const response = await getData("notification");
    setNotification(response)
  }

  return (
    <View>

      <FlatList data={notification} renderItem={({ item, index }) => {
        const date = new Date(item.date);
        const { title, body, data } = item.request.content
        return (
          <NotifiCard title={title} body={body} date={date.toLocaleTimeString()} index={index} />
        )
      }} contentContainerStyle={styles.container} ListHeaderComponent={() => (
        <TouchableOpacity onPress={() => {
          removeValue("notification")
          setNotification([])
        }} 
        style={{ paddingHorizontal: 20, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
          <AntDesign name="delete" size={30} color="red" />
          <Text style={{ fontSize: 12, fontWeight: "400" }}>Delete</Text>
        </TouchableOpacity>
      )} />
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10
  },

})