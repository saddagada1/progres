import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SECONDARY_COLOUR } from "../../constants/basic";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface SemesterProps {
  item: any;
}

const Semester: React.FC<SemesterProps> = ({ item }) => {
  return (
    <View style={[styles.container, {backgroundColor: item.color}]}>
      <Text numberOfLines={1} style={styles.date}>{item.start} - {item.end}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <Pressable>
            <FontAwesomeIcon size={30} icon={ faGear } />
        </Pressable>
      </View>
    </View>
  );
};

export default Semester;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 125,
    marginTop: 20,
    borderWidth: 2.5,
    borderColor: SECONDARY_COLOUR,
    borderRadius: 15,
    padding: 15,
    justifyContent: 'space-between',
  },
  date: {
    width: '100%',
    fontSize: 15,
    fontWeight: '800'
  },
  name: {
    flex: 0.75,
    fontSize: 40,
    fontWeight: '800'
  }
});
