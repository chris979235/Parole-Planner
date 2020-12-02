import React, { useState } from 'react'
import { View, Button } from 'react-native'
import firebase from '../config/firebase'
import { TextInput } from 'react-native-gesture-handler'


export default function ForgotPasswordScreen(props){

const {navigation} = props

const [email, setEmail] = useState('')

async function handlePasswordReset(){
    try {
        firebase.passwordReset(email)
        alert(`Password reset sent to email ${email}`)
        navigation.navigate('LoginScreen')
    }catch(err){
        alert(err.message)
    }
}

    return(
        <View>
            <TextInput placeholder="email" onChangeText={(text) => setEmail(text)}/>
            <Button onPress={handlePasswordReset} title="Reset Password"/>
        </View>
    )
}