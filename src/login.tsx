import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import * as Font from 'expo-font';

const loadCustomFont = async () => {
  await Font.loadAsync({
    'custom-title': require('../fonts/title.ttf'),
  });
}

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);

  const handleLogin = () => {
    if (email === 'test@gmail.com' && /^[0-9]{1}$/.test(password)) {
      navigation.navigate('Home');
    } else {
      alert('Invalid credentials. Please use test@gmail.com and a single digit (0-9) as the password.');
    }
  };

  const handleForgotPassword = () => {
    // Implement the "Forgot Password" functionality
  };

  const screenDimensions = Dimensions.get('window');
  const iconSize = Math.min(screenDimensions.width, screenDimensions.height) * 0.4;

  useEffect(() => {
    // Load the custom font when the component mounts
    loadCustomFont()
      .then(() => setFontLoaded(true))
      .catch(error => console.error('Error loading font:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/main_icon.png')}
        style={[styles.icon, { width: iconSize, height: iconSize }]}
      />
      {fontLoaded && (
        <Text style={styles.title}>Login</Text>
      )}
      <TextInput
        style={[styles.input, { borderRadius: 15, backgroundColor: 'white' }]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={[styles.input, { borderRadius: 15, backgroundColor: 'white' }]}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot my password</Text>
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
    fontFamily: 'custom-title', // Use the custom font
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
  },
  forgotPassword: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default Login;
