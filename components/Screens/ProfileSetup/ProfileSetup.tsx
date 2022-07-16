import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { PRIMARY_COLOUR, SECONDARY_COLOUR } from "../../../constants/basic";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParams } from "../../Navigators/MainNavigator";
import { useMeContext } from "../../../contexts/Me";

type ProfileSetupProps = StackScreenProps<MainStackParams, 'ProfileSetup'>

const ProfileSetup: React.FC<ProfileSetupProps> = ({navigation}) => {
  const meCtx = useMeContext();
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ name: ""}}
        onSubmit={async (values) => {
          if (!values.name) {
            return
          } else {
            try {
              await AsyncStorage.setItem('@me', values.name);
              meCtx?.setName(values.name);
              navigation.reset({index: 0, routes: [{name: 'Home'}]});
            } catch (error) {
              console.log('Error Setting @me: ', error);
            }
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <Text style={styles.formHeader}>What Should We Call You?</Text>
            <TextInput
              style={styles.formInput}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            <Pressable style={styles.formSubmit} onPress={() => handleSubmit()}>
              <Text style={styles.formSubmitText}>Continue</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOUR,
  },
  formContainer: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formHeader: {
    fontWeight: '800',
    fontSize: 50,
    color: SECONDARY_COLOUR,
    textAlign: 'center',
    marginBottom: 40
  },
  formInput: {
    width: '100%',
    height: 60,
    borderWidth: 2.5,
    borderColor: SECONDARY_COLOUR,
    borderRadius: 15,
    marginBottom: 40,
    padding: 10,
    fontSize: 30,
    fontWeight: '500'
  },
  formSubmit: {
    width: "100%",
    height: 60,
    backgroundColor: SECONDARY_COLOUR,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  formSubmitText: {
    fontWeight: "800",
    fontSize: 25,
    color: PRIMARY_COLOUR
  }
});
