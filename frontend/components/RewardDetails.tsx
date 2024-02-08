import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
      <Text>do stuff</Text>
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
});

export default RewardDetails;
