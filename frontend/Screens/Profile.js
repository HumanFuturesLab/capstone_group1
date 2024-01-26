import { SafeAreaView, StyleSheet, Text, View, Button, ImageBackground } from 'react-native'
import React from 'react'

const Profile = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button
          title="Logout"
          onPress={() => navigation.popToTop()}
        />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})