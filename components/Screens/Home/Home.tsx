import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React from "react";
import { PRIMARY_COLOUR, SECONDARY_COLOUR } from "../../../constants/basic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParams } from "../../Navigators/MainNavigator";
import Header from "../../Header/Header";
import { FlatList } from "react-native-gesture-handler";
import Semester from "../../Cards/Semester";

type HomeProps = StackScreenProps<MainStackParams, "Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const clearMe = async () => {
    try {
      await AsyncStorage.removeItem("@me");
      navigation.replace("Onboarding");
    } catch (error) {
      console.log(error);
    }
  };

  const semesters = [
    {
      start: "Sept 7, 2022",
      end: "Dec 12, 2022",
      name: "Fall",
      color: '#7dafff66'
    },
    {
      start: "Jan 8, 2023",
      end: "Apr 13, 2023",
      name: "Winter",
      color: '#fff07d66'
    },
    {
      start: "Jun 9, 2023",
      end: "Aug 14, 2023",
      name: "Summer",
      color: '#ff7de166'
    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={{width: '100%', borderBottomWidth: 2.5, borderBottomColor: SECONDARY_COLOUR, paddingBottom: 10}}>
          <Header />
          <View style={styles.title}>
            <Text style={styles.titleText}>Semesters</Text>
          </View>
          <Pressable style={styles.createButton} onPress={() => clearMe()}>
            <Text style={styles.createButtonText}>create new semester</Text>
          </Pressable>
        </View>
        <FlatList
          style={styles.semesterList}
          data={semesters}
          renderItem={({ item }) => <Semester item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: PRIMARY_COLOUR,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 50,
    fontWeight: "800",
  },
  createButton: {
    width: "100%",
    height: 60,
    backgroundColor: SECONDARY_COLOUR,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: "700",
    color: PRIMARY_COLOUR,
  },
  semesterList: {
    width: "100%",
  },
});
