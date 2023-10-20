import { Text, View, StyleSheet } from "react-native";
import Svg, { Circle, Image } from 'react-native-svg';


export const LevelPercent = ({level, percent}) => {
    return (
        <View style={levelPercentStyles.container}>
            <View style={levelPercentStyles.extraContainer}>
            <View style={levelPercentStyles.textlines}>
                <Text>Level </Text>
                <Text>{level}</Text>
            </View>
            <View style={levelPercentStyles.textlines}>
                <Text style={levelPercentStyles.text}>{percent}</Text>
                <Text style={levelPercentStyles.text}>%</Text>
            </View>
            </View>
        </View>
    );
};

const levelPercentStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    extraContainer: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
    },
    textlines: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
    }
})
