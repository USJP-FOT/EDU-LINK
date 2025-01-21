import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import { notice } from '@/assets/data'

const addNotice = () => {
    const [title, setTitle] = useState("");
    const [description, setDiscription] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    editable
                    placeholder='Title'
                    style={styles.title}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    placeholder='Body'
                    value={description}
                    onChangeText={setDiscription}
                    style={styles.content}
                />
                <View style={styles.btnGroup}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnTxt}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnTxt}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default addNotice

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
    },
    content: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
    },
    inputContainer: {
        flex: 1,
        gap: 10
    },
    btnGroup: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#2e86c1',
        borderRadius: 8
    },
    btnTxt: {
        color: "#fff",
        fontSize: 14
    }
})