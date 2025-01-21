import { CameraView, CameraType, useCameraPermissions, CameraRatio } from 'expo-camera';
import { Link, router, Stack, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useCameraImage } from '@/context/cameraContext';

export default function Camera() {
    const { width } = useWindowDimensions();
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [flash, setFlash] = useState<boolean>(false);

    const [image, setImage] = useState<null | string>(null);
    const [isCaptured, setIsCaptured] = useState(false);

    const cameraRef = useRef<CameraView>(null);

    const { setPicture } = useCameraImage();

    const takePicture = async () => {
        try {
            setIsCaptured(false)
            const response = await cameraRef.current?.takePictureAsync();
            if (response) {
                setImage(response.uri);
            }
            setIsCaptured(true)
            console.log(response?.uri);
        }
        catch (error) {
            console.log(error)
        }

    }


    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const sendImage = () => {
        if (image) {
            setPicture(image);
        }
        router.push("/register");
    }

    return (
        <View style={styles.container}>
            {
                !image ?
                    (
                        <View>
                            <CameraView style={{ width: (width - 40), height: (width - 20), borderRadius: 15 }} facing={"back"} ref={cameraRef} animateShutter={true} enableTorch={true} />
                            <View style={styles.buttonContainer}>

                                <TouchableOpacity style={styles.cbutton} onPress={toggleCameraFacing}>
                                    <MaterialIcons name="cameraswitch" size={40} color="black" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.cbutton} onPress={takePicture}>
                                    <MaterialCommunityIcons name="camera" size={34} color="black" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.cbutton} onPress={() => setFlash(!flash)}>
                                    <Entypo name="flashlight" size={34} color="black" />
                                </TouchableOpacity>

                            </View>
                        </View>

                    )
                    :
                    (
                        <View>
                            <Image source={{ uri: image }} style={{ width: width - 40, height: width - 20, borderRadius: 15 }} />
                            <View style={{ flexDirection: 'row', gap: 30, width: '100%', justifyContent: 'center',marginTop:20 }}>

                                <TouchableOpacity style={styles.btn} onPress={sendImage}>
                                    <Text style={styles.text}>OK</Text>
                                </TouchableOpacity>


                                <TouchableOpacity style={styles.btn} onPress={() => setImage(null)}>
                                    <Text style={styles.text}>Retry</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap:20,
        alignItems: 'center',
        marginTop:-30

    },
    cbutton: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor:"#2e86c1",
        borderRadius:15,
        flex:1
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
        color: 'white',
        textAlign:"center"
    },
});
