import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getData } from '@/lib/Storage'

const DisplayNotification = () => {
  const [title, setTitle] = useState("")
  const [bodyTxt, setBodyTxt] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    fetchNotification()
  }, [])

  const { id } = useLocalSearchParams();

  const fetchNotification = async () => {
    const response = await getData("notification");
    const notification = response[Number.parseInt(id[0])]
    const date = new Date(notification.date).toLocaleDateString()
    const { title, body, data } = notification.request.content
    setTitle(title)
    setBodyTxt(body)
    setDate(date)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        {bodyTxt}
      </Text>
      <Text>{date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: "600"
  },
  description: {
    fontSize: 16,
  }
})

export default DisplayNotification