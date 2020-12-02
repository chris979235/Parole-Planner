import React, { useState, useEffect } from 'react'
import { ImageBackground, Text, Button, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default function HomeScreen(props){
const [quoteState, setQuoteState] = useState('')
const [randomQuote, setRandomQuote] = useState('')


useEffect(() => {
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      setQuoteState(data);
    });
    
}, [])

const randomNumber = () => {
    setRandomQuote(quoteState[Math.floor(Math.random() * quoteState.length)])
}

    return(
        <ImageBackground style = {styles.background}>
            <Button onPress={randomNumber} title='Quote of the Day'/>
            <Text>{randomQuote.author} {randomQuote.text}</Text>
            <View style={styles.contactButton}>
                <Button title='Contacts'/>
            </View>
            <Button style={styles.contactButton} title='Community Service Information'/>
            <Button style={styles.contactButton} title='Countdown for Days Sober'/>
            <Button style={styles.contactButton} title='Goal Tracking'/>
            <Button style={styles.contactButton} title='Journal'/>
            <Text>hello</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    contactButton:{
        width: '100%',
        height: 70,
        backgroundColor: "#fc5c65"
    }
})