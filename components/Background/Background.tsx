import {StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Canvas, Circle, useValue, RadialGradient, vec, runTiming, useComputedValue, SkiaMutableValue } from "@shopify/react-native-skia";
import { useBackgroundContext } from "../../contexts/Background";
import { PRIMARY_COLOUR } from "../../constants/basic";

interface BackgroundProps {}

const Background: React.FC<BackgroundProps> = () => {
    const backgroundCtx = useBackgroundContext();
    const { width, height } = useWindowDimensions();
    const radius = width;
    const radial1Position = useComputedValue(() => {
        return vec(backgroundCtx?.circle1XPosition.current, backgroundCtx?.circle1YPosition.current)
    }, [backgroundCtx?.circle1XPosition, backgroundCtx?.circle1YPosition]);
    const radial2Position = useComputedValue(() => {
        return vec(backgroundCtx?.circle2XPosition.current, backgroundCtx?.circle2YPosition.current)
    }, [backgroundCtx?.circle2XPosition, backgroundCtx?.circle2YPosition]);
    const radial3Position = useComputedValue(() => {
        return vec(backgroundCtx?.circle3XPosition.current, backgroundCtx?.circle3YPosition.current)
    }, [backgroundCtx?.circle3XPosition, backgroundCtx?.circle3YPosition]);
    const radial4Position = useComputedValue(() => {
        return vec(backgroundCtx?.circle4XPosition.current, backgroundCtx?.circle4YPosition.current)
    }, [backgroundCtx?.circle4XPosition, backgroundCtx?.circle4YPosition]);
    const [animate, setAnimate] = useState(true);
    const [animsEnded, setAnimsEnded] = useState(0);

    const rand = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const animateCircle = (x: SkiaMutableValue<number> | undefined, y: SkiaMutableValue<number> | undefined) => {
        const animateX = () => {
            const randomX = rand(0, width)
            x && runTiming(x, randomX, {duration: Math.abs((x.current - randomX)/10 * 1000)}, () => {
                setAnimsEnded(animsEnded => animsEnded + 1);
            })
        }
        const animateY = () => {
            const randomY = rand(0, height)
            y && runTiming(y, randomY, {duration: Math.abs((y.current - randomY)/10 * 1000)}, () => {
                setAnimsEnded(animsEnded => animsEnded + 1);
            })
        }
        animateX();
        animateY();
    }

    const animateCircles = () => {
        animateCircle(backgroundCtx?.circle1XPosition, backgroundCtx?.circle1YPosition);
        animateCircle(backgroundCtx?.circle2XPosition, backgroundCtx?.circle2YPosition);
        animateCircle(backgroundCtx?.circle3XPosition, backgroundCtx?.circle3YPosition);
        animateCircle(backgroundCtx?.circle4XPosition, backgroundCtx?.circle4YPosition);
    }
    
    useEffect(() => {
      if (animsEnded === 8) {
        setAnimsEnded(0);
        setAnimate(false);
      }
    }, [animsEnded])
    
    useEffect(() => {
     let runAnim: NodeJS.Timeout | null = null;
     
     if (!animate) {
        console.log('timeout set')
        runAnim = setTimeout(() => {
            setAnimate(true);
         }, 1000 * 30);
     } else {
        console.log('anim start')
        animateCircles();
     }

     return () => {
        runAnim && clearTimeout(runAnim)
     }
    }, [animate])
    
    

  return (
    <View style={styles.root}>
      <Canvas style={styles.container}>
        <Circle cx={backgroundCtx?.circle1XPosition} cy={backgroundCtx?.circle1YPosition} r={radius}>
            <RadialGradient c={radial1Position} r={radius} colors={["#ffff004D", "#ffffff00"]}/>
        </Circle>
        <Circle cx={backgroundCtx?.circle2XPosition} cy={backgroundCtx?.circle2YPosition} r={radius}>
            <RadialGradient c={radial2Position} r={radius} colors={["#00ff004D", "#ffffff00"]}/>
        </Circle>
        <Circle cx={backgroundCtx?.circle3XPosition} cy={backgroundCtx?.circle3YPosition} r={radius}>
            <RadialGradient c={radial3Position} r={radius} colors={["#00ffff4D", "#ffffff00"]}/>
        </Circle>
        <Circle cx={backgroundCtx?.circle4XPosition} cy={backgroundCtx?.circle4YPosition} r={radius}>
            <RadialGradient c={radial4Position} r={radius} colors={["#ff00ff4D", "#ffffff00"]}/>
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
    backgroundColor: PRIMARY_COLOUR
  },
  container: {
    flex: 1
  },
});
