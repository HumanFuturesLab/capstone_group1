import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, StyleSheet, Text, View} from 'react-native';
import Auth0, {useAuth0, Auth0Provider} from 'react-native-auth0';
import StorybookUI from './.storybook';
import Config from 'react-native-config';
import UserHome from './screens/UserHome';
import {Context} from './context';
import {SvgXml} from 'react-native-svg';

const Stack = createNativeStackNavigator();

const Home = () => {
  const {authorize, clearSession, user, getCredentials, error, isLoading} =
    useAuth0();
  const [userInfo, setUserInfo] = useState({...user});

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

  const xml = `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="126.000000pt" height="54.000000pt" viewBox="0 0 126.000000 54.000000" preserveAspectRatio="xMidYMid meet">
  <metadata>
  Created by potrace 1.10, written by Peter Selinger 2001-2011
  </metadata>
  <g transform="translate(0.000000,54.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
  <path d="M419 489 c-15 -13 -20 -30 -21 -68 -1 -28 -4 -51 -7 -51 -3 1 -19 19 -34 41 -63 91 -191 105 -277 32 -61 -53 -80 -97 -80 -191 0 -73 3 -84 33 -128 54 -79 67 -83 311 -83 117 1 219 5 227 10 9 5 -15 9 -68 9 l-83 0 0 210 0 210 75 0 75 0 0 -205 c0 -130 4 -205 10 -205 6 0 10 7 10 15 0 17 26 20 36 4 14 -23 90 -49 145 -49 71 0 113 14 129 46 13 24 14 24 34 5 85 -77 219 -65 281 26 43 64 31 136 -32 194 -40 38 -66 49 -113 49 -52 0 -97 -19 -138 -60 l-32 -33 -20 26 c-62 78 -178 90 -247 25 -33 -31 -43 -15 -43 71 0 102 -16 122 -96 120 -36 -1 -62 -8 -75 -20z m-123 -50 c36 -22 89 -100 82 -121 -3 -7 -36 -20 -74 -30 l-69 -17 -17 22 c-22 29 -41 12 -36 -34 4 -39 32 -52 43 -20 5 18 15 21 63 21 31 0 67 3 80 6 22 6 22 5 22 -100 l0 -106 -79 0 c-54 0 -81 4 -84 13 -4 9 -7 9 -18 0 -36 -34 -120 -1 -159 62 -34 56 -40 167 -11 223 22 43 75 92 113 104 36 11 108 0 144 -23z m514 -119 c42 -22 65 -49 75 -91 6 -26 5 -26 -69 -40 -42 -7 -76 -17 -76 -21 0 -14 58 -6 128 16 21 7 22 5 22 -47 0 -53 -1 -56 -31 -66 -84 -29 -192 -3 -239 56 -30 38 -24 121 11 159 50 55 115 67 179 34z m313 6 c38 -15 84 -66 93 -103 20 -79 -58 -163 -150 -163 -92 0 -150 55 -150 141 0 40 5 54 30 80 52 56 114 72 177 45z"/>
  <path d="M1047 233 c-11 -11 -8 -58 5 -71 24 -24 48 21 32 62 -6 16 -26 21 -37 9z"/>
  </g>
  </svg>`;

  return (
    <>
      {user && (
        <Context.Provider value={userInfo}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="TabNavigator"
                component={UserHome}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Context.Provider>
      )}
      {/* {!user && <Text>You are not logged in</Text>} */}
      {!user && (
        <View style={styles.container}>
          <>
            <SvgXml
              width="80%"
              height="80%"
              xml={xml}
              style={styles.svgx}></SvgXml>
          </>
          <Button
            onPress={() => {
              onLogin();
            }}
            title={'Log In'}
          />
        </View>
      )}
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
    backgroundColor: 'lightgreen',
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
  svgx: {
    position: 'absolute',
    textAlignVertical: 'top',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Config.LOAD_STORYBOOK === 'false' ? StorybookUI : App;
