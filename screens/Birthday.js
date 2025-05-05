import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Keyboard,
  Animated,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// Custom components
import Header from '../components/Register/Header';
import FormInput from '../components/Register/FormInput';
import CustomButton from '../components/CustomButton';
import BirthdayDatePicker from '../components/BirthdayDatePicker';

// Constants and styles
import colors from '../constants/colors';
import styles from './styles/BirthdayStyles';

export default function Birthday({ navigation }) {
  // Form state
  const [birthdate, setBirthdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [birthdateConfirmed, setBirthdateConfirmed] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  
  // Validation state
  const [errors, setErrors] = useState({
    birthdate: '',
  });
  
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Shrikhand: require('../assets/fonts/Shrikhand-Regular.ttf'),
  });
  
  useEffect(() => {
    // Animate content on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();
    
    // Keyboard listeners
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    // Cleanup
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Date format helper
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Input validation functions
  const validateBirthdate = (date) => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    
    // Check if birthday has occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1 >= 18; // Not had birthday yet this year
    }
    return age >= 18; // Had birthday this year
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      birthdate: '',
    };
    
    // Validate birthdate (ensuring user is 18+)
    if (!validateBirthdate(birthdate)) {
      newErrors.birthdate = 'You must be at least 18 years old';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Handle date selection from BirthdayDatePicker
  const handleDateChange = (selectedDate) => {
    setBirthdate(selectedDate);
    setErrors({...errors, birthdate: ''});
  };

  // Handle date picker error
  const handleDatePickerError = (errorMessage) => {
    console.error("DatePicker error:", errorMessage);
    Alert.alert(
      "Error",
      "There was an issue with the date picker. Please try again.",
      [{ text: "OK" }]
    );
  };


  // Form submission
  const handleSubmitBirthdate = async () => {
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      try {
        // For demo purposes, simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Navigate directly to Home screen
        navigation.navigate('Home', { birthdate });
      } catch (error) {
        Alert.alert(
          "Error",
          "We couldn't process your birthdate. Please try again.",
          [{ text: "OK" }]
        );
        setIsLoading(false);
      }
    }
  };

  // Continue to next step
  const handleContinue = () => {
    // Navigate to the next registration step
    navigation.navigate('NextStep', { birthdate });
  };

  // Go back to previous step
  const handleBack = () => {
    navigation.goBack();
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header with back button */}
          <Header
            title="Babysafe"
            onBackPress={handleBack}
          />

          {/* Birthday form */}
          <Animated.View 
            style={[
              styles.formContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }] 
              }
            ]}
          >
            {/* Decorative top image */}
            <Image 
              source={require('../assets/babysafe_logo.png')} 
              style={styles.topImage}
              resizeMode="contain"
            />
            
            <Text style={styles.titleText}>Your Birthday</Text>
            
            {!birthdateConfirmed ? (
              <>
                <Text style={styles.subtitle}>
                  Please enter your date of birth to continue
                </Text>

                {/* Use BirthdayDatePicker component */}
                <BirthdayDatePicker
                  value={birthdate}
                  onChange={handleDateChange}
                  label="Date of Birth"
                  error={errors.birthdate}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                  placeholder="Select your birthdate"
                  accentColor={colors.primary}
                  onError={handleDatePickerError}
                />

                {/* Submit Button */}
                <CustomButton
                  title="Continue"
                  onPress={handleSubmitBirthdate}
                  loading={isLoading}
                  style={styles.resetButton}
                  textStyle={styles.resetButtonText}
                />
              </>
            ) : (
              // Success state
              <View style={styles.successContainer}>
                <Text style={styles.successTitle}>Birthday Confirmed</Text>
                <Text style={styles.successMessage}>
                  Your birthday has been successfully verified.
                </Text>
                <CustomButton
                  title="Continue"
                  onPress={handleContinue}
                  style={styles.resetButton}
                  textStyle={styles.resetButtonText}
                />
              </View>
            )}

            {/* Skip for now button (optional) */}
            {!birthdateConfirmed && (
              <TouchableOpacity 
                style={styles.signInContainer}
                onPress={handleBack}
              >
                <Text style={styles.signInText}>Need to go back? </Text>
                <Text style={styles.signInLink}>Previous Step</Text>
              </TouchableOpacity>
            )}
            
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}