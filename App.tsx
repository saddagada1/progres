import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MainNavigator from "./components/Navigators/MainNavigator";
import DataProvider from "./contexts/Data";
import MeProvider from "./contexts/Me";

export default function App() {
  return (
    <DataProvider>
      <MeProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <MainNavigator />
        </NavigationContainer>
      </MeProvider>
    </DataProvider>
  );
}
