import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getData } from '@/lib/Storage'

const DisplayNotification = () => {
  const [title, setTitle] = useState("")
  const [bodyTxt, setBodyTxt] = useState("")
  const [dateTime, setDateTime] = useState("")

  useEffect(() => {
    fetchNotification()
  }, [])

  const { id } = useLocalSearchParams();

  const fetchNotification = async () => {
    const response = await getData("notification");
    const notification = response[Number.parseInt(id[0])]
    const dateTime = new Date(notification.date).toLocaleString()
    const { title, body, data } = notification.request.content
    setTitle(title)
    setBodyTxt(body)
    setDateTime(dateTime)
  }

  const [date, time] = dateTime?.split(",") || ["", ""];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        {bodyTxt}
      </Text>
      <View style={{ flexDirection: "row", gap: 15, marginTop: 10 }}>
        <Text style={styles.dateTime}>{time}</Text>
        <Text style={styles.dateTime}>{date}</Text>
      </View>
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
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 10
  },
  description: {
    fontSize: 20,
    opacity: 0.9
  },
  dateTime: {
    fontSize: 16,
    marginTop: 15,
    fontWeight:"500",
    opacity:0.7
  }
})

export default DisplayNotification