import {Text, View, StyleSheet, ViewStyle} from 'react-native';

export interface Props {
  level: string;
  bgColor: string;
}

export const LevelCircle = ({level, bgColor}: Props) => {
  const lvlStyle: ViewStyle = {
    backgroundColor: bgColor,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    position: 'relative',
  };
  const lineStyle = {
    width: 2,
    height: 20,
    backgroundColor: 'black',
  };
  const dotStyle = {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'black',
  };

  return (
    <View>
      <View style={levelCircleStyles.circleContainer}>
        <View style={lvlStyle}>
          <Text style={levelCircleStyles.lvlText}>{level}</Text>
        </View>
        <View style={lineStyle}></View>
        <View style={dotStyle}></View>
      </View>
    </View>
  );
};

const levelCircleStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    alignItems: 'center',
  },
  lvlText: {
    fontSize: 20,
    color: 'black',
  },
});
