import React from 'react';

import {
    Text,
    Button,
    View
} from 'react-native';

const SignUp = ({navigation}) => {
    return(
        <View>
            <Text>Sign up</Text>
            <Button
                title="Back to Sign In"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

export default SignUp;