import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import NotifiCard from '@/components/NotifiCard'
import { FlatList } from 'react-native-gesture-handler'
import AntDesign from '@expo/vector-icons/AntDesign';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useNotification } from '@/context/NotificationContext'
import { deleteByIndex, removeValue } from '@/lib/Storage';

const Notification = () => {
  const {setNotificationList,} = useNotification()
  const snapPoints = ['30%']
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDelete = () => {
    bottomSheetModalRef.current?.close();
    removeValue("notification");
    setNotificationList([]);
  };


  const { notificationList,select,setSelect } = useNotification();

  useEffect(()=>{
    deleteByIndex("notification",select)
  },[setSelect])

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={notificationList} renderItem={({ item, index }) => {
        const date = new Date(item.date);
        const { title, body, data } = item.request.content
        return (
          <NotifiCard title={title} body={body} dateTime={date.toLocaleString()} index={index} onPress={handlePresentModalPress} />
        )
      }} contentContainerStyle={styles.container} ListHeaderComponent={() => (
        <View>
          {
            (notificationList?.length > 0) && (
              <TouchableOpacity onPress={handleDelete}
                style={styles.btn}>
                <AntDesign name="delete" size={24} color="#fff" />
                <Text style={styles.btnTxt}>Delete All</Text>
              </TouchableOpacity>
            )
          }
        </View>
      )} />

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            <TouchableOpacity style={styles.delBtn} onPress={() =>deleteByIndex("notification",select)}>
              <Text style={styles.delTxt}>Delete this notification {select}</Text>
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
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  btnTxt: {
    color: "#fff",
    fontSize: 16
  }

})