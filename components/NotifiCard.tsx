import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import { useNotification } from '@/context/NotificationContext';

type Prop = {
    title: string | null,
    date: string | null,
    body: string | null,
    index: number,
    onPress: () => void,
}

const NotifiCard = ({ title, date, body, index, onPress }: Prop) => {
    const { setSelect } = useNotification();

    return (
        <TouchableOpacity style={styles.container} onPress={() => router.push(`/notification/${index}`)}>

            <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.description} numberOfLines={1}>
                    {body}
                </Text>
                <Text style={styles.date}>{date}</Text>
            </View>

            <TouchableOpacity style={styles.option} onPress={()=>{
                setSelect(index);
                onPress();
            }}>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
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
    option: {
        padding: 15,
    },
    description: {
        fontSize: 16,
    },
    date: {
        fontSize: 14,
        opacity: 0.6,
        fontWeight: "600",
        textAlign: "left",
    },
    checkbox: {
        margin: 8,
    },
})

export default NotifiCard