import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Switch,
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const Register: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePolicyPress = async () => {
    try {
      const supported = await Linking.canOpenURL('../assets/policy.txt');
      if (supported) {
        await Linking.openURL('../assets/policy.txt');
      } else {
        alert('Policy file cannot be opened.');
      }
    } catch (error) {
      console.error('An error occurred: ', error);
    }
  };
  
  const screenDimensions = Dimensions.get('window');
  const iconSize = Math.min(screenDimensions.width, screenDimensions.height) * 0.4;

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/main_icon.png')}
        style={[styles.icon, { width: iconSize, height: iconSize }]}
      />
      <Text style={[styles.title, { fontFamily: 'serif' }]}>Register</Text>
      <TextInput
        style={[styles.input, styles.whiteBackground, styles.roundedInput, { fontFamily: 'serif' }]}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={[styles.input, styles.whiteBackground, styles.roundedInput, { fontFamily: 'serif' }]}
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.passwordInput,
            styles.roundedInput,
            styles.passwordField,
            { fontFamily: 'serif', height: 40, backgroundColor: 'white' },
          ]}
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
          <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.agreeContainer}>
        <Switch value={agreeToPolicy} onValueChange={(value) => setAgreeToPolicy(value)} />
        <Text style={[styles.agreeText, { fontFamily: 'serif' }]}>
          I agree to the{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={handlePolicyPress}
          >
            policy
          </Text>
        </Text>
      </View>
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.loginLink, { fontFamily: 'serif' }]}>Already have an account? Login</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    width: '80%',
    height: 40,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  roundedInput: {
    borderRadius: 15, // Add border radius
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
