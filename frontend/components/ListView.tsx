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
    <View>
      {items.map(item => (
        <TouchableOpacity
          key={`item-${item.id}`}
          onPress={() => {
            setSelectedItem(item.id);
          }}
          style={styles.container}>
          <Text style={styles.text}>{item.name}</Text>
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
