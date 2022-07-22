import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React from "react";
import { useMeContext } from "../../contexts/Me";
import { useNavigation } from "@react-navigation/native";
import { SECONDARY_COLOUR } from "../../constants/basic";

interface HeaderProps {
  previousTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ previousTitle }) => {
  const navigation = useNavigation();
  const meCtx = useMeContext();

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {previousTitle && (
          <Pressable
            style={{ marginHorizontal: -10 }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={40} color={SECONDARY_COLOUR} />
          </Pressable>
        )}
        <Text
          numberOfLines={1}
          style={[styles.title, { marginLeft: previousTitle ? 10 : 0 }]}
        >
          {previousTitle ? previousTitle : meCtx?.name}
        </Text>
      </View>
      <Pressable onPress={() => console.log("hello")}>
        <Icon name="settings" size={30} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 20,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    marginRight: 20,
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 30,
    fontFamily: "InterBold",
    marginTop: -2.5
  },
});
