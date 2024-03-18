import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useAuth0} from 'react-native-auth0';
import {useLoggedInUserContext} from '../context';
import {Reward} from './Rewards';
import {Event} from './ActivityCenter';

const Profile = () => {
  const {user, setUserInfo} = useLoggedInUserContext();
  const {clearSession} = useAuth0();

  const [form1, setForm1] = useState<Partial<Event>>({
    name: '',
    description: '',
    date: '',
    pointreward: 0,
    location: '',
  });

  const [form2, setForm2] = useState<Partial<Reward>>({
    name: '',
    description: '',
    cost: 0,
  });

  const handleChange1 = (name: string, value: any) => {
    setForm1(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChange2 = (name: string, value: any) => {
    setForm2(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit1 = () => {
    console.log(form1);
  };
  const handleSubmit2 = () => {
    console.log(form2);
  };

  const onLogout = async () => {
    await clearSession({}, {});
    setUserInfo(undefined);
  };

  useEffect(() => {
    // make request back to the server to create stuff
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Profile</Text>
        <Button onPress={onLogout} title={'Log Out'} />
        <Text>{user.email}</Text>
        {user.isadmin && (
          <>
            <View style={styles.container}>
              <Text>Name:</Text>
              <TextInput
                style={styles.input}
                value={form1.name}
                onChangeText={value => handleChange1('name', value)}
              />
              <Text>Description:</Text>
              <TextInput
                style={styles.input}
                value={form1.description}
                onChangeText={value => handleChange1('description', value)}
              />
              <Text>Date:</Text>
              <TextInput
                style={styles.input}
                value={form1.date}
                onChangeText={value => handleChange1('date', value)}
              />
              <Text>Point Reward:</Text>
              <TextInput
                style={styles.input}
                value={form1.pointreward!.toString()}
                onChangeText={value =>
                  handleChange1('pointreward', Number(value))
                }
                keyboardType="numeric"
              />
              <Text>Location:</Text>
              <TextInput
                style={styles.input}
                value={form1.location}
                onChangeText={value => handleChange1('location', value)}
              />
              <Button title="Submit" onPress={handleSubmit1} />
            </View>
            <View style={styles.container}>
              <Text>Name:</Text>
              <TextInput
                style={styles.input}
                value={form2.name}
                onChangeText={value => handleChange2('name', value)}
              />
              <Text>Description:</Text>
              <TextInput
                style={styles.input}
                value={form2.description}
                onChangeText={value => handleChange2('description', value)}
              />
              <Text>Cost:</Text>
              <TextInput
                style={styles.input}
                value={form2.cost!.toString()}
                onChangeText={value => handleChange2('cost', Number(value))}
              />
              <Button title="Submit" onPress={handleSubmit2} />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  whitebackground: {
    backgroundColor: 'white',
  },
  adminText: {
    fontSize: 30,
    alignSelf: 'center',
  },
  formLabels: {
    marginLeft: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    width: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
