import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import StorybookUI from './.storybook';
import Config from 'react-native-config';
import UserHome from './screens/UserHome';

const Stack = createNativeStackNavigator();

const Home = () => {
  const {authorize, clearSession, user, getCredentials, error, isLoading} =
    useAuth0();

  const onLogin = async () => {
    await authorize(
      {
        scope: 'openid email',
      },
      {},
    );
    const credentials = await getCredentials();
    console.log(credentials);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <>
      {user && (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="TabNavigator"
              component={UserHome}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {!user && <Text>You are not logged in</Text>}
      {!user && <Button onPress={onLogin} title={'Log In'} />}
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  );
};

const App = () => {
  return (
    <Auth0Provider
      domain={'dev-tn5qd8swaoxt8gn0.us.auth0.com'}
      clientId={'pRAokchRzJYk61f6hyNJIYNlgmnjEM5r'}>
      <Home />
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C',
  },
});

export default Config.LOAD_STORYBOOK === 'false' ? StorybookUI : App;
