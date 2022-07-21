import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { setTestDeviceIDAsync, AdMobBanner } from "expo-ads-admob";
import { ACCENT_COLOUR, PRIMARY_COLOUR, SECONDARY_COLOUR } from "../../constants/basic";

const BannerAd = () => {
 
  useEffect(() => {
    setTestDeviceIDAsync("EMULATOR");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.adHeader}>Advertisement</Text>
      <AdMobBanner
        bannerSize="banner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        servePersonalizedAds
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
    </View>
  );
};

export default BannerAd;

const styles = StyleSheet.create({
    container: {
        backgroundColor: PRIMARY_COLOUR,
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
        
    },
    adHeader: {
        fontSize: 15,
        fontFamily: "Inter",
        color: ACCENT_COLOUR,
        marginTop: -7.5,
        marginBottom: 5
    }
});
