import { View, Text, ScrollView, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { data } from '../data'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { Stack } from 'expo-router'

const explore = () => {
  // Replace 'ws://localhost:8887' with your server's address if different
  //<Text style={{ color: item.status === "Absent" ? "red" : "green", fontWeight: '600' }}>{item.status}</Text>

  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const response = await fetch("https://iinndduummaa.serveo.net/student/all");
      const data = await response.json();
      console.log(data)
      setStudents(data)
      if (!response.ok) {
        console.log("cann't fetch data")
      }
    }
    catch (error) {
      console.log(error)
    }

  }

  const socket = new WebSocket('ws://iinndduumma.serveo.net');

  socket.onopen = function (event) {
    console.log('Connection opened');
  };

  socket.onmessage = async (event) => {
    const student = await JSON.parse(event.data);
    const isStudentExist = students.find((item) => item.id == student.id);

    if (!isStudentExist) {
      setStudents([...students, student]);
    }

  };

  socket.onclose = function (event) {
    console.log('Connection closed: ', event);
  };

  socket.onerror = function (error) {
    console.error('WebSocket error: ', error);
  };

  useEffect(() => {
    console.log(students)
  }, [students])

  return (
    <SafeAreaView style={{ padding: 10, flex: 1, gap: 20}}>
      <View style={{ backgroundColor: '#828282', borderRadius: 60, flexDirection: 'row', gap: 15, alignItems: 'center', paddingRight: 15, overflow: 'hidden', borderWidth: StyleSheet.hairlineWidth, borderColor: '#9f9f9f' }}>
        <TextInput style={{ padding: 12, flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 60, borderBottomLeftRadius: 60, borderWidth: 0 }} placeholder='Search...' />
        <FontAwesome5 name="search" size={20} color="#fff" />
      </View>

      <ScrollView style={{ flex: 1, borderRadius: 15, backgroundColor: '#fff', padding: 10 }} showsVerticalScrollIndicator={false}>
        {
          students.map((item, index) => (
            <View key={index} style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', padding: 10 }, students.length - 1 != index && { borderBottomWidth: 1, borderColor: '#f5f5f5' }]}>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <View style={{ backgroundColor: '#f5f5f5', borderRadius: 50, flex: 1, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome5 name="user" size={24} color="gray" />
                </View>
                <View style={{ gap: 4 }}>
                  <Text style={{ fontSize: 18, fontWeight: "600", color: "#1e1e1e" }}>{item.id}</Text>
                  <Text style={{ fontSize: 16, fontWeight: "400", color: "#656565" }}>{item.name}</Text>
                </View>
              </View>

              <View style={{ backgroundColor: '#f5f5f5', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 }}>
                <Text style={{ color: "green", fontWeight: '600' }}>Present</Text>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default explore