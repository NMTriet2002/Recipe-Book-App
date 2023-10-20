import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const ForgotPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendRecoveryMail = () => {
    // Implement the logic to send a recovery email
    alert('Recovery email sent to ' + email);
  };

  const handleBackToLogin = () => {
    // Navigate back to the Login page
    navigation.navigate('Login');
  };

  const screenDimensions = Dimensions.get('window');
  const iconSize = Math.min(screenDimensions.width, screenDimensions.height) * 0.4;

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/main_icon.png')}
        style={[styles.icon, { width: iconSize, height: iconSize }]}
      />
      <Text style={[styles.title, { fontFamily: 'serif' }]}>Forgot Password</Text>
      <TextInput
        style={[styles.input, { fontFamily: 'serif', backgroundColor: 'white' }]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <View style={styles.buttonContainer}>
        <Button title="Send Recovery Mail" onPress={handleSendRecoveryMail} />
      </View>
      <TouchableOpacity onPress={handleBackToLogin}>
        <Text style={styles.linkText}>Back to Login</Text>
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
    marginTop: 20, // Add margin to the button container to move it down
  },
});

export default ForgotPassword;
