import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Image } from 'react-native-svg';
import { Context } from '../context';


  const Profile = () => {
  const value = useContext(Context);
  const {clearSession} = useAuth0();
  const onLogout = async () => {
    await clearSession({}, {});
  };

  const { user } = useAuth0();

  const Stack = createNativeStackNavigator();

  //console.log(user);

const item = "Account name: " + user?.name + "\n\nAccount email: " +  user?.email  + "\n\nEmail Verified: "   + user?.emailVerified + "\n\npic:" + <Image>(user?.picture) </Image>
  const acc = () => {
    Alert.alert('Account Information:', item)
  }

  return (
    <SafeAreaView>
      <Text>Profile:</Text>
      <Text>Welcome Back,  {user?.name || "no user"}</Text>

      <Button onPress ={acc } title='View Account'/>
      <View>

      </View>
      
      <Button onPress={onLogout} title={'Log Out'} />
      
    </SafeAreaView>
    
  );
};

export default Profile;

const styles = StyleSheet.create({});
