import { Pressable, SafeAreaView, StyleSheet, Text} from "react-native";
import React from "react";
import { PRIMARY_COLOUR } from "../../../constants/basic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParams } from "../../Navigators/MainNavigator";

type HomeProps = StackScreenProps<MainStackParams, 'Home'>

const Home: React.FC<HomeProps> = ({navigation}) => {
  const clearMe = async () => {
    try {
        await AsyncStorage.removeItem('@me');
        navigation.replace('Onboarding');
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      <Pressable onPress={() => clearMe()}>
        <Text>redo</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOUR,
  },
});
