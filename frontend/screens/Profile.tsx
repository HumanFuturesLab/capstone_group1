import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuth0} from 'react-native-auth0';

const Profile = () => {
  const {clearSession, user, isLoading} = useAuth0();
  const onLogout = async () => {
    await clearSession({}, {});
  };

  const loggedIn = user !== undefined && user !== null;

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button onPress={onLogout} title={'Log Out'} />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
