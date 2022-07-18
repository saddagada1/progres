import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
} from "../../../constants/basic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParams } from "../../Navigators/MainNavigator";
import Header from "../../Header/Header";
import { FlatList } from "react-native-gesture-handler";
import Semester from "../../Cards/Semester";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";
import CreateSemesterModal from "../../Modals/CreateSemesterModal";
import { useDataContext } from "../../../contexts/Data";
import Background from "../../Background/Background";

type HomeProps = StackScreenProps<MainStackParams, "Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const dataCtx = useDataContext();
  const [triggerCreate, setTriggerCreate] = useState(false);
  // const clearMe = async () => {
  //   try {
  //     await AsyncStorage.removeItem("@me");
  //     navigation.replace("Onboarding");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const semesters = [
    {
      start: "Sept 7, 2022",
      end: "Dec 12, 2022",
      name: "Fall",
      color: "#000000",
    },
    {
      start: "Jan 8, 2023",
      end: "Apr 13, 2023",
      name: "Winter",
      color: "#f2a305",
    },
    {
      start: "Jun 9, 2023",
      end: "Aug 14, 2023",
      name: "Summer",
      color: "#0583f2",
    },
  ];

  useEffect(() => {
    setTestDeviceIDAsync("EMULATOR");
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Background/>
      <CreateSemesterModal trigger={triggerCreate} setTrigger={setTriggerCreate} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header />
          <View style={styles.title}>
            <Text style={styles.titleText}>Semesters</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Pressable style={styles.cgpaButton}>
              <Text style={styles.cgpaText}>Cumulative GPA: 3.75</Text>
            </Pressable>
            <Pressable
              style={styles.createButton}
              onPress={() => setTriggerCreate(true)}
            >
              <FontAwesomeIcon size={25} color={PRIMARY_COLOUR} icon={faPlus} />
            </Pressable>
          </View>
        </View>
        <FlatList
          style={styles.semesterList}
          data={dataCtx?.semesters}
          renderItem={({ item }) => <Semester item={item} />}
          contentContainerStyle={{ alignItems: "center", flex: 1 }}
        />
        <View>
          <AdMobBanner
            bannerSize="smartBannerLandscape"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            servePersonalizedAds
            onDidFailToReceiveAdWithError={(e) => console.log(e)}
          />
        </View>
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
  },
  headerContainer: {
    width: "100%",
    paddingBottom: 10,
    alignItems: "center",
    borderBottomWidth: 2.5,
    borderBottomColor: SECONDARY_COLOUR,
  },
  title: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 50,
    fontWeight: "800",
  },
  buttonsContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  cgpaButton: {
    width: "75%",
    height: 60,
    backgroundColor: SECONDARY_COLOUR,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cgpaText: {
    fontSize: Platform.OS === "ios" ? 20 : 25,
    fontWeight: "800",
    color: PRIMARY_COLOUR,
  },
  createButton: {
    width: "20%",
    height: 60,
    backgroundColor: SECONDARY_COLOUR,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  semesterList: {
    width: "100%",
  }
});
