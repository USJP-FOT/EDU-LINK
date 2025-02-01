import { View, Text, ScrollView, TextInput, StyleSheet,TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

const attendance = () => {

  const [students, setStudents] = useState<any[]>([
    {
      name: "JAYAMAL A.T",
      id: "TE110372"
    },
    {
      name: "UDARA D.G.C",
      id: "TE110432"
    },
    {
      name: "UDARA D.G.C",
      id: "TE110432"
    },
    {
      name: "UDARA D.G.C",
      id: "TE110432"
    },
    {
      name: "UDARA D.G.C",
      id: "TE110432"
    },
    {
      name: "UDARA D.G.C",
      id: "TE110432"
    },
    {
      name: "UDARA D.G.C",
      id: "TE110432"
    },
    {
      name: "UDARA D.G.C",
      id: "TE110432"
    },
    {
      name: "UDARA D.G.C",
      id: "TE110432"
    },
    {
      name: "UDARA D.G.C",
      id: "TE110432"
    },
    {
      name: "UDARA D.G.C",
      id: "TE110432"
    },
    {
      name: "THARAKA R.D",
      id: "TE110338"
    }
  ]);

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