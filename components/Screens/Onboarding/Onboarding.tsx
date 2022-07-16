import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  ViewToken,
  Text,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState } from "react";
import { onboardingSlides } from "../../../constants/onboardingSlides";
import OnboardingItem from "./components/OnboardingItem";
import { PRIMARY_COLOUR, SECONDARY_COLOUR } from "../../../constants/basic";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParams } from "../../Navigators/MainNavigator";

type OnboardingProps = StackScreenProps<MainStackParams, 'Onboarding'>

const Onboarding: React.FC<OnboardingProps> = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  const slidesRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (info.viewableItems[0]) {
        setCurrentIndex(info.viewableItems[0].index);
      }
    }
  ).current;

  const handleNext = (index: number) => {
    slidesRef.current?.scrollToIndex({ animated: true, index });
  };

  const handleSkip = () => {
    slidesRef.current?.scrollToIndex({
      animated: true,
      index: onboardingSlides.length - 1,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.75 }}>
        <FlatList
          data={onboardingSlides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          ref={slidesRef}
        />
      </View>
      <View
        style={{
          flex: 0.05,
          flexDirection: "row",
          backgroundColor: SECONDARY_COLOUR,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {onboardingSlides.map((slide, index) => (
          <View
            key={slide.id}
            style={
              index === currentIndex
                ? styles.pageIndicatorSelected
                : styles.pageIndicator
            }
          />
        ))}
      </View>
      <View
        style={{
          flex: 0.2,
          backgroundColor: SECONDARY_COLOUR,
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {currentIndex !== null &&
        currentIndex === onboardingSlides.length - 1 ? (
          <Pressable style={styles.getStartedButton} onPress={() => navigation.push('ProfileSetup')}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </Pressable>
        ) : (
          <>
            <Pressable style={styles.skipButton} onPress={() => handleSkip()}>
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
            <Pressable
              style={styles.nextButton}
              onPress={() =>
                currentIndex !== null &&
                currentIndex < onboardingSlides.length - 1
                  ? handleNext(currentIndex + 1)
                  : currentIndex !== null && handleNext(currentIndex)
              }
            >
              <Text style={styles.nextText}>Next</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOUR,
  },
  pageIndicator: {
    width: 10,
    height: 5,
    backgroundColor: "#969696",
    margin: 10,
    borderRadius: 15,
  },
  pageIndicatorSelected: {
    width: 20,
    height: 5,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 15,
  },
  skipButton: {
    width: "40%",
    height: "40%",
    borderWidth: 2.5,
    borderColor: "#fff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    fontWeight: "800",
    fontSize: 20,
    color: "#fff",
  },
  nextButton: {
    width: "40%",
    height: "40%",
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    fontWeight: "800",
    fontSize: 20,
  },
  getStartedButton: {
    width: "80%",
    height: "40%",
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedText: {
    fontWeight: "800",
    fontSize: 25,
  },
});
