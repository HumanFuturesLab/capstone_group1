import { Text, View, StyleSheet } from "react-native";

export const WeekProgress = ({weekCoins}) => {
    return (
        <View style={styles.container}>
            <View style={styles.extraContainer}>
                <Text style={styles.smalltext}>This week's progress</Text>
                <View style={styles.textlines}>
                    <Text style={styles.largetext}>{weekCoins}</Text>
                    <Text style={styles.smalltext}> Gleos</Text>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    extraContainer: {
        alignItems: 'left',
        justifyContent: 'center',
        backgroundColor: '#B5A8ED',
        borderRadius: 10,
        paddingTop: 20,
        padding: 10,
        alignItems: 'left',
    },
    textlines: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    largetext: {
        fontSize: 48,
        color: 'white'
    },
    smalltext: {
        fontSize: 12,
        color: 'white'
    }

});