import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import * as ImagePicker from 'expo-image-picker';
import { useCameraImage } from '@/context/CameraContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const create = () => {
  const [image, setImage] = useState("");
  const { picture, setPicture } = useCameraImage()

  useEffect(() => {
    if (picture) {
      setImage(picture);
      console.log(picture)
    }
  }, [picture])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPicture("");
      console.log(result.assets[0].uri)
    }
  };


  const snapPoints = ['30%']
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <KeyboardAvoidingView style={{ flex: 1, gap: 20 }} behavior={undefined}>
          <View style={{ width: 150, height: 150, borderRadius: 200, backgroundColor: '#fff', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {
              image ?
                <Image source={{ uri: image }} style={{ width: 140, height: 140, borderRadius: 70 }} />
                :
                <View style={{ width: 140, height: 140, flexDirection: 'row', borderRadius: 90, justifyContent: 'center', alignItems: 'center', backgroundColor: "#2e86c1" }}>
                  <MaterialCommunityIcons name="camera" size={50} color="#fff" />
                </View>
            }

            <TouchableOpacity onPress={() => handlePresentModalPress()} style={{ position: 'absolute', bottom: 0, right: 20, backgroundColor: "gray", padding: 5, borderRadius: 30 }}>
              <MaterialCommunityIcons name="camera" size={24} color="white" />
            </TouchableOpacity>

          </View>

          <TextInput placeholder='Full Name' style={{ backgroundColor: '#fff', borderRadius: 15, padding: 15, fontFamily: 'Poppins' }} />
          <TextInput placeholder='Email' style={{ backgroundColor: '#fff', borderRadius: 15, padding: 15, fontFamily: 'Poppins' }} />
          <TextInput placeholder='Contact Number' style={{ backgroundColor: '#fff', borderRadius: 15, padding: 15, fontFamily: 'Poppins' }} />
          <TextInput placeholder='Accadamic Year' style={{ backgroundColor: '#fff', borderRadius: 15, padding: 15, fontFamily: 'Poppins' }} />
        </KeyboardAvoidingView>
        
        <TouchableOpacity style={{ padding: 15, flexDirection: 'row', backgroundColor: '#2e86c1', justifyContent: 'center', alignItems: 'center', borderRadius: 40, marginTop: 20 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', fontFamily: 'Poppins' }}>REGISTER</Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={styles.contentContainer}>

            <View style={{ flexDirection: 'row', gap: 40 }}>
              <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onPress={() => pickImage()}>
                <Octicons name="image" size={40} color="white" style={{ padding: 14, backgroundColor: "#2e86c1", borderRadius: 15 }} />
                <Text style={{ color: '#2e86c1', textAlign: 'center', fontSize: 14 }}>Gallery</Text>
              </TouchableOpacity>

              <Link href={'/camera'} asChild>
                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Octicons name="device-camera" size={40} color="white" style={{ padding: 14, backgroundColor: '#2e86c1', borderRadius: 15 }} />
                  <Text style={{ color: '#2e86c1', textAlign: 'center', fontSize: 14 }}>Camera</Text>
                </TouchableOpacity>
              </Link>
            </View>

          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: "#fff"
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
});

export default create