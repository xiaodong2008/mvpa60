import { Text, StyleSheet, Button, View } from 'react-native';
import { get } from '../api';
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';

import Banner from '../components/banner';

export default function Page() {
    // wait to get title
  const [title, setTitle] = useState("Loading...");

  // get title from server
  useEffect(() => {
    getTitle();
  }, []);

  function getTitle() {
    get('/title').then(data => {
      setTitle(data.title);
    })
  }

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Button title="Refresh" onPress={getTitle} />
      {/* Switch to login page */}
      <Link href="/login">Login</Link>
        <Banner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});