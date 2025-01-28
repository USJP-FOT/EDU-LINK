import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import NotifiCard from '@/components/NotifiCard'
import { getData, removeValue } from '@/lib/Storage'
import { FlatList } from 'react-native-gesture-handler'
import AntDesign from '@expo/vector-icons/AntDesign';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'

const Notification = () => {
  const snapPoints = ['30%']
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [notification, setNotification] = useState<any[]>([]);

  useEffect(() => {
    fetchNotification()
  }, [])

  const fetchNotification = async () => {
    const response = await getData("notification");
    setNotification(response)
  }

  return (
    <View style={{flex:1}}>
      <FlatList data={notification} renderItem={({ item, index }) => {
        const date = new Date(item.date);
        const { title, body, data } = item.request.content
        return (
          <NotifiCard title={title} body={body} date={date.toLocaleDateString()} index={index} onPress={handlePresentModalPress}/>
        )
      }} contentContainerStyle={styles.container} ListHeaderComponent={() => (
        <TouchableOpacity onPress={() => {
          removeValue("notification")
          setNotification([])
        }}
          style={{ paddingHorizontal: 20, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
          <AntDesign name="delete" size={30} color="red" />
          <Text style={{ fontSize: 12, fontWeight: "400" }}>Delete</Text>
        </TouchableOpacity>
      )} />


      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={{flex:1,padding:20}}>
            <TouchableOpacity style={styles.delBtn}>
              <Text style={styles.delTxt}>Delete this notification</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  delBtn:{
    backgroundColor:"red",
    paddingVertical:15,
    paddingHorizontal:30,
    borderRadius:15
  },
  delTxt:{
    color:"#fff",
    fontSize:18,
    fontWeight:"500",
    textAlign:"center"
  }

})