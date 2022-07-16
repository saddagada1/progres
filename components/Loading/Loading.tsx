import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { PRIMARY_COLOUR } from '../../constants/basic'
import { useMeContext } from '../../contexts/Me';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParams } from '../Navigators/MainNavigator';

type LoadingProps = StackScreenProps<MainStackParams, 'Loading'>

const Loading: React.FC<LoadingProps> = ({navigation}) => {
  const meCtx = useMeContext();

  useEffect(() => {
    if (meCtx?.loading) {
      return
    } else if (meCtx?.name) {
      navigation.replace('Home')
    } else {
      navigation.replace('Onboarding')
    }
  }, [meCtx])
  
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size='large' />
    </SafeAreaView>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOUR
    }
})