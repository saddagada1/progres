import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import React from 'react'
import { useMeContext } from '../../contexts/Me';

const Header = () => {
  const meCtx = useMeContext();

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.name}>{meCtx?.name}</Text>
      <Pressable onPress={() => console.log('hello')}><Icon name="settings" size={30} /></Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 20,
    },
    name: {
        flex: 0.75,
        fontSize: 30,
        fontFamily: "InterBold"
    }
})