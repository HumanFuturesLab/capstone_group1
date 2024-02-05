import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useContext} from 'react';
import {useAuth0} from 'react-native-auth0';
import {Context} from '../context';

const Profile = () => {
  const value = useContext(Context);
  const {clearSession} = useAuth0();
  const onLogout = async () => {
    await clearSession({}, {});
  };

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button onPress={onLogout} title={'Log Out'} />
      <Text>{value.name}</Text>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
