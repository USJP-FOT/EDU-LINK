import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'

const NotifiCard = () => {
    return (
        <TouchableOpacity style={styles.container} onPress={()=>router.push("/notification/1")}>
            <Text style={styles.title}>Notification</Text>
            <Text style={styles.description} numberOfLines={2}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore vitae obcaecati, quisquam, dicta itaque quam, blanditiis voluptatum eius vero fugit laudantium! Itaque ratione accusamus beatae neque placeat. Labore, fugiat voluptatem?
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 16
    },
    title: {
        fontSize: 16,
        fontWeight: "600"
    },
    description: {
        fontSize: 14,
    }
})

export default NotifiCard