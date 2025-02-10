import { View, Text, ScrollView, TextInput, StyleSheet,TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

const attendance = () => {

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
        console.log("Can't fetch data")
      }
    }
    catch (error) {
      console.log(error)
    }

  }

  const socket = new WebSocket('ws://172.177.169.18:8887');

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


  return (
    <KeyboardAvoidingView style={{ padding: 10, flex: 1,gap:10 }}>
      
      <View style={{ backgroundColor: '#2e86c1', borderRadius: 60, flexDirection: 'row', gap: 15, alignItems: 'center', paddingRight: 15, overflow: 'hidden' }}>
        <TextInput style={{ fontSize: 16, padding: 12, flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 60, borderBottomLeftRadius: 60, borderWidth: 0 }} placeholder='Search...' />
        <TouchableOpacity style={{ paddingHorizontal: 10 }}>
          <FontAwesome5 name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{flex:1, borderRadius: 15, backgroundColor: '#fff'}} showsVerticalScrollIndicator={false} contentContainerStyle={{padding:10}}>
        {
          students.map((item, index) => (
            <View key={index} style={[{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', padding: 10, gap: 20 }, students.length - 1 != index && { borderBottomWidth: 1, borderColor: '#f5f5f5' }]}>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, flex: 1, justifyContent:"flex-start" }}>
                <View style={{ backgroundColor: '#f5f5f5', borderRadius: 50, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome5 name="user" size={24} color="gray" />
                </View>
                <View style={{ gap: 4 }}>
                  <Text style={{ fontSize: 18, fontWeight: "600", color: "#1e1e1e" }}>{item.id}</Text>
                  <Text style={{ fontSize: 16, fontWeight: "400", color: "#656565" }}>{item.name}</Text>
                </View>
              </View>

              <View style={{ backgroundColor: '#f5f5f5', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 }}>
                {
                  index % 2 == 0 ? (
                    <Text style={{ color: "green", fontWeight: '600' }}>Present</Text>
                  )
                    :
                    (
                      <Text style={{ color: "red", fontWeight: '600' }}>Absent</Text>
                    )
                }

              </View>
            </View>
          ))
        }
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default attendance