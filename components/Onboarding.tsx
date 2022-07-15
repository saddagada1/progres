import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import React, { useRef, useState } from "react";
import { onboardingSlides } from "../constants/onboardingSlides";
import OnboardingItem from "./OnboardingItem";
import { SECONDARY_COLOUR } from "../constants/basic";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  const slidesRef = useRef(null);
  
  const onViewableItemsChanged = (info: {viewableItems: ViewToken[], changed: ViewToken[]}) => {
    console.log(info.viewableItems[0].index);
    //console.log(info.changed);
  };

  return (
    <View>
      <View style={{ flex: 0.85 }}>
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
      <View style={{flex: 0.025, backgroundColor: SECONDARY_COLOUR}}>
        {onboardingSlides.map((slide, index) => {
            <View key={slide.id} style={styles.pageIndicator}></View>
        })}
      </View>
      <View style={{flex: 0.125, backgroundColor: SECONDARY_COLOUR}}>

      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
    pageIndicator: {
        width: 40,
        height: 20,
        backgroundColor: '#fff',
        
    }
});
