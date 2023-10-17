import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Dimensions, Switch } from 'react-native';

const Register: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
    } else if (!agreeToPolicy) {
      alert('Please agree to the policy to register.');
    } else {
      // Implement registration logic here
      alert('Registration successful!');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const screenDimensions = Dimensions.get('window');
  const iconSize = Math.min(screenDimensions.width, screenDimensions.height) * 0.4;

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/main_icon.png')}
        style={[styles.icon, { width: iconSize, height: iconSize }]}
      />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, { flex: 1 }]}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
        />
        <Switch
          value={showPassword}
          onValueChange={togglePasswordVisibility}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry={!showPassword}
      />
      <View style={styles.agreeContainer}>
        <Switch
          value={agreeToPolicy}
          onValueChange={(value) => setAgreeToPolicy(value)}
        />
        <Text style={styles.agreeText}>I agree to the policy</Text>
      </View>
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B0000', // Red-ish brown color
  },
  icon: {
    // No fixed dimensions here; set dynamically based on screen size
  },
  title: {
    fontFamily: 'custom-title',
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
  },
  agreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  agreeText: {
    marginLeft: 10,
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default Register;
