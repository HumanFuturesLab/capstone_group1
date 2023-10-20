import React from 'react';

import {
    Text,
    Button,
    View
} from 'react-native';

const SignUp = ({navigation}) => {
    return(
        <View>
            <Button
                title="Back to Sign In"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

export default SignUp;