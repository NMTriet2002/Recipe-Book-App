import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#000000');
  }, []);

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // Set session expiration time (30 minutes from now)
      const expirationTime = new Date().getTime() + 30 * 60 * 1000;
      await AsyncStorage.setItem('expirationTime', expirationTime.toString());

      // User has successfully logged in, navigate to the home page
      navigation.navigate('Home');
    } catch (error) {
      alert('Invalid credentials. Please check your email and password.');
    }
  };

  // const handleLogout = async () => {
  //   // Clear session data
  //   await AsyncStorage.removeItem('expirationTime');

  //   // Navigate to the login page
  //   navigation.navigate('Login');
  // };

  const checkSession = async () => {
    // Check if the session is still valid
    const expirationTime = await AsyncStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();

    if (expirationTime && currentTime < parseInt(expirationTime, 10)) {
      // Session is still valid, navigate to the home page
      navigation.navigate('Home');
    } else {
      // Session has expired, navigate to the login page
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    // Check session status when the component mounts
    checkSession();

    // Set up an interval to check the session status periodically (e.g., every minute)
    const intervalId = setInterval(checkSession, 60 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleForgotPassword = () => {
    navigation.navigate('Forgot Password');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const screenDimensions = Dimensions.get('window');
  const iconSize = Math.min(screenDimensions.width, screenDimensions.height) * 0.4;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/main_icon.png')} style={[styles.icon, { width: iconSize, height: iconSize }]} />
      <Text style={[styles.title, { fontFamily: 'serif' }]}>Login</Text>
      <TextInput
        style={[styles.input, { fontFamily: 'serif', backgroundColor: 'white' }]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.passwordInput,
            styles.roundedInput,
            styles.passwordField,
            { fontFamily: 'serif', height: 40, backgroundColor: 'white' },
          ]}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.linkText}>Forgot my password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.linkText}>Logout</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B0000',
    marginTop: 30,
  },
  icon: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
    paddingLeft: 10,
  },
  passwordField: {
    borderWidth: 0,
  },
  eyeIcon: {
    paddingLeft: 5,
  },
  roundedInput: {
    borderRadius: 15,
  },
});

export default Login;
