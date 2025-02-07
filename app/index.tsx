import { AuthService } from '@/services/auth-service';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Login from './login';

const Home: React.FC<{ onHome: (username: string, password: string) => void }> = ({ onHome }) => {
 
  

  return (
    <View >
        <Login></Login>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Home;