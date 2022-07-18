import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { PRIMARY_COLOUR, SECONDARY_COLOUR } from "../../constants/basic";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "expo-linear-gradient";

interface SemesterProps {
  item: any;
}

const Semester: React.FC<SemesterProps> = ({ item }) => {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[item.colour + 'B3', item.colour + '66']}
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 0.0}}
        style={styles.container}
      >
        <Text numberOfLines={1} style={styles.date}>
          {item.startDate} - {item.endDate}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text numberOfLines={1} style={styles.name}>
            {item.name}
          </Text>
          <Pressable>
            <FontAwesomeIcon size={30} color={SECONDARY_COLOUR} icon={faGear} />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Semester;

const styles = StyleSheet.create({
  root: {
    minWidth: "90%",
    height: 125,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: PRIMARY_COLOUR,
    justifyContent: 'center',
    elevation: 10,
    shadowColor: SECONDARY_COLOUR,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
  },
  container: {
    height: '100%',
    padding: 15,
    justifyContent: "space-between",
    borderRadius: 15,
  },
  date: {
    width: "100%",
    fontSize: Platform.OS === 'ios' ? 15 : 17,
    fontWeight: Platform.OS === 'ios' ? "800" : "900",
    color: SECONDARY_COLOUR,
  },
  name: {
    flex: 0.75,
    fontSize: Platform.OS === 'ios' ? 40 : 45,
    fontWeight: Platform.OS === 'ios' ? "800" : "900",
    color: SECONDARY_COLOUR,
  },
});
