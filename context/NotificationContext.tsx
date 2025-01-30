import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import * as Notifications from "expo-notifications";
import { EventSubscription as Subscription } from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/util/registerForPushNotificationsAsync";
import { getData, storeData } from "@/lib/Storage";

interface NotificationContextType {
  expoPushToken: string | null;
  error: Error | null;
  notificationList: Notifications.Notification[];
  setNotificationList: (value: Notifications.Notification[]) => void;
  setSelect: (index: number) => void;
  select:number | null

}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    )
  }
  return context
};

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const [notificationList, setNotificationList] = useState<Notifications.Notification[]>([]);
  const [select, setSelect] = useState<number | null>(null);

  useEffect(() => {

    const fetchNotifications = async () => {
      const response = await getData("notification") || [];
      console.log("response")
      setNotificationList(response);
    }
    fetchNotifications()

    registerForPushNotificationsAsync().then(
      (token) => setExpoPushToken(token),
      (error) => setError(error)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener(async (notification) => {
        console.log("🔔 Notification Received: ", notification);
        setNotification(notification);
        await storeData(notification, "notification");
      });


    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };

  }, [])


  useEffect(() => {
    if (notification) {
      setNotificationList([...notificationList, notification])
    }
  }, [notification])

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, error, notificationList, setSelect, setNotificationList,select }}
    >
      {children}
    </NotificationContext.Provider>
  );
};