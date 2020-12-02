import React, {useState} from 'react'
import { View, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import firebase from 'firebase'
import app from '../config/firebase'
import * as Google from 'expo-google-app-auth';
import {IOS_CLIENT_ID, ANDROID_CLIENT_ID} from '@env'


export default function LoginScreen(props){

    const {navigation} = props
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login(){
        try{
            app.login(email, password)
            navigation.navigate("DashboardScreen")
        } catch(err){
            alert(err.message)
        }
    }
    function isUserEqual(googleUser, firebaseUser) {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
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
      var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        if (!isUserEqual(googleUser, firebaseUser)) {
          var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken)
          firebase
          .auth()
          .signInWithCredential(credential)
          .then(function(){
            console.log('User signed in')
          })
          .catch(function(error) {
            
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
            navigation.navigate("DashboardScreen")
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
                <Button onPress={login}title="Login"/>
                <Button onPress={() => navigation.navigate("SignupScreen")}title = 'Need to make an account?'/>
                <Button onPress={() => signInWithGoogleAsync()} title="Login with Google"/>
                <Button onPress={() => navigation.navigate("ForgotPasswordScreen")}title = "Forgot Password?"/>
            </View>
        </View>
    )
}