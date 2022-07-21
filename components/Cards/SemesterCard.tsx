import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import {
  ACCENT_COLOUR,
  PRIMARY_COLOUR,
  SECONDARY_COLOUR,
} from "../../constants/basic";
import { Semester } from "../../contexts/Data";

interface SemesterCardProps {
  semester: Semester;
}

const SemesterCard: React.FC<SemesterCardProps> = ({ semester }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.root, { minWidth: width * 0.9 }]}>
      <View style={styles.rowContainer}>
        <View
          style={[styles.colour, { backgroundColor: ACCENT_COLOUR + "33" }]}
        />
        <View style={styles.rowContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.date}>
              {semester.semesterstartdate} - {semester.semesterenddate}
            </Text>
            <Text style={styles.name}>{semester.semestername}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SemesterCard;

const styles = StyleSheet.create({
  root: {
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: PRIMARY_COLOUR,
    padding: 20,
    elevation: 5,
    shadowColor: SECONDARY_COLOUR,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  colour: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 20,
  },
  name: {
    fontSize: 25,
    fontFamily: "InterBold",
  },
  date: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter",
    color: ACCENT_COLOUR,
  },
});
