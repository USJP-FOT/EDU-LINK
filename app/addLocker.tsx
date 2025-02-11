import { View, Text, Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';

const AddLocker = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [classRoomId, setClassRoomId] = useState("");
    const [loading, setLoading] = useState(false);

    const [isPenReady, setIsPenReady] = useState(true);
    const [isLocked, setIsLocked] = useState(true);

    const addLocker = () => {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            id: Number(id),
            name: name,
            classRoomId: classRoomId,
            isPenReady: isPenReady,
            isLocked: isLocked,
        });

        fetch("http://172.177.169.18:8080/locker/add", {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })
            .then((result) => {
                setLoading(false)
                if (result.ok) {
                    Alert.alert("Successfully Added!")
                }
            })
            .catch((error) => {
                console.error(error)
                Alert.alert("Error: Try again later ): ")
                setLoading(false)
            })
    }

    return (
        <View style={{ justifyContent: "center", gap: 15, padding: 20 }}>

            <TextInput placeholder='Locker ID' style={{ backgroundColor: "#fff", padding: 15, borderRadius: 30 }} onChangeText={setId} value={id} />
            <TextInput placeholder='Locker Name' style={{ backgroundColor: "#fff", padding: 15, borderRadius: 30 }} onChangeText={setName} value={name} />
            <TextInput placeholder='Classroom ID' style={{ backgroundColor: "#fff", padding: 15, borderRadius: 30 }} onChangeText={setClassRoomId} value={classRoomId} />
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={isLocked}
                    onValueChange={setIsLocked}
                    color={isLocked ? "#2e86c1" : undefined}
                />
                <Text style={styles.paragraph}>Locked</Text>
            </View>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={isPenReady}
                    onValueChange={setIsPenReady}
                    color={isPenReady ? "#2e86c1" : undefined}
                />
                <Text style={styles.paragraph}>Pen is available</Text>
            </View>
            <TouchableOpacity style={{ padding: 10, backgroundColor: "#2e86c1", borderRadius: 30 }} onPress={() => addLocker()} disabled={loading}>
                <Text style={{ color: "#fff", textAlign: "center" }}>{loading ? "LOADING..." : "ADD LOCKER"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddLocker

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
    },
    paragraph: {
        fontSize: 15,
        opacity: 0.8
    },
})