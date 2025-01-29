import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const addNotice = () => {
    const [title, setTitle] = useState("");
    const [description, setDiscription] = useState("");

    const clearAll = () =>{
        setDiscription("")
        setTitle("")
    }

    return (
            <KeyboardAvoidingView style={styles.container} behavior={undefined}>
                <View style={{width:"100%",gap:15}}>
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
                    <TouchableOpacity style={styles.btn}>
                        <FontAwesome name="send-o" size={24} color="#fff" />
                        <Text style={styles.btnTxt}>SEND</Text>
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
        padding:10,
        textAlignVertical: 'top',
        borderRadius: 15,
        fontSize: 16
    },
    inputContainer: {
        gap: 15,
    },
    btnGroup: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 20,
    },
    btn: {
        backgroundColor: '#2e86c1',
        borderRadius: 40,
        paddingHorizontal: 30,
        paddingVertical: 15,
        flexDirection:"row",
        gap:10,
        justifyContent:"center",
        alignItems:"center"
    },
    btnTxt: {
        color: "#fff",
        fontSize: 16
    }
})