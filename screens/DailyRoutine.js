import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  FlatList,
  Dimensions
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Styles
import styles from './styles/DailyRoutinesStyles';

// Constants
import colors from '../constants/colors';

const { width } = Dimensions.get('window');

export default function DailyRoutine({ baby, routineData, onRoutineUpdate, currentMonth, onMonthChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'feeding', 'sleep', 'diapers'
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [modalType, setModalType] = useState('feeding'); // 'feeding', 'sleep', 'diaper'
  const [currentData, setCurrentData] = useState(null);

  // Form states
  const [feedingForm, setFeedingForm] = useState({
    time: new Date(),
    type: 'breast', // 'breast', 'bottle', 'solid'
    duration: '',
    amount: '',
    notes: ''
  });

  const [sleepForm, setSleepForm] = useState({
    startTime: new Date(),
    endTime: new Date(),
    quality: 'good', // 'excellent', 'good', 'fair', 'poor'
    location: 'crib', // 'crib', 'bassinet', 'bed', 'stroller'
    notes: ''
  });

  const [diaperForm, setDiaperForm] = useState({
    time: new Date(),
    type: 'wet', // 'wet', 'soiled', 'both'
    consistency: 'soft', // 'soft', 'firm', 'loose', 'hard'
    color: 'yellow', // 'yellow', 'brown', 'green', 'other'
    notes: ''
  });

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerTarget, setTimePickerTarget] = useState(null);

  // Initialize selected date with today
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  // Get routine data for selected date
  const getSelectedDateData = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return routineData[dateStr] || { date: dateStr, feeding: [], sleep: [], diapers: [] };
  };

  // Get days in current month for calendar view
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before first day of month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      const hasData = routineData[dateStr] && (
        routineData[dateStr].feeding.length > 0 ||
        routineData[dateStr].sleep.length > 0 ||
        routineData[dateStr].diapers.length > 0
      );
      
      days.push({
        date,
        day,
        dateStr,
        hasData,
        isToday: dateStr === new Date().toISOString().split('T')[0],
        isSelected: dateStr === selectedDate.toISOString().split('T')[0]
      });
    }

    return days;
  };

  // Handle month navigation
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    onMonthChange(newMonth);
  };

  // Handle adding new routine entry
  const handleAddEntry = (type) => {
    setModalType(type);
    setCurrentData(null);
    
    // Reset forms
    if (type === 'feeding') {
      setFeedingForm({
        time: new Date(),
        type: 'breast',
        duration: '',
        amount: '',
        notes: ''
      });
    } else if (type === 'sleep') {
      setSleepForm({
        startTime: new Date(),
        endTime: new Date(),
        quality: 'good',
        location: 'crib',
        notes: ''
      });
    } else if (type === 'diaper') {
      setDiaperForm({
        time: new Date(),
        type: 'wet',
        consistency: 'soft',
        color: 'yellow',
        notes: ''
      });
    }
    
    setIsAddModalVisible(true);
  };

  // Handle saving routine entry
  const handleSaveEntry = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const currentDateData = getSelectedDateData();
    
    let newEntry;
    let categoryKey;

    if (modalType === 'feeding') {
      newEntry = {
        id: `feed_${dateStr}_${Date.now()}`,
        time: feedingForm.time.toTimeString().slice(0, 5),
        type: feedingForm.type,
        duration: parseInt(feedingForm.duration) || 0,
        amount: parseInt(feedingForm.amount) || null,
        notes: feedingForm.notes
      };
      categoryKey = 'feeding';
    } else if (modalType === 'sleep') {
      const duration = Math.round((sleepForm.endTime - sleepForm.startTime) / (1000 * 60)); // minutes
      newEntry = {
        id: `sleep_${dateStr}_${Date.now()}`,
        startTime: sleepForm.startTime.toTimeString().slice(0, 5),
        endTime: sleepForm.endTime.toTimeString().slice(0, 5),
        duration: duration > 0 ? duration : 0,
        quality: sleepForm.quality,
        location: sleepForm.location,
        notes: sleepForm.notes
      };
      categoryKey = 'sleep';
    } else if (modalType === 'diaper') {
      newEntry = {
        id: `diaper_${dateStr}_${Date.now()}`,
        time: diaperForm.time.toTimeString().slice(0, 5),
        type: diaperForm.type,
        consistency: diaperForm.type === 'wet' ? null : diaperForm.consistency,
        color: diaperForm.type === 'wet' ? null : diaperForm.color,
        notes: diaperForm.notes
      };
      categoryKey = 'diapers';
    }

    // Add entry to current data
    const updatedData = { ...currentDateData };
    updatedData[categoryKey] = [...updatedData[categoryKey], newEntry];
    
    // Sort by time
    if (categoryKey === 'feeding' || categoryKey === 'diapers') {
      updatedData[categoryKey].sort((a, b) => a.time.localeCompare(b.time));
    } else if (categoryKey === 'sleep') {
      updatedData[categoryKey].sort((a, b) => a.startTime.localeCompare(b.startTime));
    }

    onRoutineUpdate(dateStr, updatedData);
    setIsAddModalVisible(false);
  };

  // Handle time picker
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    
    if (selectedTime && timePickerTarget) {
      if (modalType === 'feeding') {
        setFeedingForm(prev => ({ ...prev, [timePickerTarget]: selectedTime }));
      } else if (modalType === 'sleep') {
        setSleepForm(prev => ({ ...prev, [timePickerTarget]: selectedTime }));
      } else if (modalType === 'diaper') {
        setDiaperForm(prev => ({ ...prev, [timePickerTarget]: selectedTime }));
      }
    }
    
    setTimePickerTarget(null);
  };

  // Check for concerning patterns (like no bowel movement in 24+ hours)
  const checkForConcerns = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const concerns = [];
    
    // Check for no bowel movements in the last 24-48 hours
    const yesterday = new Date(selectedDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const todayDiapers = routineData[dateStr]?.diapers || [];
    const yesterdayDiapers = routineData[yesterdayStr]?.diapers || [];
    
    const hasBowelMovementToday = todayDiapers.some(d => d.type === 'soiled' || d.type === 'both');
    const hasBowelMovementYesterday = yesterdayDiapers.some(d => d.type === 'soiled' || d.type === 'both');
    
    if (!hasBowelMovementToday && !hasBowelMovementYesterday) {
      concerns.push({
        type: 'constipation',
        message: 'No bowel movement recorded in 24+ hours. Consider consulting your pediatrician.',
        severity: 'medium'
      });
    }

    // Check for feeding frequency (less than 6 times a day for newborns)
    const todayFeeding = routineData[dateStr]?.feeding || [];
    if (baby?.ageInDays < 90 && todayFeeding.length < 6) { // First 3 months
      concerns.push({
        type: 'feeding',
        message: 'Fewer than 6 feeding sessions today. Newborns typically need 8-12 feedings per day.',
        severity: 'low'
      });
    }

    return concerns;
  };

  // Render calendar day
  const renderCalendarDay = ({ item }) => {
    if (!item) {
      return <View style={styles.emptyCalendarDay} />;
    }

    return (
      <TouchableOpacity
        style={[
          styles.calendarDay,
          item.isSelected && styles.selectedCalendarDay,
          item.isToday && styles.todayCalendarDay,
          item.hasData && styles.calendarDayWithData
        ]}
        onPress={() => setSelectedDate(item.date)}
      >
        <Text style={[
          styles.calendarDayText,
          item.isSelected && styles.selectedCalendarDayText,
          item.isToday && styles.todayCalendarDayText
        ]}>
          {item.day}
        </Text>
        {item.hasData && <View style={styles.dataDot} />}
      </TouchableOpacity>
    );
  };

  // Render routine entry item
  const renderRoutineItem = ({ item, index }) => {
    let icon, title, subtitle, time;
    
    if (item.category === 'feeding') {
      icon = item.type === 'breast' ? 'child-care' : item.type === 'bottle' ? 'local-drink' : 'restaurant';
      title = `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Feeding`;
      subtitle = `${item.duration ? `${item.duration}min` : ''}${item.amount ? ` • ${item.amount}ml` : ''}`;
      time = item.time;
    } else if (item.category === 'sleep') {
      icon = 'hotel';
      title = `Sleep (${item.quality})`;
      subtitle = `${Math.floor(item.duration / 60)}h ${item.duration % 60}m • ${item.location}`;
      time = `${item.startTime} - ${item.endTime}`;
    } else if (item.category === 'diaper') {
      icon = 'child-care';
      title = `Diaper - ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`;
      subtitle = item.type !== 'wet' ? `${item.consistency} • ${item.color}` : '';
      time = item.time;
    }

    return (
      <View style={styles.routineItem}>
        <View style={styles.routineItemIcon}>
          <MaterialIcons name={icon} size={24} color={colors.primary} />
        </View>
        <View style={styles.routineItemContent}>
          <Text style={styles.routineItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.routineItemSubtitle}>{subtitle}</Text>}
          {item.notes && <Text style={styles.routineItemNotes}>{item.notes}</Text>}
        </View>
        <Text style={styles.routineItemTime}>{time}</Text>
      </View>
    );
  };

  // Prepare data for timeline view
  const getTimelineData = () => {
    const data = getSelectedDateData();
    const allItems = [];

    // Add feeding items
    data.feeding.forEach(item => {
      allItems.push({ ...item, category: 'feeding' });
    });

    // Add sleep items
    data.sleep.forEach(item => {
      allItems.push({ ...item, category: 'sleep' });
    });

    // Add diaper items
    data.diapers.forEach(item => {
      allItems.push({ ...item, category: 'diaper' });
    });

    // Sort by time
    allItems.sort((a, b) => {
      const timeA = a.time || a.startTime;
      const timeB = b.time || b.startTime;
      return timeA.localeCompare(timeB);
    });

    // Filter by active category
    if (activeCategory !== 'all') {
      return allItems.filter(item => {
        if (activeCategory === 'feeding') return item.category === 'feeding';
        if (activeCategory === 'sleep') return item.category === 'sleep';
        if (activeCategory === 'diapers') return item.category === 'diaper';
        return true;
      });
    }

    return allItems;
  };

  // Render add entry modal
  const renderAddEntryModal = () => {
    return (
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Add {modalType.charAt(0).toUpperCase() + modalType.slice(1)} Entry
              </Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
                <MaterialIcons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {modalType === 'feeding' && (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Time</Text>
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => {
                        setTimePickerTarget('time');
                        setShowTimePicker(true);
                      }}
                    >
                      <Text style={styles.timeButtonText}>
                        {feedingForm.time.toTimeString().slice(0, 5)}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Type</Text>
                    <View style={styles.optionGroup}>
                      {['breast', 'bottle', 'solid'].map(type => (
                        <TouchableOpacity
                          key={type}
                          style={[
                            styles.optionButton,
                            feedingForm.type === type && styles.optionButtonActive
                          ]}
                          onPress={() => setFeedingForm(prev => ({ ...prev, type }))}
                        >
                          <Text style={[
                            styles.optionButtonText,
                            feedingForm.type === type && styles.optionButtonTextActive
                          ]}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Duration (minutes)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={feedingForm.duration}
                      onChangeText={(text) => setFeedingForm(prev => ({ ...prev, duration: text }))}
                      placeholder="e.g., 20"
                      keyboardType="numeric"
                    />
                  </View>

                  {feedingForm.type === 'bottle' && (
                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Amount (ml)</Text>
                      <TextInput
                        style={styles.textInput}
                        value={feedingForm.amount}
                        onChangeText={(text) => setFeedingForm(prev => ({ ...prev, amount: text }))}
                        placeholder="e.g., 120"
                        keyboardType="numeric"
                      />
                    </View>
                  )}

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Notes (optional)</Text>
                    <TextInput
                      style={[styles.textInput, styles.textArea]}
                      value={feedingForm.notes}
                      onChangeText={(text) => setFeedingForm(prev => ({ ...prev, notes: text }))}
                      placeholder="Any additional notes..."
                      multiline
                      numberOfLines={3}
                    />
                  </View>
                </>
              )}

              {modalType === 'sleep' && (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Start Time</Text>
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => {
                        setTimePickerTarget('startTime');
                        setShowTimePicker(true);
                      }}
                    >
                      <Text style={styles.timeButtonText}>
                        {sleepForm.startTime.toTimeString().slice(0, 5)}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>End Time</Text>
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => {
                        setTimePickerTarget('endTime');
                        setShowTimePicker(true);
                      }}
                    >
                      <Text style={styles.timeButtonText}>
                        {sleepForm.endTime.toTimeString().slice(0, 5)}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Quality</Text>
                    <View style={styles.optionGroup}>
                      {['excellent', 'good', 'fair', 'poor'].map(quality => (
                        <TouchableOpacity
                          key={quality}
                          style={[
                            styles.optionButton,
                            sleepForm.quality === quality && styles.optionButtonActive
                          ]}
                          onPress={() => setSleepForm(prev => ({ ...prev, quality }))}
                        >
                          <Text style={[
                            styles.optionButtonText,
                            sleepForm.quality === quality && styles.optionButtonTextActive
                          ]}>
                            {quality.charAt(0).toUpperCase() + quality.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Location</Text>
                    <View style={styles.optionGroup}>
                      {['crib', 'bassinet', 'bed', 'stroller'].map(location => (
                        <TouchableOpacity
                          key={location}
                          style={[
                            styles.optionButton,
                            sleepForm.location === location && styles.optionButtonActive
                          ]}
                          onPress={() => setSleepForm(prev => ({ ...prev, location }))}
                        >
                          <Text style={[
                            styles.optionButtonText,
                            sleepForm.location === location && styles.optionButtonTextActive
                          ]}>
                            {location.charAt(0).toUpperCase() + location.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Notes (optional)</Text>
                    <TextInput
                      style={[styles.textInput, styles.textArea]}
                      value={sleepForm.notes}
                      onChangeText={(text) => setSleepForm(prev => ({ ...prev, notes: text }))}
                      placeholder="Any additional notes..."
                      multiline
                      numberOfLines={3}
                    />
                  </View>
                </>
              )}

              {modalType === 'diaper' && (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Time</Text>
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => {
                        setTimePickerTarget('time');
                        setShowTimePicker(true);
                      }}
                    >
                      <Text style={styles.timeButtonText}>
                        {diaperForm.time.toTimeString().slice(0, 5)}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Type</Text>
                    <View style={styles.optionGroup}>
                      {['wet', 'soiled', 'both'].map(type => (
                        <TouchableOpacity
                          key={type}
                          style={[
                            styles.optionButton,
                            diaperForm.type === type && styles.optionButtonActive
                          ]}
                          onPress={() => setDiaperForm(prev => ({ ...prev, type }))}
                        >
                          <Text style={[
                            styles.optionButtonText,
                            diaperForm.type === type && styles.optionButtonTextActive
                          ]}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {(diaperForm.type === 'soiled' || diaperForm.type === 'both') && (
                    <>
                      <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Consistency</Text>
                        <View style={styles.optionGroup}>
                          {['soft', 'firm', 'loose', 'hard'].map(consistency => (
                            <TouchableOpacity
                              key={consistency}
                              style={[
                                styles.optionButton,
                                diaperForm.consistency === consistency && styles.optionButtonActive
                              ]}
                              onPress={() => setDiaperForm(prev => ({ ...prev, consistency }))}
                            >
                              <Text style={[
                                styles.optionButtonText,
                                diaperForm.consistency === consistency && styles.optionButtonTextActive
                              ]}>
                                {consistency.charAt(0).toUpperCase() + consistency.slice(1)}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Color</Text>
                        <View style={styles.optionGroup}>
                          {['yellow', 'brown', 'green', 'other'].map(color => (
                            <TouchableOpacity
                              key={color}
                              style={[
                                styles.optionButton,
                                diaperForm.color === color && styles.optionButtonActive
                              ]}
                              onPress={() => setDiaperForm(prev => ({ ...prev, color }))}
                            >
                              <Text style={[
                                styles.optionButtonText,
                                diaperForm.color === color && styles.optionButtonTextActive
                              ]}>
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </>
                  )}

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Notes (optional)</Text>
                    <TextInput
                      style={[styles.textInput, styles.textArea]}
                      value={diaperForm.notes}
                      onChangeText={(text) => setDiaperForm(prev => ({ ...prev, notes: text }))}
                      placeholder="Any additional notes..."
                      multiline
                      numberOfLines={3}
                    />
                  </View>
                </>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsAddModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveEntry}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showTimePicker && (
          <DateTimePicker
            value={
              modalType === 'feeding' ? (timePickerTarget === 'time' ? feedingForm.time : new Date()) :
              modalType === 'sleep' ? (
                timePickerTarget === 'startTime' ? sleepForm.startTime :
                timePickerTarget === 'endTime' ? sleepForm.endTime : new Date()
              ) :
              modalType === 'diaper' ? (timePickerTarget === 'time' ? diaperForm.time : new Date()) :
              new Date()
            }
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </Modal>
    );
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const concerns = checkForConcerns();
  const timelineData = getTimelineData();

  return (
    <View style={styles.container}>
      {/* Month Header */}
      <View style={styles.monthHeader}>
        <TouchableOpacity onPress={() => navigateMonth(-1)} style={styles.monthNavButton}>
          <MaterialIcons name="chevron-left" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.monthTitle}>{monthName}</Text>
        <TouchableOpacity onPress={() => navigateMonth(1)} style={styles.monthNavButton}>
          <MaterialIcons name="chevron-right" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <View style={styles.weekDaysHeader}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Text key={day} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>
        <FlatList
          data={getDaysInMonth()}
          renderItem={renderCalendarDay}
          numColumns={7}
          scrollEnabled={false}
          contentContainerStyle={styles.calendarGrid}
        />
      </View>

      {/* Concerns Alert */}
      {concerns.length > 0 && (
        <View style={styles.concernsContainer}>
          {concerns.map((concern, index) => (
            <View key={index} style={[styles.concernItem, styles[`concern${concern.severity.charAt(0).toUpperCase() + concern.severity.slice(1)}`]]}>
              <MaterialIcons 
                name={concern.severity === 'medium' ? 'warning' : 'info'} 
                size={20} 
                color={concern.severity === 'medium' ? '#ff9800' : '#2196f3'} 
              />
              <Text style={styles.concernText}>{concern.message}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Category Filter */}
      <View style={styles.categoryFilter}>
        {['all', 'feeding', 'sleep', 'diapers'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              activeCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text style={[
              styles.categoryButtonText,
              activeCategory === category && styles.activeCategoryButtonText
            ]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timeline */}
      <ScrollView style={styles.timeline} contentContainerStyle={styles.timelineContent}>
        {timelineData.length > 0 ? (
          <FlatList
            data={timelineData}
            renderItem={renderRoutineItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="event-note" size={48} color={colors.textSecondary} />
            <Text style={styles.emptyStateText}>No routine entries for this day</Text>
            <Text style={styles.emptyStateSubtext}>Start tracking by adding your first entry</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Add Buttons */}
     {/* Floating Add Buttons */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity
          style={[styles.addButton, styles.feedingButton]}
          onPress={() => handleAddEntry('feeding')}
        >
          <MaterialIcons name="restaurant" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addButton, styles.sleepButton]}
          onPress={() => handleAddEntry('sleep')}
        >
          <MaterialIcons name="hotel" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addButton, styles.diaperButton]}
          onPress={() => handleAddEntry('diaper')}
        >
          <MaterialIcons name="child-care" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Add Entry Modal */}
      {renderAddEntryModal()}
    </View>
  );
}