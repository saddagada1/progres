import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ACCENT_COLOUR,
  ERROR_COLOUR,
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
import { useDataContext } from "../../contexts/Data";

interface CreateInstitutionModalProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  institutionId: number;
  institutionName: string;
}

const CreateInstitutionModal: React.FC<CreateInstitutionModalProps> = ({
  trigger,
  setTrigger,
  institutionId,
  institutionName,
}) => {
  const dataCtx = useDataContext();
  const { width, height } = useWindowDimensions();
  const [name, setName] = useState("");
  const [useCalculatedGpa, setUseCalculatedGpa] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [icon, setIcon] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gpa, setGpa] = useState("");
  const [errors, setErrors] = useState("");
  const [triggerEmojiPicker, setTriggerEmojiPicker] = useState(false);
  const modalPosition = useSharedValue(height);
  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: modalPosition.value }],
    };
  }, []);

  const isValidFloat = (value: string) => {
    return /^-?[\d]*(\.[\d]+)?$/g.test(value);
  };

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
    setUseCalculatedGpa(true);
    setCompleted(true);
    setErrors("");
    setIcon("");
    setGpa("");
  };

  const handleSubmit = () => {
    if (!name || !startDate || !endDate || !icon) {
      setErrors("Required Fields Left Empty");
      return;
    } else {
      if (!useCalculatedGpa && !gpa) {
        setErrors("Please Enter a GPA");
        return;
      } else if (useCalculatedGpa) {
        setErrors("");
        dataCtx?.createSession(
          institutionId,
          institutionName,
          name,
          startDate,
          endDate,
          icon,
          1
        );
        setTrigger(false);
      } else {
        const isValid = isValidFloat(gpa);
        if (!isValid) {
          setErrors("Please Enter a Valid GPA");
          return;
        }
        const parsedGpa = parseFloat(gpa);
        if (parsedGpa > 4 || parsedGpa <= 0) {
          setErrors("Please Enter a Valid GPA");
          return;
        }
        setErrors("");
        dataCtx?.createSession(
          institutionId,
          institutionName,
          name,
          startDate,
          endDate,
          icon,
          0,
          parsedGpa
        );
        setTrigger(false);
      }
    }
  };

  useEffect(() => {
    handleCreateModalToggle();
    if (!trigger) {
      reset();
    }
  }, [trigger]);

  useEffect(() => {
    setStartDate("");
    !completed ? setEndDate("Present") : setEndDate("");
  }, [completed]);

  return (
    <Animated.View
      style={[
        styles.root,
        { width: width * 0.9, height: errors ? height * 0.875 : height * 0.83 },
        modalStyle,
      ]}
    >
      <Text style={styles.header}>New Session</Text>
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
        <View style={styles.inlineRowContainer}>
          <Text style={styles.label}>Icon</Text>
          <Pressable onPress={() => setTriggerEmojiPicker(true)}>
            <Text style={styles.icon}>{icon}</Text>
          </Pressable>
        </View>
        {!useCalculatedGpa && (
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
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Use Calculated GPA</Text>
        <Switch
          trackColor={{ false: ACCENT_COLOUR, true: SECONDARY_COLOUR }}
          thumbColor={PRIMARY_COLOUR}
          ios_backgroundColor={ACCENT_COLOUR}
          onValueChange={() => setUseCalculatedGpa(!useCalculatedGpa)}
          value={useCalculatedGpa}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>
          {completed ? "Date Range" : "Start Date"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.smallText}>Completed?</Text>
          <Switch
            trackColor={{ false: ACCENT_COLOUR, true: SECONDARY_COLOUR }}
            thumbColor={PRIMARY_COLOUR}
            ios_backgroundColor={ACCENT_COLOUR}
            onValueChange={() => setCompleted(!completed)}
            value={completed}
          />
        </View>
      </View>
      <View
        style={[styles.calendar, { width: width * 0.8, height: height * 0.35 }]}
      >
        {trigger && (
          <CalendarPicker
            key={completed}
            allowRangeSelection={completed}
            selectedDayColor={ACCENT_COLOUR}
            selectedDayTextColor={PRIMARY_COLOUR}
            textStyle={{ fontFamily: "Inter", fontSize: 15 }}
            width={width * 0.75}
            onDateChange={(date, type) => {
              type === "START_DATE"
                ? date && setStartDate(date.format("MM/DD/YY"))
                : date && setEndDate(date.format("MM/DD/YY"));
            }}
          />
        )}
      </View>
      {errors ? <Text style={styles.errors}>{errors}</Text> : null}
      <View style={[styles.rowContainer, styles.actions]}>
        <Pressable style={{ flex: 1 }} onPress={() => setTrigger(false)}>
          <Text style={[styles.exit, styles.button]}>Exit</Text>
        </Pressable>
        <Pressable style={{ flex: 1 }} onPress={() => handleSubmit()}>
          <Text style={[styles.submit, styles.button]}>Create</Text>
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

export default CreateInstitutionModal;

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
  smallText: {
    fontSize: 18,
    fontFamily: "Inter",
    color: ACCENT_COLOUR,
  },
  errors: {
    fontSize: 15,
    fontFamily: "Inter",
    color: SECONDARY_COLOUR,
    marginVertical: 20,
    backgroundColor: ERROR_COLOUR + "33",
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});
