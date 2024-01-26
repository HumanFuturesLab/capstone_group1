import { StyleSheet, View, ImageBackground } from 'react-native'
import React from 'react'
import background from '../Images/townSquare.jpg'

const TownSquare = () => {
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

export default TownSquare

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