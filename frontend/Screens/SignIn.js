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
                title="Login as User"
                onPress={() => navigation.navigate('UserHome')}
            />
            <Button
                title="Login as Corporate User"
                onPress={() => navigation.navigate('CorporateHome')}
            />
            <Button
                title="Login as Admin"
                onPress={() => navigation.navigate('AdminHome')}
            />
            <Button
                title="Don't Have an Account?"
                onPress={() => navigation.navigate('Sign Up')}
            />
        </View>
    )
}

export default SignIn;