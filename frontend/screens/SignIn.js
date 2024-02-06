import React from 'react';

import {
    Text,
    Button,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const SignIn = ({navigation})=>{
    return(
        <View>
            <Text style={styles.text}>Username/Email</Text>
            <TextInput
                style={styles.input}
                
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
                style={styles.input}
                
            />
            <View style={styles.bigButton}>
                <Button
                    title="Login"
                    onPress={() => navigation.navigate('UserHome', {
                        userType: 1
                    })}
                />
            </View>
            <View style={styles.linkButton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Sign Up', {
                        msg: "This is a message"
                    })}
                >
                    <Text style={styles.linkText}>Don't Have An Account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignIn;

const styles = StyleSheet.create({
    input: {
        margin: 12,
        borderWidth: 1,
        height: 40,
    },
    text: {
        left: 12,
        top: 5,
        bottom: 5,
    },
    bigButton: {
        margin: 12,
    },
    linkButton: {
        padding: 8,
        backgroundColor: 'transparent',
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
})
