import { StyleSheet, Text, View, Image, useWindowDimensions, ImageSourcePropType } from 'react-native'
import React from 'react'
import { onboardingSlide } from '../constants/onboardingSlides';
import { PRIMARY_COLOUR, SECONDARY_COLOUR } from '../constants/basic';

interface OnboardingItemProps {
    item: onboardingSlide
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({item}) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image style={[styles.image, {width, resizeMode: 'contain'}]} source={item.source}/>

      <View style={{flex: 0.3, width, backgroundColor: SECONDARY_COLOUR, justifyContent: 'center'}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        fontSize: 40,
        marginBottom: 10,
        textAlign: 'center',
        color: PRIMARY_COLOUR
    },
    description: {
        fontWeight: '300',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 64,
        color: PRIMARY_COLOUR
    }
})