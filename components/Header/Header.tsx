import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useMeContext } from '../../contexts/Me';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGears } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const meCtx = useMeContext();

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.name}>{meCtx?.name}</Text>
      <Pressable><FontAwesomeIcon size={30} icon={ faGears } /></Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    name: {
        flex: 0.75,
        fontSize: 30,
        fontWeight: '800',
        
    }
})