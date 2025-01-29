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
      <Text style={styles.date}>{date}</Text>
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
    marginBottom:10
  },
  description: {
    fontSize: 20,
    opacity:0.8
  },
  date:{
    fontSize:16,
    marginTop:15
  }
})

export default DisplayNotification