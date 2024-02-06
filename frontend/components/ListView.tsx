import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Event} from '../screens/ActivitiyCenter';
type Props = {
  data: Event[];
};

const ListView = ({data}: Props) => {
  return (
    <View>
      {data.map((item, index) => (
        <TouchableOpacity
          key={item.eventid}
          style={styles.container}
          onPress={() => console.log('clicked on item')}>
          <Text style={styles.text}>{item.location}</Text>
        </TouchableOpacity>
      ))}
    </View>
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
});
