import React from 'react';

import {
    Text,
    Button,
    View,
} from 'react-native';

const SignIn = ({navigation})=>{
    return(
        <View>
            <Button
                title="Login"
                onPress={() => navigation.navigate('UserHome', {
                    userType: 1
                })}
            />
            <Button
                title="Don't Have an Account?"
                onPress={() => navigation.navigate('Sign Up', {
                    msg: "This is a message"
                })}
            />
        </View>
    )
}

export default SignIn;