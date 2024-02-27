import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {IndexableEvent, IndexableReward} from '../screens/Profile';

type FormProps = {
  form: IndexableEvent | IndexableReward;
  elements: string[];
  // TODO: look into this later cause we might wanna keep just a string here in case we want to make this more reuseable
  type: 'Event' | 'Reward' | string;
  handleSubmit: () => void;
  handleClear: () => void;
  handleChange: (name: string, value: string) => void;
};

const Form = ({
  form,
  elements,
  type,
  handleSubmit,
  handleClear,
  handleChange,
}: FormProps) => {
  return (
    <View style={styles.whitebackground}>
      <Text style={styles.formType}>{type}</Text>
      {elements.map((item: string) => (
        <View key={`${type}-${item}`}>
          <Text style={styles.formLabels}>{item}</Text>
          <TextInput
            style={styles.input}
            onChangeText={newItem => handleChange(item, newItem)}
            value={form[item]}
          />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <View style={styles.space} />
        <Button title="Clear" onPress={handleClear} />
      </View>
    </View>
  );
};
export default Form;

const styles = StyleSheet.create({
  whitebackground: {
    backgroundColor: 'white',
    margin: 10,
  },
  formLabels: {
    marginLeft: 20,
  },
  formType: {
    alignSelf: 'center',
    fontSize: 20,
  },
  input: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    padding: 5,
    borderColor: '#007BFF',
    borderRadius: 5,
    color: '#333333',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    width: 10,
  },
});
