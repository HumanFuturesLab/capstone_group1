import { Text, View, StyleSheet } from "react-native";

export const Level = ({level}) => {
    return (
        <View style={levelStyles.container}>
            <View style={levelStyles.extraContainer}>
                <Text style={levelStyles.text}>{level}</Text>
                <Text>LEVEL</Text>
            </View>
        </View>
    )
};

const levelStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    extraContainer: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        //borderColor: 'black',
        //borderWidth: 2,
        padding: 10,
        alignItems: 'center',
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