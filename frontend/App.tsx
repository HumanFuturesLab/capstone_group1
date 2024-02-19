import 'react-native-gesture-handler';
import React, {createElement, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DevSettings,
} from 'react-native';
import Auth0, {useAuth0, Auth0Provider, User} from 'react-native-auth0';
import StorybookUI from './.storybook';
import Config from 'react-native-config';
import UserHome from './screens/UserHome';
import {Context} from './context';
import {SvgXml} from 'react-native-svg';
import {groupSvg, framexml, gleotextxml} from './Images/AppSvgs';
import base64 from 'react-native-base64';

const Stack = createNativeStackNavigator();

type IdToken = {
  'https://com.gleo.ios/first_login': boolean;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
  sid: string;
};

export type InternalUser =
  | {
      userid: string;
      namefirst: string;
      namelast: string;
      username: string;
      accesstoken: string;
      address: string;
      email: string;
      pointscached: number;
      followers: number;
    }
  | undefined;

const parseSub = (s: string): string => {
  try {
    // Split the JWT to get the payload
    const dataPart = s.split('.')[1];
    const decodedPayload = base64.decode(dataPart).replace(/\u0000/g, '');
    // Parse the JSON string into an object
    const result: IdToken = JSON.parse(decodedPayload);
    return result.sub;
  } catch (error) {
    console.log('ERROR DECODING', error);
    return '';
  }
};

const createUser = async (
  data: Object,
  setUserInfo: React.Dispatch<React.SetStateAction<InternalUser | undefined>>,
): Promise<void> => {
  const resp = fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result: InternalUser = (await (await resp).json()).data;
  setUserInfo(result);
};

const Home = () => {
  const {authorize, clearSession, user, getCredentials, error, isLoading} =
    useAuth0();
  const [userInfo, setUserInfo] = useState<InternalUser | undefined>();
  const [idToken, setIdToken] = useState<string | undefined>();

  useEffect(() => {
    const getCreds = async () => {
      let result = await getCredentials();
      setIdToken(parseSub(result?.idToken || ''));
    };
    // TODO: figure out why this runs 2 times sometimes
    getCreds();

    if (user?.name && user?.email && idToken) {
      const tempUser = {
        firstName: user.name,
        email: user.email,
        accessToken: idToken,
      };
      createUser(tempUser, setUserInfo);
    }
  }, [user, idToken]);

  const onLogin = async () => {
    await authorize(
      {
        scope: 'openid email',
      },
      {},
    );
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
      {!user && (
        <View style={styles.container}>
          <SvgXml xml={framexml} style={styles.svg1}></SvgXml>
          <SvgXml xml={gleotextxml} style={styles.svg2}></SvgXml>

          <TouchableOpacity
            onPress={() => {
              onLogin();
            }}
            style={styles.button}>
            <Text>LOG IN</Text>
          </TouchableOpacity>
          <SvgXml xml={groupSvg} style={styles.svg3}></SvgXml>
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
    backgroundColor: 'white',
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
  svg1: {
    position: 'absolute',
    top: '25%',
  },
  svg2: {
    position: 'absolute',
    top: '30%',
  },
  svg3: {
    position: 'absolute',
    bottom: 0,
    width: '200%',
    height: '200%',
  },
  button: {
    backgroundColor: '#cdf169',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Config.LOAD_STORYBOOK === 'false' ? StorybookUI : App;
