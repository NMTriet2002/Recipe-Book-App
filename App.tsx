import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Import the necessary Firebase modules
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { LogBox } from 'react-native';

import Register from './src/register';
import Login from './src/login';
import ForgotPassword from './src/forgot_password';
import HomeScreen from './src/home';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import FullArticle from './src/fullArticle';
import WritePost from './src/writePost';
import EditPost from './src/editPost';
import PostsList from './src/postList';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtyIzh6RYP-reAhPqnfJtgSyYI7uB5aY0",
  authDomain: "recipe-book-b46f3.firebaseapp.com",
  projectId: "recipe-book-b46f3",
  storageBucket: "recipe-book-b46f3.appspot.com",
  messagingSenderId: "292452369983",
  appId: "1:292452369983:web:3a8f457ef4edd134e21a8a",
  measurementId: "G-6TGG49BSPD"
};

initializeApp(firebaseConfig);
// Initialize Firebase Firestore
export const db = getFirestore();
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
        <Stack.Screen name="Full Article" component={FullArticle} options={{ headerShown: false }} />
        <Stack.Screen name="WritePost" component={WritePost} options={{ headerShown: false }} />
        <Stack.Screen name="PostsList" component={PostsList} options={{ headerShown: false }} />
        <Stack.Screen name="EditPost" component={EditPost} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
