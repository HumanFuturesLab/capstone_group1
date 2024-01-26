import React from 'react';
import background from '../Images/dashboard3.jpg';

import {
    Text,
    Button,
    View,
    ImageBackground,
    StyleSheet
} from 'react-native';

const AdminHome = ({navigation}) => {
    return(
        <View>
            <ImageBackground
                source = {background}
                style = {styles.backgroundImage}
            >
                <Text>This is the admin home page</Text>
                <Button
                    title="Logout"
                    onPress={() => navigation.goBack()}
                />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
})

export default AdminHome;
