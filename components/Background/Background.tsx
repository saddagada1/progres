import {StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Canvas, Circle, useValue, RadialGradient, vec, runTiming, useComputedValue, SkiaMutableValue } from "@shopify/react-native-skia";

interface BackgroundProps {}

const Background: React.FC<BackgroundProps> = () => {
    const { width, height } = useWindowDimensions();
    const radius = width;
    const circle1XPosition = useValue(0);
    const circle1YPosition = useValue(0);
    const radial1Position = useComputedValue(() => {
        return vec(circle1XPosition.current, circle1YPosition.current)
    }, [circle1XPosition, circle1YPosition]);
    const circle2XPosition = useValue(width);
    const circle2YPosition = useValue(0);
    const radial2Position = useComputedValue(() => {
        return vec(circle2XPosition.current, circle2YPosition.current)
    }, [circle2XPosition, circle2YPosition]);
    const circle3XPosition = useValue(0);
    const circle3YPosition = useValue(height);
    const radial3Position = useComputedValue(() => {
        return vec(circle3XPosition.current, circle3YPosition.current)
    }, [circle3XPosition, circle3YPosition]);
    const circle4XPosition = useValue(width);
    const circle4YPosition = useValue(height);
    const radial4Position = useComputedValue(() => {
        return vec(circle4XPosition.current, circle4YPosition.current)
    }, [circle4XPosition, circle4YPosition]);
    const [animate, setAnimate] = useState(true);

    const rand = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const animateCircle = (x: SkiaMutableValue<number>, y: SkiaMutableValue<number>) => {
        const animateX = () => {
            const randomX = rand(0, width)
            runTiming(x, randomX, {duration: Math.abs((x.current - randomX)/10 * 1000)}, () => {
                animate && animateX();
            })
        }
        const animateY = () => {
            const randomY = rand(0, height)
            runTiming(y, randomY, {duration: Math.abs((y.current - randomY)/10 * 1000)}, () => {
                animate && animateY();
            })
        }
        animateX();
        animateY();
    }

    useEffect(() => {
     setAnimate(true);
     animateCircle(circle1XPosition, circle1YPosition);
     animateCircle(circle2XPosition, circle2YPosition);
     animateCircle(circle3XPosition, circle3YPosition);
     animateCircle(circle4XPosition, circle4YPosition);

     return () => {
        setAnimate(false);
     }
    }, [])
    

  return (
    <View style={styles.root}>
      <Canvas style={styles.container}>
        <Circle cx={circle1XPosition} cy={circle1YPosition} r={radius}>
            <RadialGradient c={radial1Position} r={radius} colors={["#ffff0066", "#ffffff00"]}/>
        </Circle>
        <Circle cx={circle2XPosition} cy={circle2YPosition} r={radius}>
            <RadialGradient c={radial2Position} r={radius} colors={["#00ff0066", "#ffffff00"]}/>
        </Circle>
        <Circle cx={circle3XPosition} cy={circle3YPosition} r={radius}>
            <RadialGradient c={radial3Position} r={radius} colors={["#00ffff66", "#ffffff00"]}/>
        </Circle>
        <Circle cx={circle4XPosition} cy={circle4YPosition} r={radius}>
            <RadialGradient c={radial4Position} r={radius} colors={["#ff00ff66", "#ffffff00"]}/>
        </Circle>
      </Canvas>
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
    flex: 1
  },
});
