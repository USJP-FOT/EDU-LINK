import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const DisplayNotification = () => {
  const {id} = useLocalSearchParams()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>dfdfd gdgdg dfdfd</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti aliquam aliquid temporibus dolorum quod magnam non, iste veniam excepturi molestiae, minima repellendus. Veritatis odit saepe, ut iusto nisi quibusdam ipsum.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor:"#fff"
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