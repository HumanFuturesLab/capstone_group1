import {Text, View, StyleSheet} from 'react-native';

export interface Props {
  level: string;
}

export const Level = ({level}: Props) => {
  return (
    <View style={levelStyles.container}>
      <View style={levelStyles.extraContainer}>
        <Text style={levelStyles.text}>{level}</Text>
        <Text>Level</Text>
      </View>
    </View>
  );
};

const levelStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraContainer: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  textlines: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});
