import React, {useState} from 'react'
import { View, Button, TextInput, Text } from 'react-native'
import firebase from 'firebase'
import app from '../config/firebase'
import * as Google from 'expo-google-app-auth';
import {IOS_CLIENT_ID, ANDROID_CLIENT_ID} from '@env'

export default function SignupScreen(props){
    const {navigation} = props

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function signup(){
        try{
            await app.register(email, password, firstName, lastName)
            navigation.navigate("LoginScreen")
        }catch(err){
            alert(err.message)
        }
    }

    function isUserEqual(googleUser, firebaseUser) {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        console.log(providerData)
        for (var i = 0; i < providerData.length; i++) {
          if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()) {
            return true;
          }
        }
      }
      return false;
    }

    function onSignIn(googleUser) {
      console.log('Google Auth Response', googleUser);
      var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        if (!isUserEqual(googleUser, firebaseUser)) {
          var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken,)
          firebase.auth().signInWithCredential(credential).catch(function(error) {
            
          });
        } else {
          console.log('User already signed-in Firebase.');
        }
      });
    }
    async function signInWithGoogleAsync() {
        try {
          const result = await Google.logInAsync({
            behavior: 'web',
            androidClientId: ANDROID_CLIENT_ID,
            iosClientId: IOS_CLIENT_ID,
            scopes: ['profile', 'email'],
          });      
          if (result.type === 'success') {
            navigation.navigate('DashboardScreen')
            onSignIn(result)
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

    return(
        <View>
            <View>
                <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)}/>
                <TextInput secureTextEntry={true} placeholder="Password"  onChangeText={(text) => setPassword(text)}/>
                <TextInput placeholder="First Name" onChangeText={(text) => setFirstName(text)}/>
                <TextInput placeholder="Last Name" onChangeText={(text) => setLastName(text)}/>
                <Button onPress={signup} title="Signup"/>
                <Button onPress={() => navigation.navigate("LoginScreen")}title = 'Already a user?'/>
                <Button onPress={() => signInWithGoogleAsync()} title="Signup with Google"/>
            </View>
        </View>
    )
}