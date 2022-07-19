import {StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import RadialGradient from 'react-native-radial-gradient';

interface BackgroundProps {}

const Background: React.FC<BackgroundProps> = () => {
    const translateCircle1 = useSharedValue(0);
    const translateCircle2 = useSharedValue(0);
    const translateCircle3 = useSharedValue(0);

    const rand = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const circle1Styles = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateCircle1.value },
          { translateY: translateCircle1.value },
        ],
      };
    }, []);

    const circle2Styles = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateCircle2.value },
          { translateY: translateCircle2.value },
        ],
      };
    }, []);

    const circle3Styles = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateCircle3.value },
          { translateY: translateCircle3.value },
        ],
      };
    }, []);

    const animateCircle1 = () => {
        translateCircle1.value = withTiming(rand(-250, 250), {duration: 10000}, () => {
            animateCircle1();
        })
    }

    const animateCircle2 = () => {
        translateCircle2.value = withTiming(rand(-250, 250), {duration: 10000}, () => {
            animateCircle2();
        })
    }

    const animateCircle3 = () => {
        translateCircle3.value = withTiming(rand(-250, 250), {duration: 10000}, () => {
            animateCircle3();
        })
    }

    useEffect(() => {
    //   animateCircle1();
    //   animateCircle2();
    //   animateCircle3();
    }, []);

    const AnimatedRadialGradient = Animated.createAnimatedComponent(RadialGradient);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
          <AnimatedRadialGradient colors={["#ffff004D", "#ffffff00"]} style={[styles.gradient, circle1Styles]}/>
          <AnimatedRadialGradient colors={["#00ff004D", "#ffffff00"]} style={[styles.gradient, circle2Styles]}/>
          <AnimatedRadialGradient colors={["#00ffff4D", "#ffffff00"]} style={[styles.gradient, circle3Styles, {top: 0}]}/>
      </View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -10,
  },
  container: {
    flex: 1,
    position: "relative",
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradient: {
    width: 350,
    height: 350,
    position: 'absolute',
    zIndex: -2
  },
  blur: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    zIndex: -1
  },
});
