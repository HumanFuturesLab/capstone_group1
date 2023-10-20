import React from 'react';

import {
    Text,
    Button,
    View
} from 'react-native';

const AdminHome = ({navigation}) => {
    return(
        <View>
            <Text>This is the admin home page</Text>
            <Button
                title="Logout"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

export default AdminHome;