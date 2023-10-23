import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
      <TextInput
        style={[styles.input, { fontFamily: 'serif', backgroundColor: 'white' }]}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
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
});

export default Login;
