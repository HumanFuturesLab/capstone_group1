import {Text, View, StyleSheet} from 'react-native';
import Svg, {Circle, Image, SvgUri, SvgXml} from 'react-native-svg';
import {CoinDisplayer} from '../.storybook/components/CoinDisplayer';
import {Level} from '../.storybook/components/Level';
import {LevelCircle} from '../.storybook/components/LevelCircle';
import {LevelPercent} from '../.storybook/components/LevelPercent';
import {dashboardXML, navxml} from '../Images/AppSvgs';

const Dashboard = () => {
  //current levle new level, coins etc need to get from db
  clString = '';
  nlString = '';
  currentLevel = 9;
  nextLevel = currentLevel + 1;
  if (currentLevel < 10) {
    clString = clString + '0' + currentLevel;
  } else {
    clString = clString + currentLevel;
  }
  if (nextLevel < 10) {
    nlString = nlString + '0' + nextLevel;
  } else {
    nlString = nlString + nextLevel;
  }

  currentCoins = 96000;
  nextCoins = (currentLevel + 1) * 10000 - currentCoins;
  nextLevelPercent = (10000 - nextCoins) / 100;
  return (
    <View style={styles.container}>
      <SvgXml width="390" xml={dashboardXML} style={styles.csvg}></SvgXml>

      <View style={styles.coindisplay}>
        <CoinDisplayer numberOfCoins={currentCoins}></CoinDisplayer>
      </View>
      <View style={styles.leveldisplay}>
        <Level level={clString}></Level>
      </View>
      <View style={styles.nextlevelcircle}>
        <LevelCircle level={nlString} bgColor="#ed712e"></LevelCircle>
      </View>
      <View style={styles.curlevelcircle}>
        <LevelCircle level={clString} bgColor="#573087"></LevelCircle>
      </View>
      <View style={styles.levelpercentdisplay}>
        <LevelPercent
          level={clString}
          percent={nextLevelPercent}></LevelPercent>
      </View>
      <View style={styles.coindisplay2}>
        <CoinDisplayer numberOfCoins={nextCoins}></CoinDisplayer>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  csvg: {},
  coindisplay: {
    position: 'absolute',
    zIndex: 2,
    top: 10,
    left: 5,
    width: '100%',
    height: '100%',
  },
  leveldisplay: {
    zIndex: 2,
    position: 'absolute',
    top: 10,
    left: 300,
  },
  nextlevelcircle: {
    zIndex: 2,
    position: 'absolute',
    top: 330,
    left: 206,
  },
  curlevelcircle: {
    zIndex: 2,
    position: 'absolute',
    top: 600,
    left: 163,
  },
  levelpercentdisplay: {
    zIndex: 2,
    position: 'absolute',
    top: 440,
    left: 250,
  },
  coindisplay2: {
    zIndex: 3,
    position: 'absolute',
    top: 200,
    left: 165,
    width: '100%',
    height: '100%',
    transform: [{scale: 0.7}],
  },
});
