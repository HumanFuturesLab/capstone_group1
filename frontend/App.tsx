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

  const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="193" height="68" viewBox="0 0 193 68" fill="none">
  <path d="M33.9961 35.4901H59.1681V68H33.9961V63.2628C31.8288 66.4209 28.7635 68 24.8004 68C20.1562 68 15.9453 66.5448 12.168 63.6344C8.45258 60.724 5.54217 56.7918 3.43676 51.8379C1.39328 46.884 0.371542 41.4347 0.371542 35.4901C0.371542 29.4215 1.79579 23.7865 4.64428 18.5849C7.24507 13.8168 10.7747 10.0394 15.2332 7.25287C19.6917 4.40438 24.5527 2.98014 29.8163 2.98014C37.4948 2.98014 44.1516 5.85959 49.7866 11.6185C54.1213 16.077 56.9698 21.4953 58.3321 27.8735L33.9961 34.3754C33.9961 34.1277 33.9651 33.911 33.9032 33.7252C33.9032 33.6633 33.8723 33.5704 33.8103 33.4466C33.8103 33.3227 33.8103 33.2299 33.8103 33.1679C33.8103 33.0441 33.7794 32.9202 33.7174 32.7964C33.7174 32.7964 33.6865 32.7654 33.6246 32.7035C33.6246 32.5797 33.6246 32.5177 33.6246 32.5177C33.6246 32.4558 33.6246 32.3629 33.6246 32.2391C33.5626 32.1772 33.5007 32.0843 33.4388 31.9604C33.4388 31.8366 33.4388 31.7437 33.4388 31.6818C33.3769 31.5579 33.284 31.4031 33.1601 31.2173C33.0982 31.0935 33.0363 30.9387 32.9744 30.7529C32.9124 30.691 32.8505 30.5981 32.7886 30.4743C32.7267 30.3504 32.6647 30.2266 32.6028 30.1027C32.5409 29.9789 32.479 29.886 32.417 29.8241C32.3551 29.7621 32.2932 29.7002 32.2313 29.6383C32.2313 29.6383 32.2003 29.6073 32.1384 29.5454C32.0765 29.4835 32.0145 29.4215 31.9526 29.3596C31.8907 29.2977 31.8288 29.2358 31.7668 29.1739C31.643 29.05 31.5501 28.9571 31.4882 28.8952C31.4263 28.8952 31.3643 28.8642 31.3024 28.8023C31.1786 28.7404 31.0547 28.6785 30.9309 28.6165C30.869 28.5546 30.807 28.5237 30.7451 28.5237C30.6832 28.5237 30.6213 28.4927 30.5593 28.4308C30.4974 28.4308 30.4355 28.4308 30.3736 28.4308C30.3116 28.3688 30.2497 28.3379 30.1878 28.3379C30.1878 28.3379 30.1568 28.3379 30.0949 28.3379C30.0949 28.3379 30.0639 28.3379 30.002 28.3379C29.8782 28.3379 29.8163 28.3379 29.8163 28.3379C28.6397 28.3379 27.618 29.05 26.751 30.4743C25.946 31.8366 25.5435 33.5085 25.5435 35.4901C25.5435 35.6139 25.5435 35.7068 25.5435 35.7687C25.5435 35.8306 25.5435 35.9235 25.5435 36.0474C25.5435 36.1093 25.5435 36.1712 25.5435 36.2332C25.5435 36.4189 25.5435 36.5428 25.5435 36.6047C25.6054 36.7905 25.6364 36.9143 25.6364 36.9762C25.6364 37.162 25.6674 37.3478 25.7293 37.5336C25.7293 37.5336 25.7293 37.5645 25.7293 37.6264C25.7912 37.8741 25.8222 38.0909 25.8222 38.2766C25.8841 38.3386 25.9151 38.4624 25.9151 38.6482C25.977 38.772 26.0079 38.8649 26.0079 38.9268C26.0699 38.9888 26.1008 39.0816 26.1008 39.2055C26.1628 39.2674 26.2247 39.3603 26.2866 39.4841C26.4104 39.7938 26.5343 40.1034 26.6581 40.413C27.4632 41.7753 28.423 42.5184 29.5376 42.6423C29.5995 42.6423 29.6924 42.6423 29.8163 42.6423C30.9928 42.6423 31.9836 41.9611 32.7886 40.5988C33.5936 39.1745 33.9961 37.4716 33.9961 35.4901ZM88.0917 68H65.2419V0.658001H88.0917V68ZM128.872 50.3518C131.659 49.8564 134.259 49.0514 136.675 47.9367C137.789 47.4413 138.811 46.915 139.74 46.3577C139.74 46.3577 139.74 46.3886 139.74 46.4506C139.74 46.5125 139.74 46.5434 139.74 46.5434L139.647 48.2154L138.811 64.0059C133.733 66.6686 127.85 68 121.163 68C120.234 68 119.367 67.969 118.562 67.9071H118.283C111.781 67.4736 106.177 65.4611 101.471 61.8696C96.8266 58.2161 94.1639 53.8195 93.4827 48.6798C93.4827 48.556 93.4518 48.3702 93.3899 48.1225C93.3279 47.6271 93.297 47.1317 93.297 46.6363C93.235 44.469 93.5137 42.2707 94.1329 40.0415C95.3714 35.8926 97.6626 32.3939 101.006 29.5454C104.412 26.635 108.282 24.8392 112.617 24.158C113.918 23.9723 115.218 23.8794 116.518 23.8794C117.323 23.8794 118.128 23.9103 118.933 23.9723C120.791 24.158 122.649 24.5605 124.506 25.1798C128.717 26.6659 132.185 29.081 134.91 32.4248C136.334 34.2206 137.449 36.1403 138.254 38.1837C138.687 39.2365 139.028 40.413 139.275 41.7134C139.709 44.0665 139.864 45.274 139.74 45.3359L114.661 50.166C114.784 50.2279 114.908 50.2898 115.032 50.3518C115.218 50.4756 115.435 50.5685 115.682 50.6304C115.93 50.6923 116.147 50.7543 116.333 50.8162C117.014 50.94 118.221 51.0329 119.955 51.0948C122.989 51.1568 125.962 50.9091 128.872 50.3518ZM116.518 41.0632C116.085 41.0632 115.651 41.187 115.218 41.4347C114.661 41.6824 114.165 42.1159 113.732 42.7351C113.546 43.0448 113.391 43.3544 113.267 43.664C113.205 43.8498 113.144 44.0355 113.082 44.2213C113.082 44.2213 113.082 44.2832 113.082 44.4071C113.02 44.6548 112.989 44.7786 112.989 44.7786L119.676 43.4782C119.615 43.4163 119.584 43.3544 119.584 43.2925C119.212 42.5494 118.779 42.023 118.283 41.7134C117.726 41.2799 117.138 41.0632 116.518 41.0632ZM168.037 23.8794C174.725 23.8794 180.422 26.0467 185.128 30.3814C189.896 34.6541 192.28 39.8557 192.28 45.9861C192.28 52.0547 189.896 57.2562 185.128 61.5909C180.422 65.8636 174.725 68 168.037 68C161.411 68 155.714 65.8636 150.946 61.5909C146.24 57.2562 143.887 52.0237 143.887 45.8932C143.887 41.9301 144.971 38.2766 147.138 34.9328C149.305 31.527 152.247 28.8333 155.962 26.8517C159.677 24.8702 163.702 23.8794 168.037 23.8794ZM165.065 51.0019C165.87 52.4262 166.861 53.1383 168.037 53.1383C169.214 53.1383 170.204 52.4262 171.009 51.0019C171.876 49.5777 172.31 47.9058 172.31 45.9861C172.31 44.0046 171.876 42.3017 171.009 40.8774C170.204 39.4532 169.214 38.7411 168.037 38.7411C166.861 38.7411 165.87 39.4532 165.065 40.8774C164.26 42.3017 163.857 44.0046 163.857 45.9861C163.857 47.9058 164.26 49.5777 165.065 51.0019Z" fill="#CDF169"/>
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
      domain={'dev-mtz5ic1d3hbus7z1.us.auth0.com'}
      clientId={'h38IkiKhR6CTkMF6DRm7kqH9CaK07NLN'}>
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
