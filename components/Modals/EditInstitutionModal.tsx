import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ACCENT_COLOUR,
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
} from "../../constants/basic";
import Select from "../Select/Select";
import EmojiPicker from "rn-emoji-keyboard";
import CalendarPicker from "react-native-calendar-picker";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { InstitutionSchema, useDataContext } from "../../contexts/Data";
import moment from "moment";

interface EditInstitutionModalProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  institution: InstitutionSchema;
}

const EditInstitutionModal: React.FC<EditInstitutionModalProps> = ({
  trigger,
  setTrigger,
  institution,
}) => {
  const dataCtx = useDataContext();
  const { width, height } = useWindowDimensions();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gpa, setGpa] = useState("");
  const [dateChanged, setDateChanged] = useState(false);
  const [triggerEmojiPicker, setTriggerEmojiPicker] = useState(false);
  const calendarRef = useRef<CalendarPicker | null>(null)
  const modalPosition = useSharedValue(height);
  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: modalPosition.value }],
    };
  }, []);

  const handleCreateModalToggle = () => {
    if (trigger) {
      modalPosition.value = withSpring(0, { damping: 14 });
    } else {
      modalPosition.value = withTiming(height, { duration: 500 });
    }
  };

  const reset = () => {
    setName("");
    setStartDate("");
    setEndDate("");
    setStatus("");
    setIcon("");
    setGpa("");
    setDateChanged(false);
  };

  const handleSubmit = () => {
    // if (status === "Graduated" && !gpa) {
    //   return;
    // } else if (status === "Attending") {
    //   dataCtx?.updateInstitution(
    //     institution.institutionid,
    //     name ? name : institution.institutionname,
    //     startDate ? startDate : institution.institutionstartdate,
    //     endDate ? endDate : institution.institutionenddate,
    //     icon ? icon : institution.institutionicon,
    //     status ? status : institution.institutionstatus
    //   );
    //   setTrigger(false);
    // } else {
    //   dataCtx?.updateInstitution(
    //     institution.institutionid,
    //     name ? name : institution.institutionname,
    //     startDate ? startDate : institution.institutionstartdate,
    //     endDate ? endDate : institution.institutionenddate,
    //     icon ? icon : institution.institutionicon,
    //     status ? status : institution.institutionstatus,

    //   );
    //   setTrigger(false);
    // }
  };

  useEffect(() => {
    handleCreateModalToggle();
    // setName(institution.institutionname);
    // setStatus(institution.institutionstatus);
    // setIcon(institution.institutionicon);
    // setStartDate(institution.institutionstartdate);
    // setEndDate(institution.institutionenddate);
    // institution.institutiongpa
    //   ? setGpa(institution.institutiongpa.toString())
    //   : setGpa("");
    if (!trigger) {
      reset();
    }
  }, [trigger]);

  useEffect(() => {
    status === "Attending"
      ? setEndDate("Present")
      : setEndDate(institution.institutionenddate);
  }, [status]);

  return (
    <Animated.View
      style={[
        styles.root,
        { width: width * 0.9, height: height * 0.85 },
        modalStyle,
      ]}
    >
      <Text style={styles.header}>Edit Institution</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setName(value)}
          value={name}
          maxLength={25}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Status</Text>
        {trigger && (
          <Select
            initialValue={status}
            values={["Graduated", "Attending"]}
            width="50%"
            onValueChange={setStatus}
          />
        )}
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.inlineRowContainer}>
          <Text style={styles.label}>Icon</Text>
          <Pressable onPress={() => setTriggerEmojiPicker(true)}>
            <Text style={styles.icon}>{icon}</Text>
          </Pressable>
        </View>
        {status === "Graduated" && (
          <View style={[styles.inlineRowContainer, { marginLeft: 20 }]}>
            <Text style={styles.label}>GPA</Text>
            <TextInput
              style={styles.gpaInput}
              onChangeText={(value) => setGpa(value)}
              value={gpa}
              maxLength={4}
              keyboardType="numeric"
            />
          </View>
        )}
      </View>
      <Text style={styles.label}>Date</Text>
      <View
        style={[styles.calendar, { width: width * 0.8, height: height * 0.35 }]}
      >
        {trigger && (
          <CalendarPicker
            allowRangeSelection={status === "Graduated"}
            selectedDayColor={ACCENT_COLOUR}
            selectedDayTextColor={PRIMARY_COLOUR}
            textStyle={{ fontFamily: "Inter", fontSize: 15 }}
            width={width * 0.75}
            selectedStartDate={
              !dateChanged ? moment(startDate, "MM/DD/YY").toDate() : undefined
            }
            selectedEndDate={
              !dateChanged && endDate !== "Present"
                ? moment(endDate, "MM/DD/YY").toDate()
                : undefined
            }
            onDateChange={(date, type) => {
              setDateChanged(true);
              type === "START_DATE"
                ? date && setStartDate(date.format("MM/DD/YY"))
                : date && setEndDate(date.format("MM/DD/YY"));
            }}
          />
        )}
      </View>
      <View style={[styles.rowContainer, styles.actions]}>
        <Pressable style={{ flex: 1 }} onPress={() => setTrigger(false)}>
          <Text style={[styles.exit, styles.button]}>Exit</Text>
        </Pressable>
        <Pressable style={{ flex: 1 }} onPress={() => handleSubmit()}>
          <Text style={[styles.submit, styles.button]}>Save</Text>
        </Pressable>
      </View>
      <EmojiPicker
        open={triggerEmojiPicker}
        onClose={() => setTriggerEmojiPicker(false)}
        onEmojiSelected={(emoji) => setIcon(emoji.emoji)}
        backdropColor="#00000000"
        knobStyles={{ backgroundColor: ACCENT_COLOUR + "33" }}
      />
    </Animated.View>
  );
};

export default EditInstitutionModal;

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    backgroundColor: PRIMARY_COLOUR,
    zIndex: 10,
    elevation: 20,
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontFamily: "InterBold",
    marginBottom: 20,
  },
  label: {
    fontSize: 25,
    fontFamily: "Inter",
    color: ACCENT_COLOUR,
    alignSelf: "flex-start",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ACCENT_COLOUR,
    borderRadius: 10,
    fontSize: 18,
    fontFamily: "Inter",
    padding: 10,
    marginLeft: 20,
  },
  gpaInput: {
    flex: 1,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ACCENT_COLOUR,
    borderRadius: 10,
    fontSize: 18,
    fontFamily: "Inter",
    padding: 10,
    marginLeft: 20,
    textAlign: "center",
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inlineRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ACCENT_COLOUR,
    borderRadius: 10,
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center",
  },
  calendar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ACCENT_COLOUR,
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  actions: {
    position: "absolute",
    bottom: 0,
  },
  button: {
    padding: 10,
    fontSize: 25,
    fontFamily: "Inter",
    textAlign: "center",
    borderRadius: 20,
    margin: 10,
  },
  exit: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ACCENT_COLOUR,
  },
  submit: {
    backgroundColor: SECONDARY_COLOUR,
    color: PRIMARY_COLOUR,
  },
});
