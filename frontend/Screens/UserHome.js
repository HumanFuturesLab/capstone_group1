import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import dashboardIcon from '../Images/dashboardIcon.png'
import townIcon from '../Images/townIcon.png'
import activityIcon from '../Images/activityIcon.png'
import rewardsIcon from '../Images/rewardsIcon.png'
import profileIcon from '../Images/profileIcon.png'
import ActivityCentre from './ActivitiyCenter.js';
import Dashboard from './Dashboard.js';
import Profile from './Profile.tsx';
import Rewards from './Rewards.js';
import TownSquare from './TownSquare.js';

const Tab = createBottomTabNavigator();

const UserHome = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#000000',
        height: 100,
      },
      }}>
      <Tab.Screen name="Dashboard" component={Dashboard} options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.icons}>
            <Image
              source={dashboardIcon}
              resizeMode='contain'
              style={{
                width: focused ? 75 : 50,
                height: focused ? 75 : 50,
              }}
            />
          </View>
        )
      }}/>
      <Tab.Screen name="Rewards" component={Rewards} options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.icons}>
            <Image
              source={rewardsIcon}
              resizeMode='contain'
              style={{
                width: focused ? 75 : 50,
                height: focused ? 75 : 50,
              }}
            />
          </View>
        )
      }}/>
      <Tab.Screen name="Town Square" component={TownSquare} options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.icons}>
            <Image
              source={townIcon}
              resizeMode='contain'
              style={{
                width: focused ? 75 : 50,
                height: focused ? 75 : 50,
              }}
            />
          </View>
        )
      }}/>
      <Tab.Screen name="Activity Center" component={ActivityCentre} options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.icons}>
            <Image
              source={activityIcon}
              resizeMode='contain'
              style={{
                width: focused ? 75 : 50,
                height: focused ? 75 : 50,
              }}
            />
          </View>
        )
      }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.icons}>
            <Image
              source={profileIcon}
              resizeMode='contain'
              style={{
                width: focused ? 75 : 50,
                height: focused ? 75 : 50,
              }}
            />
          </View>
        )
      }}/>
    </Tab.Navigator>
  )
}

export default UserHome;

const styles = StyleSheet.create({
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})