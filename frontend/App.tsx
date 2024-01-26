import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './screens/TabNavigator';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import StorybookUI from './.storybook';
import Config from 'react-native-config';

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

  const loggedIn = user !== undefined && user !== null;

  // const onLogout = async () => {
  //   await clearSession({}, {});
  // };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <>
      {/* <Text style={styles.header}> Auth0Sample - Login </Text> */}
      {user && (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
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

// const styles = StyleSheet.create({})

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

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
// export default App;
