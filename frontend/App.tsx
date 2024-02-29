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
import {LoggedInUserContext} from './context';
import {SvgXml} from 'react-native-svg';
import {groupSvg, framexml, gleotextxml} from './Images/AppSvgs';
import base64 from 'react-native-base64';

const Stack = createNativeStackNavigator();

export type InternalUser = {
  id: string;
  name: string;
  accesstoken: string;
  address: string;
  email: string;
  pointscached: number;
  followers: number;
  isadmin: boolean;
};

type GetUser = {
  data: InternalUser;
  error: string;
};

const getUser = async (
  token: string,
  setUserInfo: React.Dispatch<React.SetStateAction<InternalUser | undefined>>,
  setUserInfoLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setUserInfoLoading(true);
  const resp = fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const result: GetUser = await (await resp).json();
  const incorrectAccessToken: boolean = !!result.error && !result.data;

  if (incorrectAccessToken) {
    console.log('could not get user data');
    return;
  }

  setUserInfo(result.data);
  setUserInfoLoading(false);
};

const Home = () => {
  const {authorize, user, getCredentials, error, isLoading} = useAuth0();
  const [userInfo, setUserInfo] = useState<InternalUser | undefined>();
  const [userInfoLoading, setUserInfoLoading] = useState<boolean>(false);
  const [idToken, setIdToken] = useState<string | undefined>();

  useEffect(() => {
    const getCreds = async () => {
      let result = await getCredentials();
      setIdToken(result?.idToken || '');
    };

    getCreds();

    if (user?.name && user?.email && idToken) {
      getUser(idToken, setUserInfo, setUserInfoLoading);
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

  if (isLoading || userInfoLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!userInfo) {
    return (
      <>
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
        {error && <Text style={styles.error}>{error.message}</Text>}
      </>
    );
  }

  return (
    <>
      <LoggedInUserContext.Provider
        value={{user: userInfo, setUserInfo: setUserInfo}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="TabNavigator"
              component={UserHome}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LoggedInUserContext.Provider>
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
