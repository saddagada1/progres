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
import { SemesterSchema } from "../../contexts/Data";

interface SemesterCardProps {
  semester: SemesterSchema;
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
            <Text numberOfLines={1} style={styles.name}>{semester.semestername}</Text>
            <Text numberOfLines={1} style={styles.smallText}>
              {semester.semesterstartdate.slice(2)} - {semester.semesterenddate.slice(2)}
            </Text>
          </View>
          <View style={styles.gpaContainer}>
            <Text style={styles.gpa}>TBD</Text>
            <Text style={styles.smallText}>GPA</Text>
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
    marginHorizontal: 20,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: ACCENT_COLOUR,
  },
  name: {
    flex: 1,
    fontSize: 25,
    fontFamily: "InterBold",
  },
  smallText: {
    fontSize: 15,
    fontFamily: "Inter",
    color: ACCENT_COLOUR
  },
  gpaContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  gpa: {
    flex: 1,
    fontSize: 25,
    fontFamily: "InterBold",
    textAlign: 'center'
  }
});
