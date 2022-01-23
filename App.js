import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './src/screens/Landing';
import { initializeApp } from "firebase/app";
import Register from './src/screens/Register';
import 'react-native-gesture-handler';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/Homscreen';

const firebaseConfig = {
  apiKey: "AIzaSyAGS1ZIjXSsLvjZSEgTsT7A9pBmOp8pDTM",
  authDomain: "instaclone-94580.firebaseapp.com",
  projectId: "instaclone-94580",
  storageBucket: "instaclone-94580.appspot.com",
  messagingSenderId: "966873154362",
  appId: "1:966873154362:web:056fa6407dae706f9f0603"
};

const app = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }

    // AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);
  
  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
          <Stack.Screen name="HomeScreen" component={OnboardingScreen} />
          <Stack.Screen name='Landing' component={Landing}/>
          <Stack.Screen name='Register' component={Register}/>
        </Stack.Navigator>
      </NavigationContainer>
  ))

}