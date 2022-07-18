import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal/dist/modal";
import {
  ACCENT_COLOUR,
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
} from "../../constants/basic";
import { Formik } from "formik";
import ColorPicker from "react-native-wheel-color-picker";
import DatePicker from "react-native-modern-datepicker";
import { useDataContext } from "../../contexts/Data";

interface CreateSemesterModalProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateSemesterModal: React.FC<CreateSemesterModalProps> = ({
  trigger,
  setTrigger,
}) => {
  const dataCtx = useDataContext();
  const datepickerOptions = {
    mainColor: SECONDARY_COLOUR,
    textHeaderColor: SECONDARY_COLOUR,
    textSecondaryColor: SECONDARY_COLOUR,
    textDefaultColor: SECONDARY_COLOUR,
    backgroundColor: ACCENT_COLOUR,
  };
  const [triggerStartDate, setTriggerStartDate] = useState(false);
  const [triggerEndDate, setTriggerEndDate] = useState(false);

  useEffect(() => {
    setTriggerStartDate(false);
    setTriggerEndDate(false);
  }, [trigger]);
  return (
    <Modal isVisible={trigger}>
      <View style={styles.modalRoot}>
        <Text style={styles.modalTitle}>Create Semester</Text>
        <Formik
          initialValues={{ name: "", startDate: "", endDate: "", colour: "" }}
          onSubmit={async (values) => {
            if (
              !values.name ||
              !values.startDate ||
              !values.endDate ||
              !values.colour
            ) {
              return;
            } else {
              dataCtx?.createSemester(
                values.name,
                values.startDate,
                values.endDate,
                values.colour
              );
              setTrigger(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setValues }) => (
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Name</Text>
              <TextInput
                style={styles.formInput}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <View style={styles.formDateContainer}>
                <Text style={styles.formLabel}>Start Date</Text>
                <Pressable
                  style={styles.formDate}
                  onPress={() => setTriggerStartDate(true)}
                >
                  <Text style={styles.formDateText}>{values.startDate}</Text>
                </Pressable>
              </View>
              <View style={styles.formDateContainer}>
                <Text style={styles.formLabel}>End Date</Text>
                <Pressable
                  style={styles.formDate}
                  onPress={() => setTriggerEndDate(true)}
                >
                  <Text style={styles.formDateText}>{values.endDate}</Text>
                </Pressable>
              </View>
              <ColorPicker
                color="#000000"
                onColorChangeComplete={(colour: string) =>
                  setValues({
                    name: values.name,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    colour: colour,
                  })
                }
                thumbSize={30}
                sliderSize={30}
                noSnap={true}
                swatches={false}
              />
              <View style={styles.modalActions}>
                <Pressable
                  style={styles.modalExit}
                  onPress={() => setTrigger(false)}
                >
                  <Text style={styles.modalExitText}>Exit</Text>
                </Pressable>
                <Pressable style={styles.modalSubmit} onPress={() => handleSubmit()}>
                  <Text style={styles.modalSubmitText}>Create</Text>
                </Pressable>
              </View>
              {triggerStartDate && (
                <DatePicker
                  mode="calendar"
                  options={datepickerOptions}
                  style={styles.formDatePicker}
                  onSelectedChange={(date: string) => {
                    setValues({
                      name: values.name,
                      startDate: date,
                      endDate: values.endDate,
                      colour: values.colour,
                    });
                    setTriggerStartDate(false);
                  }}
                />
              )}
              {triggerEndDate && (
                <DatePicker
                  mode="calendar"
                  options={datepickerOptions}
                  style={styles.formDatePicker}
                  onSelectedChange={(date: string) => {
                    setValues({
                      name: values.name,
                      startDate: values.startDate,
                      endDate: date,
                      colour: values.colour,
                    });
                    setTriggerEndDate(false);
                  }}
                />
              )}
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default CreateSemesterModal;

const styles = StyleSheet.create({
  modalRoot: {
    width: 375,
    height: 700,
    backgroundColor: PRIMARY_COLOUR,
    borderRadius: 15,
    alignSelf: "center",
  },
  modalTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 35 : 40,
    fontWeight: "800",
    color: SECONDARY_COLOUR,
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  formLabel: {
    fontSize: Platform.OS === "ios" ? 25 : 30,
    fontWeight: "800",
  },
  formInput: {
    height: 50,
    borderWidth: 2.5,
    borderColor: SECONDARY_COLOUR,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    fontWeight: "500",
    fontSize: Platform.OS === "ios" ? 20 : 25,
  },
  formDateContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  formDate: {
    width: 150,
    height: 50,
    borderWidth: 2.5,
    borderColor: SECONDARY_COLOUR,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  formDateText: {
    fontSize: Platform.OS === "ios" ? 20 : 25,
    fontWeight: "500",
  },
  formDatePicker: {
    borderRadius: 15,
    position: "absolute",
    alignSelf: "center",
    top: "20%",
    elevation: 20,
  },
  modalActions: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  modalExit: {
    width: "40%",
    borderWidth: 2.5,
    borderColor: SECONDARY_COLOUR,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalExitText: {
    fontWeight: "800",
    fontSize: 20,
    color: SECONDARY_COLOUR,
  },
  modalSubmit: {
    width: "40%",
    backgroundColor: SECONDARY_COLOUR,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalSubmitText: {
    fontWeight: "800",
    fontSize: 20,
    color: PRIMARY_COLOUR,
  },
});
