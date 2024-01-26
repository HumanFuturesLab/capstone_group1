import React from 'react';

import {
    Text,
    Button,
    View
} from 'react-native';

const CorporateHome = ({navigation}) => {
    return(
        <View>
            <Text>This is the corporate home page</Text>
            <Button
                title="Logout"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

export default CorporateHome;
