import React, {Component, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Event} from '../screens/ActivitiyCenter';
import {Reward} from '../screens/Rewards';
import ActivityDetails from './ActivityDetails';
import RewardDetails from './RewardDetails';
type Props =
  | {
      data: Event[];
    }
  | {
      data: Reward[];
    };

const ListView = ({data}: Props) => {
  const [displayDetails, setdisplayDetails] = useState<Boolean>(false);
  const [selectedItem, setSelectedActivty] = useState<Event | Reward>();
  const [isEvent, setisEvent] = useState<Boolean>(false);

  return (
    <>
      {!displayDetails && (
        <View>
          {data.map((item, index) => (
            <TouchableOpacity
              key={
                'eventid' in item
                  ? (item as Event).eventid
                  : (item as Reward).rewardid
              }
              style={styles.container}
              onPress={() => {
                setdisplayDetails(true);
                setSelectedActivty(
                  'eventid' in item ? (item as Event) : (item as Reward),
                );
                setisEvent('eventid' in item ? true : false);
              }}>
              <Text style={styles.text}>
                {'eventid' in item
                  ? (item as Event).eventname
                  : (item as Reward).rewardname}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {displayDetails && (
        <View style={styles.displayDetails}>
          {isEvent && <ActivityDetails activity={selectedItem} />}
          {!isEvent && <RewardDetails reward={selectedItem} />}
          <TouchableOpacity
            onPress={() => {
              setdisplayDetails(false);
            }}
            style={styles.button}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
export default ListView;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
  },
  text: {
    color: '#4f603c',
  },
  button: {
    backgroundColor: '#007bff', // Bootstrap primary color
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3, // For Android shadow effect
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  displayDetails: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically in the container
    alignItems: 'center', // Centers content horizontally in the container
  },
});
