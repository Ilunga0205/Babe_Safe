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
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import AdvancedDatePicker from '../AdvancedDatePicker';
import colors from '../../constants/colors';

const VisitsModal = ({ visible, onClose, onSave, selectedDate }) => {
  const [doctorName, setDoctorName] = useState('');
  const [visitType, setVisitType] = useState('');
  const [visitNotes, setVisitNotes] = useState('');
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());
  const [selectedTimeObj, setSelectedTimeObj] = useState(new Date());
  const [modalAnimation] = useState(new Animated.Value(0));
  
  // Predefined visit types
  const visitTypes = [
    'Well-baby checkup',
    'Sick visit',
    'Follow-up',
    'Specialist consultation',
    'Emergency',
    'Other'
  ];
  
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
        setDoctorName('');
        setVisitType('');
        setVisitNotes('');
      }, 300);
    }
  }, [visible]);
  
  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDateObj(date);
  };
  
  // Handle time selection
  const handleTimeChange = (time) => {
    setSelectedTimeObj(time);
  };
  
  // Add new visit handler
  const handleAddVisit = () => {
    if (!doctorName.trim()) {
      Alert.alert('Required Field', 'Please enter a doctor name');
      return;
    }
    
    if (!visitType) {
      Alert.alert('Required Field', 'Please select a visit type');
      return;
    }
    
    // Combine date and time
    const visitDateTime = new Date(selectedDateObj);
    visitDateTime.setHours(selectedTimeObj.getHours());
    visitDateTime.setMinutes(selectedTimeObj.getMinutes());
    
    const newVisit = {
      id: Date.now().toString(),
      doctorName: doctorName,
      type: visitType,
      dateTime: visitDateTime.toISOString(),
      notes: visitNotes
    };
    
    if (onSave) {
      onSave(newVisit);
    }
    
    // Reset form and close modal
    setDoctorName('');
    setVisitType('');
    setVisitNotes('');
    onClose();
    
    // Show success message
    Alert.alert('Success', 'Doctor visit scheduled successfully');
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
            <Text style={styles.modalTitle}>Schedule Doctor Visit</Text>
            <View style={styles.headerRight} />
          </View>
          
          <ScrollView 
            style={styles.modalFormContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalFormContent}
          >
            <View style={styles.visitIconHeader}>
              <View style={styles.iconCircle}>
                <FontAwesome5 name="hospital" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.modalSubtitle}>
                Add an upcoming or past doctor visit
              </Text>
            </View>
            
            {/* Doctor Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Doctor Name</Text>
              <TextInput
                style={styles.textInput}
                value={doctorName}
                onChangeText={setDoctorName}
                placeholder="e.g. Dr. Smith"
                placeholderTextColor={colors.textLight}
              />
            </View>
            
            {/* Visit Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Visit Type</Text>
              <View style={styles.visitTypeContainer}>
                {visitTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.visitTypeButton,
                      visitType === type && styles.selectedVisitType
                    ]}
                    onPress={() => setVisitType(type)}
                  >
                    <Text
                      style={[
                        styles.visitTypeText,
                        visitType === type && styles.selectedVisitTypeText
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Visit Date & Time */}
            <View style={styles.dateTimeContainer}>
              {/* Visit Date */}
              <View style={[styles.inputGroup, styles.dateInputGroup]}>
                <AdvancedDatePicker
                  label="Visit Date"
                  value={selectedDateObj}
                  onChange={handleDateChange}
                  placeholder="Select date"
                  minimumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // 1 year in past
                  maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} // 1 year in future
                />
              </View>
              
              {/* Visit Time */}
              <View style={[styles.inputGroup, styles.timeInputGroup]}>
                <Text style={styles.inputLabel}>Visit Time</Text>
                <View style={styles.timePickerContainer}>
                  <TouchableOpacity 
                    style={styles.timePicker}
                    onPress={() => {
                      // Here you would typically show a time picker
                      // For simplicity, we're just using a few preset times
                      Alert.alert(
                        "Select Time",
                        "Choose a time for the visit",
                        [
                          { text: "9:00 AM", onPress: () => {
                            const time = new Date();
                            time.setHours(9, 0, 0);
                            setSelectedTimeObj(time);
                          }},
                          { text: "12:00 PM", onPress: () => {
                            const time = new Date();
                            time.setHours(12, 0, 0);
                            setSelectedTimeObj(time);
                          }},
                          { text: "3:00 PM", onPress: () => {
                            const time = new Date();
                            time.setHours(15, 0, 0);
                            setSelectedTimeObj(time);
                          }},
                          { text: "Cancel", style: "cancel" }
                        ]
                      );
                    }}
                  >
                    <Text style={styles.timePickerText}>
                      {selectedTimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <Ionicons name="time-outline" size={20} color={colors.textGray} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            {/* Notes */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Notes (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textAreaInput]}
                value={visitNotes}
                onChangeText={setVisitNotes}
                placeholder="Reason for visit, symptoms, questions for the doctor, etc."
                placeholderTextColor={colors.textLight}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={4}
              />
            </View>
            
            {/* Reminders Info */}
            <View style={styles.infoBox}>
              <MaterialIcons name="info-outline" size={20} color="#5f819e" />
              <Text style={styles.infoBoxText}>
                You'll receive a reminder notification 24 hours before the scheduled visit.
              </Text>
            </View>
          </ScrollView>
          
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleAddVisit}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>Schedule Visit</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

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
  visitIconHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5f819e',
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
  visitTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  visitTypeButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
  },
  selectedVisitType: {
    backgroundColor: '#5f819e',
  },
  visitTypeText: {
    fontSize: 13,
    color: colors.textDark,
  },
  selectedVisitTypeText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  dateInputGroup: {
    flex: 1.5,
    marginHorizontal: 8,
  },
  timeInputGroup: {
    flex: 1,
    marginHorizontal: 8,
  },
  timePickerContainer: {
    flexDirection: 'row',
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  timePickerText: {
    fontSize: 16,
    color: colors.textDark,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#EFF3F8',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  infoBoxText: {
    flex: 1,
    fontSize: 13,
    color: colors.textGray,
    marginLeft: 12,
    lineHeight: 18,
  },
  modalButtonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#5f819e',
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

export default VisitsModal;