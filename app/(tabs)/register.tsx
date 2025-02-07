import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const create = () => {
  const [imageLeft, setImageLeft] = useState("");
  const [imageCenter, setImageCenter] = useState("");
  const [imageRight, setImageRight] = useState("");

  const pickImage = async (type: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      switch (type) {
        case "left":
          setImageLeft(result.assets[0].uri);
          console.log(result.assets[0].uri)
          break;
        case "center":
          setImageCenter(result.assets[0].uri);
          console.log(result.assets[0].uri)
          break;
        case "right":
          setImageRight(result.assets[0].uri);
          console.log(result.assets[0].uri)
          break;
      }
    }
  };


  const snapPoints = ['30%']
  return (
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView style={{ flex: 1, gap: 20 }} behavior={undefined}>

          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent:"space-between", gap: 15 }}>
            <View style={{ width: 90, height: 90, borderRadius: 200, backgroundColor: '#fff', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              {
                imageLeft ?
                  <Image source={{ uri: imageLeft }} style={{ width: 80, height: 80, borderRadius: 70 }} />
                  :
                  <View style={{ width: 80, height: 80, flexDirection: 'column', borderRadius: 90, justifyContent: 'center', alignItems: 'center', backgroundColor: "#2e86c1" }}>
                    <MaterialCommunityIcons name="camera" size={30} color="#fff" />
                  </View>
              }
              <TouchableOpacity onPress={() => pickImage("left")} style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: "gray", padding: 5, borderRadius: 30 }}>
                <MaterialCommunityIcons name="camera" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ width: 90, height: 90, borderRadius: 200, backgroundColor: '#fff', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              {
                imageCenter ?
                  <Image source={{ uri: imageCenter }} style={{ width: 80, height: 80, borderRadius: 70 }} />
                  :
                  <View style={{ width: 80, height: 80, flexDirection: 'row', borderRadius: 90, justifyContent: 'center', alignItems: 'center', backgroundColor: "#2e86c1" }}>
                    <MaterialCommunityIcons name="camera" size={30} color="#fff" />
                  </View>
              }
              <TouchableOpacity onPress={() => pickImage("center")} style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: "gray", padding: 5, borderRadius: 30 }}>
                <MaterialCommunityIcons name="camera" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ width: 90, height: 90, borderRadius: 200, backgroundColor: '#fff', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              {
                imageRight ?
                  <Image source={{ uri: imageRight }} style={{ width: 80, height: 80, borderRadius: 70 }} />
                  :
                  <View style={{ width: 80, height: 80, flexDirection: 'row', borderRadius: 90, justifyContent: 'center', alignItems: 'center', backgroundColor: "#2e86c1" }}>
                    <MaterialCommunityIcons name="camera" size={30} color="#fff" />
                  </View>
              }
              <TouchableOpacity onPress={() => pickImage("right")} style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: "gray", padding: 5, borderRadius: 30 }}>
                <MaterialCommunityIcons name="camera" size={30} color="white" />
              </TouchableOpacity>
            </View>
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