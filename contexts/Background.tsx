import { SkiaMutableValue, useValue } from "@shopify/react-native-skia";
import React, { createContext, useContext } from "react";
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
