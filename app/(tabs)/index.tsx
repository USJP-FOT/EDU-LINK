import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const App = () => {

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.btn} onPress={() =>{}}>
        <FontAwesome5 name="lock-open" size={24} color="#fff" />
        <Text style={styles.btnTxt}>UNLOCK</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View>
          <Link href={"/attendance"}>
            <AnimatedCircularProgress
              size={120}
              width={12}
              fill={45}
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

      <TouchableOpacity style={styles.btn} onPress={() => router.push("/notice")}>
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
    alignItems: "center",
  },
  cardDesc: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "400"
  },
  btn: {
    backgroundColor: "#2e86c1",
    paddingVertical: 15,
    paddingHorizontal: 35,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40
  },
  btnTxt: {
    color: "#fff",
    fontSize: 18,
    textTransform: 'uppercase'
  },
  card: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    justifyContent: "space-between"
  }
});