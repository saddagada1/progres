import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './components/Onboarding';
import { PRIMARY_COLOUR } from './constants/basic';

export default function App() {
  return (
    <View style={styles.container}>
      <Onboarding/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOUR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
