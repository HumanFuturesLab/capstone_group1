import {StyleSheet, View, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListView from '../components/ListView';

export type Event = {
  eventid: string;
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

const ActivityCentre = () => {
  const [eventData, setEventsData] = useState<Event[]>([]);
  useEffect(() => {
    getEventData(setEventsData);
    console.log(eventData);
  }, []);
  return (
    <View style={styles.root}>
      <ListView data={eventData} />
    </View>
  );
};

export default ActivityCentre;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
