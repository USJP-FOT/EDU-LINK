import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import NotifiCard from '@/components/NotifiCard'
import { deleteByIndex, getData, removeValue } from '@/lib/Storage'
import { FlatList } from 'react-native-gesture-handler'
import AntDesign from '@expo/vector-icons/AntDesign';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'

const Notification = () => {
  const [active, setActive] = useState<number>(0);
  const snapPoints = ['30%']
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClose = () => {
    bottomSheetModalRef.current?.close();
  };

  const [notification, setNotification] = useState<any[]>([]);

  const fetchNotification = async () => {
    const response = await getData("notification") || [];
    setNotification(response)
  }

  const clearNotifications = () => {
    removeValue("notification")
    setNotification([])
  }

  const deleteNotication = (key:string,index:number) => {
    deleteByIndex(key, index);
    handleClose()
  }

  useEffect(() => {
    fetchNotification()
  }, [handleClose, clearNotifications])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        {
          (notification?.length > 0) && (
            <TouchableOpacity onPress={clearNotifications}
              style={styles.btn}>
              <AntDesign name="delete" size={24} color="#fff" />
              <Text style={styles.btnTxt}>Delete All</Text>
            </TouchableOpacity>
          )
        }
      </View>
      <FlatList data={notification} renderItem={({ item, index }) => {
        const date = new Date(item.date);
        const { title, body, data } = item.request.content
        return (
          <NotifiCard title={title} body={body} date={date.toLocaleDateString()} index={index} onPress={handlePresentModalPress} setActive={setActive} />
        )
      }} contentContainerStyle={styles.container} />

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={{ flex: 1, padding: 20}}>
            <TouchableOpacity style={styles.delBtn} onPress={()=>deleteNotication("notification", active)}>
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
  delBtn: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30
  },
  delTxt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
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