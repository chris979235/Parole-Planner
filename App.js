import React from 'react';
import LoginScreen from './app/screens/LoginScreen'
import SignupScreen from './app/screens/SignupScreen'
import DashboardScreen from './app/screens/DashBoardScreen'
import ForgotPasswordScreen from './app/screens/ForgotPasssWordScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="SignupScreen" component={SignupScreen}/>
        <Stack.Screen name="DashboardScreen" component={DashboardScreen}/>
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


