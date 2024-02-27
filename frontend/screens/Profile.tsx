import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useAuth0} from 'react-native-auth0';
import {useLoggedInUserContext} from '../context';
import Form from '../components/Form';
import {Reward} from './Rewards';
import {Event} from './ActivityCenter';

export type IndexableEvent = {
  [key: string]: any;
} & Partial<Event>;

export type IndexableReward = {
  [key: string]: any;
} & Partial<Reward>;

const initalEventState: Partial<Event> = {
  name: '',
  description: '',
  date: '',
  pointreward: 0,
  location: '',
};

const initialRewardState: Partial<Reward> = {
  name: '',
  description: '',
  cost: 0,
};

const Profile = () => {
  const [form, setForm] = useState<IndexableEvent | IndexableReward>({});
  const {user, setUserInfo} = useLoggedInUserContext();
  const {clearSession} = useAuth0();

  const onLogout = async () => {
    await clearSession({}, {});
    setUserInfo(undefined);
  };

  const handleSubmit = () => {
    console.log(form);
  };

  const handleClear = () => {
    setForm(initalEventState);
  };

  const handleChange = (name: string, value: string) => {
    const updatedValue = name === 'pointreward' ? parseInt(value, 10) : value;

    setForm(prevForm => ({
      ...prevForm,
      [name]: updatedValue,
    }));
  };

  const eventFormElements: string[] = [
    'Event Name',
    'Event Description',
    'Event Date',
    'Event Pointreward',
    'Event Location',
  ];
  const rewardFormElements: string[] = [
    'Reward Name',
    'Reward Description',
    'Reward Cost',
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Profile</Text>
        <Button onPress={onLogout} title={'Log Out'} />
        <Text>{user.email}</Text>
        {user.isadmin && (
          <>
            <Form
              form={form}
              elements={eventFormElements}
              type="Event"
              handleSubmit={handleSubmit}
              handleClear={handleClear}
              handleChange={handleChange}
            />
            <Form
              form={form}
              elements={rewardFormElements}
              type="Reward"
              handleSubmit={handleSubmit}
              handleClear={handleClear}
              handleChange={handleChange}
            />
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
