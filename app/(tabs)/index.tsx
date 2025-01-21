import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { data } from "../../data";
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { registerForPushNotificationsAsync } from '@/lib/PushNotification';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


const App = () => {
  const attendance = data.attendance.filter((student) => student.status === "Present");
  const attendancePrecentage = (attendance.length / data.attendance.length) * 100;

  const [apiData, setApiData] = useState<any[] | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch('https://iinndduummaa.serveo.net/all');
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setApiData(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };



  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log(notification)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

      <View style={{ flex: 1, padding: 20 }}>

        <View style={{ flexDirection: "row", gap: 20, marginBottom: 20 }}>
          <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 15, borderWidth: 1, borderColor: "#ecf0f1" }}>
            <Link href={"/attendance"}>
              <AnimatedCircularProgress
                size={120}
                width={12}
                fill={75}
                tintColor="#2ecc71"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#e5e7e9">
                {
                  (fill) => (
                    <Text>
                      {`${Math.round(fill)}%`}
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
            </Link>
          </View>

          <View style={{
            backgroundColor: "#fff", padding: 20, borderRadius: 15, flex: 1, justifyContent: "center",
            alignItems: "center", gap: 4, borderWidth: 1, borderColor: "#ecf0f1"
          }}>
            <Text style={{ fontSize: 16 }}>status</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textTransform: "uppercase", color: "red" }}>WAIT</Text>

            <View style={{ width: 80, height: 8, backgroundColor: "red", borderRadius: 4, }} />
          </View>
        </View>

        <Link href={"/notice"} asChild>
          <TouchableOpacity style={{ backgroundColor: "#2e86c1", padding: 15, flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
            <FontAwesome name="send-o" size={24} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 18, textTransform: 'uppercase' }}>Send notice</Text>
          </TouchableOpacity>
        </Link>


      </View>

    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({

});
