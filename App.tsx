import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MainNavigator from "./components/Navigators/MainNavigator";
import ContextsProvider from "./contexts/ContextsProvider";
import { useFonts, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterBlack: Inter_900Black
  });

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync();
  }

  if (fontsLoaded) {
    hideSplashScreen()
  }

  return (
    <ContextsProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <MainNavigator />
      </NavigationContainer>
    </ContextsProvider>
  );
}
