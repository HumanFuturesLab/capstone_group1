import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import screens
import ActivityCentre from './ActivityCentre';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Rewards from './Rewards';
import TownSquare from './TownSquare';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
//const Tab = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Rewards" component={Rewards} />
      <Tab.Screen name="TownSqare" component={TownSquare} />
      <Tab.Screen name="ActivityCentre" component={ActivityCentre} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})