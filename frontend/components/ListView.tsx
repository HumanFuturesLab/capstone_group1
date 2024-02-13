import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
type Option = {
  id: string;
  name: string;
};

type ListViewProps = {
  items: Option[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
};

const ListView = ({items, setSelectedItem}: ListViewProps) => {
  return (
    <View style={styles.container}>
      {items.map(item => (
        <TouchableOpacity
          key={`item-${item.id}`}
          onPress={() => {
            setSelectedItem(item.id);
          }}
          style={styles.activity}>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default ListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  activity: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
    width: '70%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    color: '#4f603c',
  },
});
