import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import background from '../Images/dashboard3.jpg'

const Dashboard = (route) => {
  return (
    <View style={styles.root}>
      <ImageBackground
        source = {background}
        style = {styles.backgroundImage}
      >
      </ImageBackground>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})