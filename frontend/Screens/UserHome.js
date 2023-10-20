import React from 'react';

import {
    Text,
    Button,
    View
} from 'react-native';

const UserHome = ({navigation}) => {
    return(
        <View>
            <Text>This is the user home page</Text>
            <Button
                title="Logout"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

export default UserHome;