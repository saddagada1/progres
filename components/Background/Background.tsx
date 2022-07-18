import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface BackgroundProps {}

const Background: React.FC<BackgroundProps> = () => {
  const scaleCircle = useSharedValue(1);
  const translateCircle1 = useSharedValue(0);
  const translateCircle2 = useSharedValue(0);
  const translateCircle3 = useSharedValue(0);

  const circle1Styles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleCircle.value },
        { translateX: translateCircle1.value + 2},
        { translateY: translateCircle1.value * 0.5 },
      ],
    };
  }, []);

  const circle2Styles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleCircle.value },
        { translateX: translateCircle2.value + 2 },
        { translateY: -translateCircle2.value * 0.25},
      ],
    };
  }, []);

  const circle3Styles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleCircle.value },
        { translateX: translateCircle3.value * 1.5},
        { translateY: translateCircle3.value * 0.5},
      ],
    };
  }, []);

  useEffect(() => {
    scaleCircle.value = withRepeat(withTiming(0.75, {duration: 10000}), -1, true);
    translateCircle1.value = withRepeat(withTiming(-250, {duration: 10000}), -1, true);
    translateCircle2.value = withRepeat(withTiming(250, {duration: 10000}), -1, true);
    translateCircle3.value = withRepeat(withTiming(-150, {duration: 10000}), -1, true);
    return () => {};
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Animated.View style={[styles.circle, styles.circle1, circle1Styles]}>
          <LinearGradient colors={["#ffff00", "#ff0000"]} style={styles.gradient}/>
        </Animated.View>
        <Animated.View style={[styles.circle, styles.circle2, circle2Styles]}>
          <LinearGradient colors={["#ff00ff", "#0000ff"]} style={styles.gradient}/>
        </Animated.View>
        <Animated.View style={[styles.circle, styles.circle3, circle3Styles]}>
          <LinearGradient colors={["#00ff00", "#00ffff"]} style={styles.gradient}/>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    position: "absolute",
    zIndex: -10,
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    position: "relative",
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    position: "absolute",
    overflow: 'hidden'
  },
  circle1: {
    top: 0,
    right: 0
  },
  circle2: {
    top: '35%',
    left: 0
  },
  circle3: {
    bottom: 0,
    right: 0
  },
  gradient: {
    width: '100%',
    height: '100%'
  }
});
