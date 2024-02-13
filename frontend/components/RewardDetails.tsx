import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Reward} from '../screens/Rewards';

type RewardProps = {
  reward: Reward | undefined;
};

const RewardDetails = ({reward}: RewardProps) => {
  if (!reward) return null;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{reward.rewardname}</Text>
      {reward.rewarddesc && (
        <Text style={styles.description}>Description: {reward.rewarddesc}</Text>
      )}
      {reward.pointcost && (
        <View style={styles.detailRow}>
          <Icon name="star" size={20} />
          <Text style={styles.detailText}>{`${reward.pointcost} Points`}</Text>
        </View>
      )}
      {reward.numavailable && (
        <View style={styles.detailRow}>
          <Text
            style={
              styles.detailText
            }>{`${reward.numavailable} remaining`}</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Do stuff');
        }}
        style={styles.button}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Purchase</Text>
      </TouchableOpacity>
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
});

export default RewardDetails;
