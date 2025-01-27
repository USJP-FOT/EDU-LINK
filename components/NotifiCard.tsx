import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react'
import { Link, router } from 'expo-router'

type Prop = {
    title: String,
    date: String,
    body: String,
    index: Number
}

const NotifiCard = ({ title, date, body, index }: Prop) => {
    const [isChecked, setChecked] = useState(false);
    return (
        <TouchableOpacity style={styles.container} onPress={() => router.push(`/notification/${index}`)}>
            
            <View style={{flex:1}}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description} numberOfLines={2}>
                    {body}
                </Text>
                <View style={styles.line} />
                <Text style={styles.date}>{date}</Text>
            </View>

            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 16,
        flexDirection:"row",
        alignItems:"center",
    },
    title: {
        fontSize: 18,
        fontWeight: "600"
    },
    line: {
        borderTopWidth: StyleSheet.hairlineWidth,
        marginTop: 10,
        opacity: 0.5
    },
    description: {
        fontSize: 16,
    },
    date: {
        fontSize: 14,
        opacity: 0.7,
        textAlign: "right",
    },
    checkbox: {
        margin: 8,
      },
})

export default NotifiCard