import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useContext} from 'react';
import {useAuth0} from 'react-native-auth0';
import {useLoggedInUserContext} from '../context';

const Profile = () => {
  const {user, setUserInfo} = useLoggedInUserContext();
  const {clearSession} = useAuth0();
  const onLogout = async () => {
    await clearSession({}, {});
    setUserInfo(undefined);
  };

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button onPress={onLogout} title={'Log Out'} />
      {user && <Text>{user.email}</Text>}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
