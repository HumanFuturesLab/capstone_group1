import {StyleSheet, View, ImageBackground, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListView from '../components/ListView';

export type Reward = {
  rewardid: string;
  rewardname: string;
  rewarddesc: string;
  pointcost: number;
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
  useEffect(() => {
    getRewardsData(setRewardsData);
  }, []);
  return (
    <View style={styles.root}>
      <Text style={styles.textStyle}>Rewards</Text>
      <ListView data={rewardData} />
    </View>
  );
};

export default Rewards

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 30,
    margin: 15,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  
  textStyle: {
    fontSize: 48,
    fontWeight: 'bold',
    paddingBottom: 15,
  }
});
