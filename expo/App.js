import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


export default function App() {
  // wait to get title
  const [title, setTitle] = useState("Loading...");

  // get title from server
  useEffect(() => {
    getTitle();
  }, []);

  function getTitle() {
    axios.get('http://localhost:90/title').then(response => {
      setTitle(response.data.title);
    })
  }

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <StatusBar style="auto" />
      <Button title="Refresh" onPress={getTitle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
