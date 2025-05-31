import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AdvancedDatePicker from '../AdvancedDatePicker';
import colors from '../../constants/colors';

const VaccineModal = ({ visible, onClose, onSave, selectedDate }) => {
  const [vaccineName, setVaccineName] = useState('');
  const [vaccineNotes, setVaccineNotes] = useState('');
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());
  const [modalAnimation] = useState(new Animated.Value(0));
  
  // Update selected date when prop changes
  useEffect(() => {
    if (selectedDate) {
      setSelectedDateObj(selectedDate);
    }
  }, [selectedDate]);
  
  // Animate modal when visibility changes
  useEffect(() => {
    Animated.timing(modalAnimation, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, modalAnimation]);
  
  // Reset form when modal closes
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVaccineName('');
        setVaccineNotes('');
      }, 300);
    }
  }, [visible]);
  
  // Handle date selection from AdvancedDatePicker
  const handleDateChange = (date) => {
    setSelectedDateObj(date);
  };
  
  // Add new vaccination handler
  const handleAddVaccination = () => {
    if (!vaccineName.trim()) {
      Alert.alert('Required Field', 'Please enter a vaccine name');
      return;
    }
    
    const newVaccination = {
      id: Date.now().toString(),
      name: vaccineName,
      date: selectedDateObj.toISOString(),
      notes: vaccineNotes
    };
    
    onSave(newVaccination);
    
    // Reset form and close modal
    setVaccineName('');
    setVaccineNotes('');
    onClose();
    
    // Show success message
    Alert.alert('Success', 'Vaccination scheduled successfully');
  };
  
  const translateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });
  
  const backdropOpacity = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.View 
          style={[
            styles.modalBackdrop,
            { opacity: backdropOpacity }
          ]}
          pointerEvents="auto"
          onTouchStart={onClose}
        />
        
        <Animated.View 
          style={[
            styles.modalContainer,
            { transform: [{ translateY }] }
          ]}
        >
          <View style={styles.modalHandle} />
          
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={onClose}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color={colors.textGray} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Vaccination</Text>
            <View style={styles.headerRight} />
          </View>
          
          <ScrollView 
            style={styles.modalFormContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalFormContent}
          >
            <View style={styles.vaccinationIconHeader}>
              <View style={styles.iconCircle}>
                <FontAwesome5 name="syringe" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.modalSubtitle}>
                Record upcoming or completed vaccinations
              </Text>
            </View>
            
            {/* Vaccine Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Vaccine Name</Text>
              <TextInput
                style={styles.textInput}
                value={vaccineName}
                onChangeText={setVaccineName}
                placeholder="e.g. DTaP, MMR, Polio"
                placeholderTextColor={colors.textLight}
              />
            </View>
            
            {/* Vaccination Date - Using AdvancedDatePicker */}
            <View style={styles.inputGroup}>
              <AdvancedDatePicker
                label="Vaccination Date"
                value={selectedDateObj}
                onChange={handleDateChange}
                placeholder="Select vaccination date"
                minimumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // 1 year in past
                maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 5))} // 5 years in future
              />
            </View>
            
            {/* Notes */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Notes (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textAreaInput]}
                value={vaccineNotes}
                onChangeText={setVaccineNotes}
                placeholder="Any additional information, dose number, doctor's notes, etc."
                placeholderTextColor={colors.textLight}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={4}
              />
            </View>
            
            {/* Vaccination Reminders */}
            <View style={styles.infoBox}>
              <MaterialIcons name="info-outline" size={20} color={colors.primary} />
              <Text style={styles.infoBoxText}>
                You'll receive reminders for upcoming vaccinations. Make sure to set up notifications in your profile settings.
              </Text>
            </View>
            
            {/* Common Vaccines Information */}
            <View style={styles.recommendedVaccines}>
              <Text style={styles.recommendedTitle}>Recommended Vaccines</Text>
              <View style={styles.recommendedList}>
                {commonVaccines.map((vaccine, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={styles.recommendedItem}
                    onPress={() => setVaccineName(vaccine)}
                  >
                    <Text style={styles.recommendedText}>{vaccine}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleAddVaccination}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>Save Vaccination</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// Common vaccine names for quick selection
const commonVaccines = [
  'DTaP', 'Hepatitis B', 'Hib', 'PCV13', 'Polio (IPV)', 
  'Rotavirus', 'MMR', 'Varicella', 'Hepatitis A', 'Influenza',
];

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    minHeight: '60%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginTop: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  closeButton: {
    padding: 4,
  },
  headerRight: {
    width: 28,
  },
  modalFormContainer: {
    flex: 1,
  },
  modalFormContent: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 24 : 20,
  },
  vaccinationIconHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.textDark,
    backgroundColor: '#FFFFFF',
  },
  textAreaInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoBoxText: {
    flex: 1,
    fontSize: 13,
    color: colors.textGray,
    marginLeft: 12,
    lineHeight: 18,
  },
  recommendedVaccines: {
    marginBottom: 16,
  },
  recommendedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 12,
  },
  recommendedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recommendedItem: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
  },
  recommendedText: {
    fontSize: 12,
    color: colors.textDark,
  },
  modalButtonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VaccineModal;