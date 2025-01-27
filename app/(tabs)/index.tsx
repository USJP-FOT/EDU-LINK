import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { data } from "../../data";
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { registerForPushNotificationsAsync, sendPushNotification } from '@/lib/PushNotification';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Notifications from 'expo-notifications';
import { storeData } from '@/lib/Storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


const App = () => {
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

    notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
      setNotification(notification);
      await storeData(notification,"notification");
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
    <View style={styles.container}>

      <View style={styles.card}>

        <View>
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
                  <Text style={{ fontSize: 24, fontWeight: "600", color: "#2e86c1" }}>
                    {`${Math.round(fill)}%`}
                  </Text>
                )
              }
            </AnimatedCircularProgress>
          </Link>
          <Text style={styles.cardDesc}>Attendance</Text>
        </View>

        <View>
          <View style={{
            backgroundColor: "#fff", padding: 20, borderRadius: 15, justifyContent: "center",
            alignItems: "center", gap: 4, width: 120, height: 120,

          }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', textTransform: "uppercase", color: "red" }}>WAIT</Text>
          </View>
          <Text style={styles.cardDesc}>Satus</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => sendPushNotification(expoPushToken)}>
        <FontAwesome name="send-o" size={24} color="#fff" />
        <Text style={styles.btnTxt}>Send notice</Text>
      </TouchableOpacity>


    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  cardDesc: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "400"
  },
  btn: {
    backgroundColor: "#2e86c1",
    padding: 15,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  btnTxt: {
    color: "#fff",
    fontSize: 18,
    textTransform: 'uppercase'
  },
  card: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    justifyContent: "space-between"
  }
});