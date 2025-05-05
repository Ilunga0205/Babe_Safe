import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Dimensions,
  FlatList,
  Alert
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const BirthdayDatePicker = ({ 
  value, 
  onChange = () => {}, // Provide default empty function to prevent undefined errors
  label, 
  error, 
  maximumDate = new Date(), // Default max date is today (can't be born in the future)
  minimumDate = new Date(1900, 0, 1), // Default min date is Jan 1, 1900
  placeholder = 'Select Birthday',
  accentColor = '#623131',
  onError = () => {} // Add an onError callback
}) => {
  const [showModal, setShowModal] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());
  const [viewDate, setViewDate] = useState(value || new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  
  // Generate years array between min and max date
  const currentYear = new Date().getFullYear();
  const minYear = minimumDate.getFullYear();
  const maxYear = maximumDate.getFullYear();
  
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i
  );

  useEffect(() => {
    if (value) {
      setTempDate(value);
      setViewDate(value);
    }
  }, [value]);

  useEffect(() => {
    generateCalendarDays(viewDate);
  }, [viewDate]);

  // Generate calendar days for the month view
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayIndex = firstDay.getDay();
    
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Create array of days for the calendar
    const days = [];
    
    // Add empty slots for days from previous month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({
        day: null,
        date: null
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        day: i,
        date: currentDate,
        isToday: isToday(currentDate),
        isSelected: isSameDay(currentDate, tempDate),
        isDisabled: isDateDisabled(currentDate)
      });
    }
    
    setCalendarDays(days);
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  // Check if two dates are the same day
  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Check if date is outside allowed range
  const isDateDisabled = (date) => {
    if (minimumDate && date < minimumDate) return true;
    if (maximumDate && date > maximumDate) return true;
    return false;
  };

  // Handle day selection in calendar
  const handleDayPress = (day) => {
    if (day.isDisabled || !day.date) return;
    
    setTempDate(day.date);
    generateCalendarDays(viewDate); // Refresh to update selection
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setViewDate(newDate);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setViewDate(newDate);
  };

  // Handle year selection
  const handleYearPress = (year) => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year);
    setViewDate(newDate);
    setShowYearSelector(false);
  };

  // Handle month selection
  const handleMonthPress = (monthIndex) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(monthIndex);
    setViewDate(newDate);
    setShowMonthSelector(false);
  };

  // Handle picker button press
  const handlePress = () => {
    setShowModal(true);
  };

  // Handle confirming date selection
  const handleConfirm = (date) => {
    setShowModal(false);
    try {
      if (typeof onChange === 'function') {
        onChange(date);
      } else {
        console.warn('BirthdayDatePicker: onChange prop is not a function');
        onError('onChange prop is not a function');
      }
    } catch (error) {
      console.error('Error in onChange handler:', error);
      onError(error.message);
    }
  };

  // Handle canceling date selection
  const handleCancel = () => {
    setShowModal(false);
    // Reset to the original value if canceled
    if (value) {
      setTempDate(value);
      setViewDate(value);
      generateCalendarDays(value);
    }
  };

  // Format date for display
  const formatValue = () => {
    if (!value) return placeholder;
    
    return value.toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate age from date
  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return ` (${age} years)`;
  };

  // Render calendar header with month and year
  const renderCalendarHeader = () => {
    const monthName = MONTHS[viewDate.getMonth()];
    const year = viewDate.getFullYear();
    
    return (
      <View style={styles.calendarHeader}>
        <TouchableOpacity 
          style={styles.monthArrow}
          onPress={goToPreviousMonth}
          disabled={minimumDate && new Date(viewDate.getFullYear(), viewDate.getMonth(), 0) < minimumDate}
        >
          <Ionicons name="chevron-back" size={24} color={accentColor} />
        </TouchableOpacity>
        
        <View style={styles.monthYearContainer}>
          <TouchableOpacity 
            style={styles.monthYearButton}
            onPress={() => setShowMonthSelector(true)}
          >
            <Text style={styles.monthYearText}>{monthName}</Text>
            <MaterialIcons name="arrow-drop-down" size={20} color="#333333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.monthYearButton}
            onPress={() => setShowYearSelector(true)}
          >
            <Text style={styles.monthYearText}>{year}</Text>
            <MaterialIcons name="arrow-drop-down" size={20} color="#333333" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.monthArrow}
          onPress={goToNextMonth}
          disabled={maximumDate && new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1) > maximumDate}
        >
          <Ionicons name="chevron-forward" size={24} color={accentColor} />
        </TouchableOpacity>
      </View>
    );
  };

  // Render day names row
  const renderDayNames = () => {
    return (
      <View style={styles.daysOfWeekContainer}>
        {DAY_NAMES.map((day, index) => (
          <Text key={index} style={styles.dayNameText}>
            {day}
          </Text>
        ))}
      </View>
    );
  };

  // Render calendar grid
  const renderCalendarGrid = () => {
    const chunks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      chunks.push(calendarDays.slice(i, i + 7));
    }
    
    return (
      <View style={styles.calendarGrid}>
        {chunks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((day, dayIndex) => (
              <TouchableOpacity
                key={dayIndex}
                style={[
                  styles.dayCell,
                  day.isToday && styles.todayCell,
                  day.isSelected && { backgroundColor: accentColor }
                ]}
                onPress={() => handleDayPress(day)}
                disabled={!day.date || day.isDisabled}
              >
                {day.day !== null ? (
                  <Text
                    style={[
                      styles.dayText,
                      day.isToday && styles.todayText,
                      day.isSelected && styles.selectedDayText,
                      day.isDisabled && styles.disabledDayText
                    ]}
                  >
                    {day.day}
                  </Text>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  // Render year selector
  const renderYearSelector = () => {
    return (
      <View style={styles.selectorContainer}>
        <TouchableOpacity 
          style={styles.selectorCloseButton} 
          onPress={() => setShowYearSelector(false)}
        >
          <Ionicons name="close" size={24} color="#757575" />
        </TouchableOpacity>
        
        <Text style={styles.selectorTitle}>Select Year</Text>
        
        <FlatList
          data={years}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.yearItem,
                viewDate.getFullYear() === item && { backgroundColor: accentColor }
              ]}
              onPress={() => handleYearPress(item)}
            >
              <Text 
                style={[
                  styles.yearText,
                  viewDate.getFullYear() === item && styles.selectedYearText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={3}
          contentContainerStyle={styles.yearGrid}
        />
      </View>
    );
  };

  // Render month selector
  const renderMonthSelector = () => {
    return (
      <View style={styles.selectorContainer}>
        <TouchableOpacity 
          style={styles.selectorCloseButton} 
          onPress={() => setShowMonthSelector(false)}
        >
          <Ionicons name="close" size={24} color="#757575" />
        </TouchableOpacity>
        
        <Text style={styles.selectorTitle}>Select Month</Text>
        
        <FlatList
          data={MONTHS}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.monthItem,
                viewDate.getMonth() === index && { backgroundColor: accentColor }
              ]}
              onPress={() => handleMonthPress(index)}
            >
              <Text 
                style={[
                  styles.monthText,
                  viewDate.getMonth() === index && styles.selectedMonthText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={3}
          contentContainerStyle={styles.monthGrid}
        />
      </View>
    );
  };

  // Render calendar view
  const renderCalendarView = () => {
    if (showYearSelector) {
      return renderYearSelector();
    }
    
    if (showMonthSelector) {
      return renderMonthSelector();
    }
    
    return (
      <View style={styles.calendarContainer}>
        {renderCalendarHeader()}
        {renderDayNames()}
        {renderCalendarGrid()}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.pickerButton, 
          error ? styles.errorBorder : null,
          { borderColor: error ? '#FF3B30' : accentColor }
        ]}
        onPress={handlePress}
      >
        <Text style={[
          styles.valueText,
          !value && styles.placeholderText
        ]}>
          {formatValue()}{value ? calculateAge(value) : ''}
        </Text>
        <MaterialIcons name="calendar-today" size={20} color="#757575" />
      </TouchableOpacity>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Custom Modal Picker */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={handleCancel}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={handleCancel}>
                    <Text style={[styles.cancelText, { color: accentColor }]}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <Text style={styles.modalTitle}>Select Birthday</Text>
                  
                  <TouchableOpacity onPress={() => handleConfirm(tempDate)}>
                    <Text style={[styles.doneText, { color: accentColor }]}>Done</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.pickerContainer}>
                  {renderCalendarView()}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  valueText: {
    fontSize: 16,
    color: '#333333',
  },
  placeholderText: {
    color: '#9E9E9E',
  },
  errorBorder: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333333',
  },
  cancelText: {
    fontSize: 16,
  },
  doneText: {
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    paddingVertical: 10,
  },
  
  // Calendar specific styles
  calendarContainer: {
    padding: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthYearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginHorizontal: 3,
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginRight: 2,
  },
  monthArrow: {
    padding: 5,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  dayNameText: {
    width: SCREEN_WIDTH / 7 - 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
  calendarGrid: {
    paddingTop: 10,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayCell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#333333',
  },
  todayCell: {
    borderWidth: 1,
    borderColor: '#6200EE',
  },
  todayText: {
    color: '#6200EE',
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  disabledDayText: {
    color: '#D0D0D0',
  },
  
  // Year selector styles
  selectorContainer: {
    padding: 10,
    maxHeight: 400,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 15,
  },
  selectorCloseButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  yearGrid: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  yearItem: {
    width: SCREEN_WIDTH / 3 - 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
  },
  yearText: {
    fontSize: 18,
    color: '#333333',
  },
  selectedYearText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  // Month selector styles
  monthGrid: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  monthItem: {
    width: SCREEN_WIDTH / 3 - 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
  },
  monthText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedMonthText: {
    color: '#FFFFFF',
    fontWeight: '600',
  }
});

export default BirthdayDatePicker;