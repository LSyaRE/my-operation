import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Login from './login';

export default function Home() {
 
  
  return (
    <View style={styles.container} >
        <Login></Login>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    height: '100%',
  }
});
