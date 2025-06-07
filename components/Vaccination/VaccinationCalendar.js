import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import colors from '../../constants/colors';

const VaccinationCalendar = ({ 
  markedDates, 
  onDayPress, 
  selectedDate,
  style 
}) => {
  return (
    <View style={[styles.calendarContainer, style]}>
      <Calendar
        markedDates={markedDates}
        onDayPress={onDayPress}
        current={selectedDate}
        theme={{
          backgroundColor: '#FFFFFF',
          calendarBackground: '#FFFFFF',
          textSectionTitleColor: colors.textDark,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: colors.primary,
          dayTextColor: colors.textDark,
          textDisabledColor: colors.textLight,
          dotColor: colors.primary,
          selectedDotColor: '#FFFFFF',
          arrowColor: colors.primary,
          monthTextColor: colors.textDark,
          indicatorColor: colors.primary,
          textDayFontWeight: '300',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '500',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default VaccinationCalendar;