import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Import the necessary Firebase modules
import Register from './src/register';
import Login from './src/login';
import ForgotPassword from './src/forgot_password';
import HomeScreen from './src/home';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANzKuxP4yovUzhjv0bVdFL0t6-zLPKWK4",
  authDomain: "recipe-book-50e8e.firebaseapp.com",
  databaseURL: "https://recipe-book-50e8e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "recipe-book-50e8e",
  storageBucket: "recipe-book-50e8e.appspot.com",
  messagingSenderId: "969398336245",
  appId: "1:969398336245:web:91d2453d5d2a513284e3bc",
  measurementId: "G-0LG74C2KYJ"
};
initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(getApp(), {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
        <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{ headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
