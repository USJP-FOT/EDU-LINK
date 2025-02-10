import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const addNotice = () => {
    const [title, setTitle] = useState("");
    const [description, setDiscription] = useState("");
    const [loading, setLoading] = useState(false);

    const clearAll = () => {
        setDiscription("")
        setTitle("")
    }

    const sendData = async () => {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            title: title,
            description: description
        });

        fetch("http://172.177.169.18:8080/announcement/add", {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })
            .then((result) => {
                setLoading(false)
                if (result.ok) {
                    Alert.alert("Send successfully!")
                }
            })
            .catch((error) => {
                console.error(error)
                Alert.alert("Error: Try again later ): ")
                setLoading(false)
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={undefined}>
            <View style={{ width: "100%", gap: 15 }}>
                <TextInput
                    placeholder='Title'
                    style={styles.title}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    multiline
                    numberOfLines={10}
                    placeholder='Type here...'
                    value={description}
                    onChangeText={setDiscription}
                    style={styles.content}

                />
            </View>
            <View style={styles.btnGroup}>
                <TouchableOpacity style={styles.btn} disabled={loading} onPress={sendData}>
                    <FontAwesome name="send-o" size={24} color="#fff" />
                    {
                        loading ?
                            <Text style={styles.btnTxt}>SENDING...</Text>
                            :
                            <Text style={styles.btnTxt}>SEND</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={clearAll}>
                    <MaterialCommunityIcons name="eraser" size={24} color="#fff" />
                    <Text style={styles.btnTxt}>CLEAR</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default addNotice

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center"

    },
    title: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 15,
        fontSize: 16
    },
    content: {
        backgroundColor: "#fff",
        height: 200,
        padding: 10,
        textAlignVertical: 'top',
        borderRadius: 15,
        fontSize: 16
    },
    inputContainer: {
        gap: 15,
    },
    btnGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        marginTop: 20,
    },
    btn: {
        backgroundColor: '#2e86c1',
        borderRadius: 40,
        paddingHorizontal: 30,
        paddingVertical: 15,
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    btnTxt: {
        color: "#fff",
        fontSize: 16
    }
})