import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar } from 'react-native'; // Import StatusBar
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Feather } from '@expo/vector-icons';

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // User has successfully logged in, you can navigate to the home page or do other actions here.
      navigation.navigate('Home');
    } catch (error) {
      // Handle login errors
      alert('Invalid credentials. Please check your email and password.');
    }
  };
  
  const handleForgotPassword = () => {
    navigation.navigate('Forgot Password');
  };

  const handleRegister = () => {
    // Navigate to the Register page
    navigation.navigate('Register');
  };

  const screenDimensions = Dimensions.get('window');
  const iconSize = Math.min(screenDimensions.width, screenDimensions.height) * 0.4;
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    StatusBar.setBarStyle('light-content'); // Set status bar icons to white
    StatusBar.setBackgroundColor('#000000'); // Set the background color to black
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/main_icon.png')}
        style={[styles.icon, { width: iconSize, height: iconSize }]}
      />
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
  icon: {
    // No fixed dimensions here; set dynamically based on screen size
  },
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
    height: 40, // Increased height
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
    paddingLeft: 10, // Add padding to the left
  },
  passwordField: {
    borderWidth: 0, // Remove the border
  },
  eyeIcon: {
    paddingLeft: 5, // Add padding
  },
  roundedInput: {
    borderRadius: 15, // Add border radius
  },
});

export default Login;
