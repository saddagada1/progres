import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home/Home';
import Onboarding from '../Screens/Onboarding/Onboarding';
import ProfileSetup from '../Screens/ProfileSetup/ProfileSetup';
import Loading from '../Loading/Loading';
import Settings from '../Screens/Settings/Settings';
import Institution from '../Screens/Institution/Institution';
import Session from '../Screens/Session/Session';

export type MainStackParams = {
    Loading: undefined
    Onboarding: undefined
    ProfileSetup: undefined
    Settings: undefined
    Home: undefined
    Institution: {institutionid: number, institutionname: string, institutiongpa: number | null}
    Session: {institutionname: string, sessionid: number, sessionname: string, sessiongpa: number | null}
};
const MainStack = createStackNavigator<MainStackParams>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Loading" component={Loading} />
        <MainStack.Screen name="Onboarding" component={Onboarding} />
        <MainStack.Screen name="ProfileSetup" component={ProfileSetup} />
        <MainStack.Screen name='Settings' component={Settings} />
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name='Institution' component={Institution} />
        <MainStack.Screen name='Session' component={Session} />
    </MainStack.Navigator>
  )
}

export default MainNavigator
