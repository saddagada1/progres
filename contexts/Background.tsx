import { runTiming, SkiaMutableValue, useValue } from "@shopify/react-native-skia";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

interface BackgroundValues {
  circle1XPosition: SkiaMutableValue<number>;
  circle1YPosition: SkiaMutableValue<number>;
  circle2XPosition: SkiaMutableValue<number>;
  circle2YPosition: SkiaMutableValue<number>;
  circle3XPosition: SkiaMutableValue<number>;
  circle3YPosition: SkiaMutableValue<number>;
  circle4XPosition: SkiaMutableValue<number>;
  circle4YPosition: SkiaMutableValue<number>;
}

const BackgroundContext = createContext<BackgroundValues | null>(null);

interface BackgroundProviderProps {
  children: React.ReactNode;
}

const BackgroundProvider: React.FC<BackgroundProviderProps> = ({
  children,
}) => {
  const { width, height } = useWindowDimensions();
  const circle1XPosition = useValue(0);
  const circle1YPosition = useValue(0);
  const circle2XPosition = useValue(width);
  const circle2YPosition = useValue(0);
  const circle3XPosition = useValue(0);
  const circle3YPosition = useValue(height);
  const circle4XPosition = useValue(width);
  const circle4YPosition = useValue(height);
  const [animate, setAnimate] = useState(true);
  const [animsEnded, setAnimsEnded] = useState(0);

  const rand = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const animateCircle = (
    x: SkiaMutableValue<number>,
    y: SkiaMutableValue<number>
  ) => {
    const animateX = () => {
      const randomX = rand(0, width);
      x &&
        runTiming(
          x,
          randomX,
          { duration: Math.abs(((x.current - randomX) / 10) * 1000) },
          () => {
            animate && setAnimsEnded((animsEnded) => animsEnded + 1);
          }
        );
    };
    const animateY = () => {
      const randomY = rand(0, height);
      y &&
        runTiming(
          y,
          randomY,
          { duration: Math.abs(((y.current - randomY) / 10) * 1000) },
          () => {
            animate && setAnimsEnded((animsEnded) => animsEnded + 1);
          }
        );
    };
    animateX();
    animateY();
  };

  const animateCircles = () => {
    animateCircle(
      circle1XPosition,
      circle1YPosition
    );
    animateCircle(
      circle2XPosition,
      circle2YPosition
    );
    animateCircle(
      circle3XPosition,
      circle3YPosition
    );
    animateCircle(
      circle4XPosition,
      circle4YPosition
    );
  };

  useEffect(() => {
    if (animsEnded === 8) {
      setAnimsEnded(0);
      setAnimate(false);
    }
  }, [animsEnded]);

  useEffect(() => {
    let runAnim: NodeJS.Timeout | null = null;

    if (!animate) {
      console.log("timeout set");
      runAnim = setTimeout(() => {
        setAnimate(true);
      }, 1000 * 30);
    } else {
      console.log("anim start");
      animateCircles();
    }

    return () => {
      runAnim && clearTimeout(runAnim);
    };
  }, [animate]);

  return (
    <BackgroundContext.Provider
      value={{
        circle1XPosition,
        circle1YPosition,
        circle2XPosition,
        circle2YPosition,
        circle3XPosition,
        circle3YPosition,
        circle4XPosition,
        circle4YPosition,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackgroundContext = () => useContext(BackgroundContext);

export default BackgroundProvider;
