import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListView from '../components/ListView';
import ActivityDetails from '../components/ActivityDetails';

export type Event = {
  eventid: string;
  eventname: string;
  eventdesc: string;
  eventdate: string;
  pointreward: number;
  popmin: number;
  popmax: number;
  adminid: string;
  location: string;
};

const getEventData = (
  setEventsData: React.Dispatch<React.SetStateAction<Event[]>>,
) => {
  fetch('http://localhost:3000/events')
    .then(async (response: Response) => {
      return await response.json();
    })
    .then(result => setEventsData(result.data));
};

const formatEventOptions = (options: Event[]) => {
  return options.map(option => {
    return {
      id: option.eventid,
      name: option.eventname,
    };
  });
};

const ActivityCentre = () => {
  const [eventData, setEventsData] = useState<Event[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const selectedEvent = eventData.filter(item => {
    return item.eventid === selectedItem;
  })[0];

  useEffect(() => {
    getEventData(setEventsData);
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.textStyle}>Activity Center</Text>
      {selectedItem === null && (
        <ListView
          setSelectedItem={setSelectedItem}
          items={formatEventOptions(eventData || [])}
        />
      )}
      {selectedItem !== null && (
        <View style={styles.displayDetails}>
          <ActivityDetails activity={selectedEvent} />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setSelectedItem(null);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ActivityCentre;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  textStyle: {
    fontSize: 48,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
