import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListView from '../components/ListView';
import ActivityDetails from '../components/ActivityDetails';

export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  pointreward: number;
  popmin: number;
  popmax: number;
  userid: string;
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

const ActivityCenter = () => {
  const [eventData, setEventsData] = useState<Event[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const selectedEvent = eventData.filter(item => {
    return item.id === selectedItem;
  })[0];

  useEffect(() => {
    getEventData(setEventsData);
  }, []);

  const Display =
    selectedItem === null ? (
      <ListView
        setSelectedItem={setSelectedItem}
        items={formatEventOptions(eventData || [])}
      />
    ) : (
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
    );

  return (
    <View style={styles.root}>
      <Text style={styles.textStyle}>Activity Center</Text>
      {Display}
    </View>
  );
};

export default ActivityCenter;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 30,
    margin: 15,
    alignItems: 'center',
  },

  textStyle: {
    fontSize: 48,
    fontWeight: 'bold',
    paddingBottom: 15,
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
