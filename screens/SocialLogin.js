import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const SocialLogin = ({ onLoginSuccess }) => {
  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      // In a real implementation, you would use a library like @react-native-google-signin/google-signin
      // This is just a simulation for the example
      console.log('Google login initiated');
      
      // Simulate successful login after a short delay
      setTimeout(() => {
        // Mock user data from Google
        const userData = {
          fullName: 'Google User',
          email: 'googleuser@gmail.com',
          socialProvider: 'google'
        };
        
        // Call the callback with user data
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }
      }, 1000);
    } catch (error) {
      Alert.alert('Login Failed', 'Google login failed. Please try again.');
    }
  };

  // Handle Apple login
  const handleAppleLogin = async () => {
    try {
      // In a real implementation, you would use a library like @invertase/react-native-apple-authentication
      // This is just a simulation for the example
      console.log('Apple login initiated');
      
      // Simulate successful login after a short delay
      setTimeout(() => {
        // Mock user data from Apple
        const userData = {
          fullName: 'Apple User',
          email: 'appleuser@icloud.com',
          socialProvider: 'apple'
        };
        
        // Call the callback with user data
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }
      }, 1000);
    } catch (error) {
      Alert.alert('Login Failed', 'Apple login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.socialButton} 
        onPress={handleGoogleLogin}
        activeOpacity={0.7}
      >
        <Image 
          source={require('../../assets/google_icon.png')} 
          style={styles.socialIcon} 
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.socialButton} 
        onPress={handleAppleLogin}
        activeOpacity={0.7}
      >
        <Image 
          source={require('../../assets/apple_icon.png')} 
          style={styles.socialIcon} 
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
});

export default SocialLogin;