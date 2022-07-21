import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ACCENT_COLOUR, PRIMARY_COLOUR } from "../../constants/basic";
import Icon from "react-native-vector-icons/Feather";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface SelectProps {
  initialValue: string;
  values: string[];
  width?: string | number;
  height?: string | number;
  onValueChange: React.Dispatch<React.SetStateAction<string>>
}

const Select: React.FC<SelectProps> = ({
  initialValue,
  values,
  width,
  height,
  onValueChange
}) => {
  const [trigger, setTrigger] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const dropdownHeight = useSharedValue(0);
  const dropdownStyle = useAnimatedStyle(() => {
    return {
      height: `${dropdownHeight.value}%`,
    };
  }, []);

  const handleTrigger = () => {
    if (trigger) {
      dropdownHeight.value = withSpring(100 * values.length);
    } else {
      dropdownHeight.value = withTiming(0);
    }
  };

  useEffect(() => {
    handleTrigger();
  }, [trigger])

  useEffect(() => {
    onValueChange(selectedValue);
  }, [selectedValue])
  

  return (
    <View style={[styles.root, { width, height }]}>
      <Pressable
        style={styles.rowContainer}
        onPress={() => setTrigger(!trigger)}
      >
        <Text style={[styles.text, !selectedValue ? styles.accentText : null]}>{!selectedValue ? initialValue : selectedValue}</Text>
        <Icon
          name={trigger ? "chevron-up" : "chevron-down"}
          size={20}
          color={ACCENT_COLOUR}
        />
      </Pressable>
      <Animated.View style={[styles.dropdown, {borderBottomWidth: trigger ? StyleSheet.hairlineWidth : 0}, dropdownStyle]}>
        {values.map((value, index) => (
          <Pressable
            key={index}
            style={[
              styles.value,
              index !== values.length - 1 ? styles.divider : null,
            ]}
            onPress={() => {setSelectedValue(value); setTrigger(false)}}
          >
            <Text style={styles.text}>{value}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  root: {
  },
  rowContainer: {
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ACCENT_COLOUR,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  text: {
    fontSize: 18,
    fontFamily: "Inter",
  },
  accentText: {
    color: ACCENT_COLOUR
  },
  dropdown: {
    width: "100%",
    position: "absolute",
    top: "100%",
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: ACCENT_COLOUR,
    backgroundColor: PRIMARY_COLOUR,
    zIndex: 1,
    overflow: 'hidden'
  },
  value: {
    padding: 10,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ACCENT_COLOUR,
  },
});
