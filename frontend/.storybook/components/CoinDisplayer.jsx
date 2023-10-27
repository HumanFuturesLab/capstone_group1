import { Text, View, StyleSheet } from "react-native";
import Svg, { Circle, Image, SvgUri, SvgXml } from 'react-native-svg';
import Coin from '../imgs/coin.svg';

export const CoinDisplayer = ({numberOfCoins}) => {
    const xml = `<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.268 3.268L4.5 1L5.732 3.268L8 4.5L5.732 5.732L4.5 8L3.268 5.732L1 4.5L3.268 3.268Z" fill="white" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;//'./coin.svg';
    return (
        <View style={styles.container}>
            <Svg height="50" width="50" style={styles.svgContainer}>
                <Circle 
                    cx="30"
                    cy="25"
                    r="15"
                    fill="#82c360"
                    stroke="black"
                    strokeWidth="2"
                />
            </Svg>
            
            <SvgXml
                width="40%"
                height="40%"
                xml={xml}
                style={styles.svgx}>
            </SvgXml>
            
            <View style={styles.coinCount}>
                <Text style={styles.coinText}>{numberOfCoins}</Text>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    svgx: {
        position: 'absolute',
        //top: '20%',
        left: '-12.25%',
        //transform: [{translateX: 50}, {translateY: 50}],
        
    },
    svgContainer: {
        position: 'relative',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    coinCount: {
        backgroundColor: 'white',
        borderRadius: 17,
        padding: 5,
        marginLeft: -14,
        borderColor: 'black',
        borderWidth: 2, 
        zIndex:-1,
        alignItems: 'center',
    },
    coinText: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    
});