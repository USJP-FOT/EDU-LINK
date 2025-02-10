import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type itemType = {
    id: number;
    name: string;
    isLocked: boolean;
    classRoomId: number
}

const Locker = () => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [lockers, setLockers] = useState<itemType[]>([]);

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [classRoomId, setClassRoomId] = useState("");

    const toogleState = (id: number, state: boolean) => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(`http://172.177.169.18:8080/locker/set-status?id=${id}&set=${!state}`, {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow"
        })
            .then((result) => {
                setLoading(false);
                if (result.ok) {
                    if (state) {
                        Alert.alert("Successfully Unlocked!");
                        getLockers();
                    }
                    else {
                        Alert.alert("Successfully Locked!");
                    }
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Error: Can't Unlock ): ");
                setLoading(false);
            });
    };

    const getLockers = async () => {
        try {
            const response = await fetch('http://172.177.169.18:8080/locker/all');
            if (response.ok) {
                const data = await response.json();
                setLockers(data)
                console.log(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    async function deleteLocker(id: number) {
        try {
            const response = await fetch(`http://172.177.169.18:8080/locker/delete?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                Alert.alert("Deleted Successfully!")
            } else {
                Alert.alert("Failed to delete ): ")
            }
        } catch (error) {
            Alert.alert("Failed to delete ): ")
        }
    }

    const addLocker = () => {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            id: Number(id),
            name: name,
            classRoomId: classRoomId,
            isPenReady: true, //default
            isLocked: true,  //default
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
                    getLockers(); // Refresh list
                }
            })
            .catch((error) => {
                console.error(error)
                Alert.alert("Error: Try again later ): ")
                setLoading(false)
            })
    }



    useEffect(() => {
        getLockers();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        getLockers();  // Fetch lockers again
        setRefreshing(false);
    };

    return (
        <KeyboardAvoidingView>
             <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 15, marginBottom: 20,paddingHorizontal:20 }}>
                    <View style={{ flex: 1, gap: 6 }}>
                        <TextInput placeholder='Locker ID' style={{ backgroundColor: "#fff", padding: 15, borderRadius: 30 }} onChangeText={setId} value={id} />
                        <TextInput placeholder='Locker Name' style={{ backgroundColor: "#fff", padding: 15, borderRadius: 30 }} onChangeText={setName} value={name} />
                        <TextInput placeholder='Classroom ID' style={{ backgroundColor: "#fff", padding: 15, borderRadius: 30 }} onChangeText={setClassRoomId} value={classRoomId} />
                    </View>
                    <TouchableOpacity style={{ padding: 10, backgroundColor: "#2e86c1", borderRadius: 30 }} onPress={() => addLocker()}>
                        <Ionicons name="add-sharp" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <FlatList
            data={lockers}
            renderItem={({ item }) => (
                <View key={item.id} style={{ backgroundColor: "#fff", padding: 20, borderRadius: 15, position: "relative" }}>
                    <Text>Locker ID: {item.id}</Text>
                    <Text>Locker Name: {item.name}</Text>
                    <Text>ClassRoom ID: {item.classRoomId}</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => toogleState(item.id, item.isLocked)}>
                        <Text style={styles.btnTxt}>{item.isLocked ? "UNLOCK" : "LOCK"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        padding: 10,
                        backgroundColor: "#ff0000",
                        borderRadius: 30,
                        position: "absolute",
                        right: 20,
                        top: 10
                    }}
                        onPress={() => deleteLocker(item.id)}
                    >
                        <MaterialIcons name="delete" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
            contentContainerStyle={styles.container}
            refreshing={refreshing}
            onRefresh={handleRefresh}
        />
        </KeyboardAvoidingView>
    );
};

export default Locker;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#2e86c1",
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        marginTop: 20
    },
    btnTxt: {
        color: "#fff",
        fontSize: 18,
        textTransform: 'uppercase'
    },
    container: {
        padding: 20,
        gap: 10,
    },
});
