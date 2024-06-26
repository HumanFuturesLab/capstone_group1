import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListView from '../components/ListView';
import RewardDetails from '../components/RewardDetails';

export type Reward = {
  id: string;
  name: string;
  description: string;
  cost: number;
  companyid: string;
  numavailable: number;
};

const getRewardsData = (
  setRewardsData: React.Dispatch<React.SetStateAction<Reward[]>>,
) => {
  fetch('http://localhost:3000/rewards')
    .then(async (response: Response) => {
      return await response.json();
    })
    .then(result => setRewardsData(result.data));
};

const Rewards = () => {
  const [rewardData, setRewardsData] = useState<Reward[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const selectedReward = rewardData.filter(item => {
    return item.id === selectedItem;
  })[0];

  useEffect(() => {
    getRewardsData(setRewardsData);
  }, []);

  const Display =
    selectedItem === null ? (
      <ListView setSelectedItem={setSelectedItem} items={rewardData} />
    ) : (
      <View style={styles.displayDetails}>
        <RewardDetails reward={selectedReward} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSelectedItem(null);
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={styles.root}>
      <Text style={styles.textStyle}>Rewards</Text>
      {Display}
    </View>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 30,
    margin: 15,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 48,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
