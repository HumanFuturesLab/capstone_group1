import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {Event} from '../screens/ActivityCenter';

type ActivityProps = {
  activity: Event | undefined;
};

const ActivityDetails = ({activity}: ActivityProps) => {
  if (!activity) return null;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString(undefined, options);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [code, setCode] = useState('');

  //change this to get the code from the db
  const activitycode = 'exampleCode';

  const checkCode = () => {
    if (code === activitycode) {
      //change this to update user's points in db
      Alert.alert('Success!');
      setIsModalVisible(false);
    } else {
      Alert.alert('Incorrect code :(');
      setIsModalVisible(false);
    }
    setCode('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activity.eventname}</Text>

      {activity.eventdate && (
        <View style={styles.detailRow}>
          <Icon name="event" size={20} />
          <Text style={styles.detailText}>
            {formatDate(activity.eventdate)}
          </Text>
        </View>
      )}

      {activity.eventdesc && (
        <Text style={styles.description}>
          Description: {activity.eventdesc}
        </Text>
      )}

      {activity.pointreward && (
        <View style={styles.detailRow}>
          <Icon name="star" size={20} />
          <Text
            style={styles.detailText}>{`${activity.pointreward} Points`}</Text>
        </View>
      )}

      {activity.location && (
        <View style={styles.detailRow}>
          <Icon name="location-on" size={20} />
          <Text style={styles.detailText}>{activity.location}</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true);
        }}
        style={styles.button}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Enter Code</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <View style={styles.textline}>
                  <Text>Enter code: </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setCode(text)}
                    value={code}
                  />
                </View>
                <TouchableOpacity
                  onPress={checkCode}
                  style={styles.button}
                  activeOpacity={0.8}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    paddingBottom: 5,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: 250,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
  textline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ActivityDetails;
