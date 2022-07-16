import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home/Home';
import Onboarding from '../Screens/Onboarding/Onboarding';
import ProfileSetup from '../Screens/ProfileSetup/ProfileSetup';
import Loading from '../Loading/Loading';

export type MainStackParams = {
    Loading: undefined
    Onboarding: undefined
    ProfileSetup: undefined
    Home: undefined
};
const MainStack = createStackNavigator<MainStackParams>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Loading" component={Loading} />
        <MainStack.Screen name="Onboarding" component={Onboarding} />
        <MainStack.Screen name="ProfileSetup" component={ProfileSetup} />
        <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  )
}

export default MainNavigator
