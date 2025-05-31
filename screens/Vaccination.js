import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import AdvancedDatePicker from '../components/AdvancedDatePicker';
import VaccineModal from '../components/Vaccination/VaccineModal';
import VisitsModal from '../components/Vaccination/VisitsModal';

const { width } = Dimensions.get('window');

const Vaccination = ({ route, navigation }) => {
  const { baby } = route.params;
  const insets = useSafeAreaInsets();
  
  // State for vaccinations
  const [vaccinations, setVaccinations] = useState(baby.vaccinations || []);
  
  // State for visits - ADD THIS
  const [visits, setVisits] = useState(baby.visits || []);
  
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [showVisitsModal, setShowVisitsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Animation values
  const addButtonAnimation = useRef(new Animated.Value(0)).current;
  const fabScale = useRef(new Animated.Value(1)).current;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Set navigation title and options
  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the default header as we're creating a custom one
    });
  }, [navigation]);
  
  // Update marked dates whenever vaccinations or visits change - UPDATED
  useEffect(() => {
    const newMarkedDates = {};
    
    // Mark vaccination dates
    vaccinations.forEach(vacc => {
      const dateStr = new Date(vacc.date).toISOString().split('T')[0];
      newMarkedDates[dateStr] = { 
        selected: true, 
        marked: true, 
        selectedColor: colors.primary,
        dotColor: '#FFFFFF'
      };
    });
    
    // Mark visit dates
    visits.forEach(visit => {
      const dateStr = new Date(visit.dateTime).toISOString().split('T')[0];
      if (newMarkedDates[dateStr]) {
        // If there's already a vaccination on this date, add multiple dots
        newMarkedDates[dateStr].dots = [
          { color: colors.primary },
          { color: '#5f819e' }
        ];
      } else {
        newMarkedDates[dateStr] = { 
          selected: true, 
          marked: true, 
          selectedColor: '#5f819e',
          dotColor: '#FFFFFF'
        };
      }
    });
    
    setMarkedDates(newMarkedDates);
  }, [vaccinations, visits]); // Add visits to dependency array

  // Initialize selectedDate with current date in proper format
  useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    setSelectedDate(todayString);
    setSelectedDateObj(today);
  }, []);
  
  // Toggle FAB menu
  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;
    
    // Animate the button press effect
    Animated.sequence([
      Animated.timing(fabScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fabScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();

    // Animate the menu options
    Animated.timing(addButtonAnimation, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Animation interpolations for menu options
  const vaccinationTranslateY = addButtonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });
  
  const visitsTranslateY = addButtonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -120],
  });
  
  const menuBackgroundOpacity = addButtonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });
  
  const rotateInterpolate = addButtonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });
  
  // Handle date selection from the calendar
  const handleDayPress = (day) => {
    const dateObj = new Date(day.timestamp);
    setSelectedDateObj(dateObj);
    setSelectedDate(day.dateString);
  };
  
  // Add new vaccination handler
  const handleAddVaccination = (newVaccination) => {
    const updatedVaccinations = [...vaccinations, newVaccination];
    setVaccinations(updatedVaccinations);
    // In a real app, you would save to database/storage here
  };
  
  // Add new visit handler - ADD THIS
  const handleAddVisit = (newVisit) => {
    const updatedVisits = [...visits, newVisit];
    setVisits(updatedVisits);
    // In a real app, you would save to database/storage here
  };
  
  // Delete vaccination handler
  const handleDeleteVaccination = (id) => {
    // Delete vaccination logic...
    const updatedVaccinations = vaccinations.filter(v => v.id !== id);
    setVaccinations(updatedVaccinations);
  };
  
  // Delete visit handler - ADD THIS
  const handleDeleteVisit = (id) => {
    const updatedVisits = visits.filter(v => v.id !== id);
    setVisits(updatedVisits);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Format date and time - ADD THIS
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };
  
  // Check if date is past
  const isPastDate = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString);
    return date < today;
  };
  
  // Check if date is today
  const isToday = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  };
  
  // Sort vaccinations by date
  const sortedVaccinations = [...vaccinations].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  
  // Sort visits by date - ADD THIS
  const sortedVisits = [...visits].sort((a, b) => {
    return new Date(a.dateTime) - new Date(b.dateTime);
  });
  
  // Group vaccinations by upcoming and past
  const upcomingVaccinations = sortedVaccinations.filter(v => !isPastDate(v.date));
  const pastVaccinations = sortedVaccinations.filter(v => isPastDate(v.date));
  
  // Group visits by upcoming and past - ADD THIS
  const upcomingVisits = sortedVisits.filter(v => !isPastDate(v.dateTime));
  const pastVisits = sortedVisits.filter(v => isPastDate(v.dateTime));
  
  // Calculate header padding based on platform and insets
  const headerTopPadding = Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 24;

  // Sample recommended vaccination schedule for the Schedule tab
  const recommendedSchedule = [
    { id: 'rec1', name: 'Hepatitis B', age: 'Birth', notes: 'First dose' },
    { id: 'rec2', name: 'DTaP', age: '2 months', notes: 'Diphtheria, Tetanus, Pertussis' },
    { id: 'rec3', name: 'Polio (IPV)', age: '2 months', notes: 'First dose' },
    { id: 'rec4', name: 'HIB', age: '2 months', notes: 'Haemophilus Influenzae type b' },
    { id: 'rec5', name: 'Pneumococcal', age: '2 months', notes: 'PCV13' },
    { id: 'rec6', name: 'Rotavirus', age: '2 months', notes: 'First dose' },
    { id: 'rec7', name: 'Hepatitis B', age: '1-2 months', notes: 'Second dose' },
    { id: 'rec8', name: 'DTaP', age: '4 months', notes: 'Second dose' },
    { id: 'rec9', name: 'Polio (IPV)', age: '4 months', notes: 'Second dose' },
  ];

  // Render content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'upcoming':
        return (
          <View style={styles.sectionContainer}>
            {/* Upcoming Vaccinations */}
            <Text style={styles.sectionTitle}>Upcoming Vaccinations</Text>
            
            {upcomingVaccinations.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="calendar-check" size={24} color={colors.textLight} />
                <Text style={styles.emptyStateText}>No upcoming vaccinations</Text>
              </View>
            ) : (
              upcomingVaccinations.map(vaccination => (
                <View key={vaccination.id} style={styles.vaccinationCard}>
                  <View style={styles.vaccinationHeader}>
                    <View style={styles.vaccinationIconContainer}>
                      <FontAwesome5 name="syringe" size={14} color="#FFFFFF" />
                    </View>
                    <View style={styles.vaccinationHeaderContent}>
                      <Text style={styles.vaccinationName}>{vaccination.name}</Text>
                      <View style={styles.dateContainer}>
                        <MaterialIcons name="event" size={14} color={colors.textGray} />
                        <Text style={styles.dateText}>{formatDate(vaccination.date)}</Text>
                        {isToday(vaccination.date) && (
                          <View style={styles.todayBadge}>
                            <Text style={styles.todayText}>TODAY</Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDeleteVaccination(vaccination.id)}
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    >
                      <MaterialIcons name="close" size={20} color={colors.textLight} />
                    </TouchableOpacity>
                  </View>
                  
                  {vaccination.notes && (
                    <View style={styles.notesContainer}>
                      <Text style={styles.notesText}>{vaccination.notes}</Text>
                    </View>
                  )}
                </View>
              ))
            )}

            {/* Upcoming Visits - ADD THIS SECTION */}
            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Upcoming Doctor Visits</Text>
            
            {upcomingVisits.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="hospital" size={24} color={colors.textLight} />
                <Text style={styles.emptyStateText}>No upcoming doctor visits</Text>
              </View>
            ) : (
              upcomingVisits.map(visit => {
                const { date, time } = formatDateTime(visit.dateTime);
                return (
                  <View key={visit.id} style={styles.vaccinationCard}>
                    <View style={styles.vaccinationHeader}>
                      <View style={[styles.vaccinationIconContainer, { backgroundColor: '#5f819e' }]}>
                        <FontAwesome5 name="hospital" size={14} color="#FFFFFF" />
                      </View>
                      <View style={styles.vaccinationHeaderContent}>
                        <Text style={styles.vaccinationName}>{visit.doctorName}</Text>
                        <Text style={[styles.vaccinationName, { fontSize: 14, fontWeight: '500', color: colors.textGray }]}>{visit.type}</Text>
                        <View style={styles.dateContainer}>
                          <MaterialIcons name="event" size={14} color={colors.textGray} />
                          <Text style={styles.dateText}>{date} at {time}</Text>
                          {isToday(visit.dateTime) && (
                            <View style={styles.todayBadge}>
                              <Text style={styles.todayText}>TODAY</Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => handleDeleteVisit(visit.id)}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                      >
                        <MaterialIcons name="close" size={20} color={colors.textLight} />
                      </TouchableOpacity>
                    </View>
                    
                    {visit.notes && (
                      <View style={styles.notesContainer}>
                        <Text style={styles.notesText}>{visit.notes}</Text>
                      </View>
                    )}
                  </View>
                );
              })
            )}
          </View>
        );
      
      case 'past':
        return (
          <View style={styles.sectionContainer}>
            {/* Past Vaccinations */}
            <Text style={styles.sectionTitle}>Completed Vaccinations</Text>
            
            {pastVaccinations.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="check-circle" size={24} color={colors.textLight} />
                <Text style={styles.emptyStateText}>No completed vaccinations</Text>
              </View>
            ) : (
              pastVaccinations.map(vaccination => (
                <View key={vaccination.id} style={[styles.vaccinationCard, styles.pastVaccinationCard]}>
                  <View style={styles.vaccinationHeader}>
                    <View style={[styles.vaccinationIconContainer, styles.pastVaccinationIcon]}>
                      <FontAwesome5 name="check" size={14} color="#FFFFFF" />
                    </View>
                    <View style={styles.vaccinationHeaderContent}>
                      <Text style={styles.vaccinationName}>{vaccination.name}</Text>
                      <View style={styles.dateContainer}>
                        <MaterialIcons name="event" size={14} color={colors.textGray} />
                        <Text style={styles.dateText}>{formatDate(vaccination.date)}</Text>
                        <View style={styles.completedBadge}>
                          <Text style={styles.completedText}>COMPLETED</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDeleteVaccination(vaccination.id)}
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    >
                      <MaterialIcons name="close" size={20} color={colors.textLight} />
                    </TouchableOpacity>
                  </View>
                  
                  {vaccination.notes && (
                    <View style={styles.notesContainer}>
                      <Text style={styles.notesText}>{vaccination.notes}</Text>
                    </View>
                  )}
                </View>
              ))
            )}

            {/* Past Visits - ADD THIS SECTION */}
            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Past Doctor Visits</Text>
            
            {pastVisits.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="hospital" size={24} color={colors.textLight} />
                <Text style={styles.emptyStateText}>No past doctor visits</Text>
              </View>
            ) : (
              pastVisits.map(visit => {
                const { date, time } = formatDateTime(visit.dateTime);
                return (
                  <View key={visit.id} style={[styles.vaccinationCard, styles.pastVaccinationCard]}>
                    <View style={styles.vaccinationHeader}>
                      <View style={[styles.vaccinationIconContainer, { backgroundColor: colors.success }]}>
                        <FontAwesome5 name="check" size={14} color="#FFFFFF" />
                      </View>
                      <View style={styles.vaccinationHeaderContent}>
                        <Text style={styles.vaccinationName}>{visit.doctorName}</Text>
                        <Text style={[styles.vaccinationName, { fontSize: 14, fontWeight: '500', color: colors.textGray }]}>{visit.type}</Text>
                        <View style={styles.dateContainer}>
                          <MaterialIcons name="event" size={14} color={colors.textGray} />
                          <Text style={styles.dateText}>{date} at {time}</Text>
                          <View style={styles.completedBadge}>
                            <Text style={styles.completedText}>COMPLETED</Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => handleDeleteVisit(visit.id)}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                      >
                        <MaterialIcons name="close" size={20} color={colors.textLight} />
                      </TouchableOpacity>
                    </View>
                    
                    {visit.notes && (
                      <View style={styles.notesContainer}>
                        <Text style={styles.notesText}>{visit.notes}</Text>
                      </View>
                    )}
                  </View>
                );
              })
            )}
          </View>
        );
      
      case 'schedule':
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recommended Schedule</Text>
            
            {recommendedSchedule.map(item => (
              <View key={item.id} style={styles.vaccinationCard}>
                <View style={styles.vaccinationHeader}>
                  <View style={[styles.vaccinationIconContainer, { backgroundColor: '#5f819e' }]}>
                    <MaterialIcons name="event-note" size={14} color="#FFFFFF" />
                  </View>
                  <View style={styles.vaccinationHeaderContent}>
                    <Text style={styles.vaccinationName}>{item.name}</Text>
                    <View style={styles.dateContainer}>
                      <Text style={[styles.dateText, { fontWeight: '500' }]}>
                        {item.age}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.scheduleAddButton}
                    onPress={() => {
                      // Logic to add this vaccine to planned vaccinations
                      setShowVaccineModal(true);
                    }}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  >
                    <MaterialIcons name="add-circle-outline" size={22} color={colors.primary} />
                  </TouchableOpacity>
                </View>
                
                {item.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesText}>{item.notes}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* StatusBar configuration */}
      <StatusBar 
        backgroundColor="transparent"
        barStyle="light-content" 
        translucent={true}
      />
      
      {/* Custom Header - Updated to match Home screen */}
      <View style={[styles.headerContainer, { paddingTop: headerTopPadding }]}>
        <LinearGradient
          colors={['#7a3e3e', colors.primary]} // Darker shade of primary for gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          {/* Header content */}
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.headerTextContainer}>
              <Text style={styles.logoText}>Babysafe</Text>
            </View>
            
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="calendar-today" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* Welcome message */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Vaccinations
            </Text>
            <Text style={styles.welcomeSubtext}>
              Track your baby's health and vaccinations
            </Text>
          </View>
          
          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            {[
              { id: 'upcoming', icon: 'syringe', label: 'Upcoming', iconType: 'fontAwesome5' },
              { id: 'past', icon: 'check-circle', label: 'Completed', iconType: 'material' },
              { id: 'schedule', icon: 'event-note', label: 'Schedule', iconType: 'material' }
            ].map((tab) => {
              const isActive = tab.id === activeTab;
              let icon;
              
              switch(tab.iconType) {
                case 'fontAwesome5':
                  icon = <FontAwesome5 name={tab.icon} size={16} color={isActive ? colors.primary : '#FFFFFF'} />;
                  break;
                case 'material':
                  icon = <MaterialIcons name={tab.icon} size={16} color={isActive ? colors.primary : '#FFFFFF'} />;
                  break;
                default:
                  break;
              }
              
              return (
                <TouchableOpacity 
                  key={tab.id}
                  style={[styles.tab, isActive && styles.activeTab]}
                  onPress={() => setActiveTab(tab.id)}
                >
                  {icon}
                  <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Calendar - Show only in Upcoming and Past tabs */}
        {activeTab !== 'schedule' && (
          <View style={styles.calendarContainer}>
            <Calendar
              markedDates={markedDates}
              onDayPress={handleDayPress}
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
        )}
        
        {/* Render content based on active tab */}
        {renderTabContent()}
      </ScrollView>
      
      {/* Menu background overlay */}
      {isMenuOpen && (
        <Animated.View 
          style={[
            styles.menuBackground,
            { opacity: menuBackgroundOpacity }
          ]}
          pointerEvents={isMenuOpen ? "auto" : "none"}
          onTouchStart={toggleMenu}
        />
      )}
      
      {/* Floating action button with menu */}
      <View style={styles.fabContainer}>
        {/* Vaccination option */}
        <Animated.View 
          style={[
            styles.fabOption,
            { 
              transform: [
                { translateY: vaccinationTranslateY },
                { scale: addButtonAnimation }
              ] 
            }
          ]}
        >
          <TouchableOpacity 
            style={[styles.fabOptionButton, { backgroundColor: '#9e5f5f' }]}
            onPress={() => {
              toggleMenu();
              setShowVaccineModal(true);
            }}
            activeOpacity={0.8}
          >
            <FontAwesome5 name="syringe" size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.fabOptionLabel}>
            <Text style={styles.fabOptionText}>Vaccination</Text>
          </View>
        </Animated.View>
        
        {/* Visits option */}
        <Animated.View 
          style={[
            styles.fabOption,
            { 
              transform: [
                { translateY: visitsTranslateY },
                { scale: addButtonAnimation }
              ] 
            }
          ]}
        >
          <TouchableOpacity 
            style={[styles.fabOptionButton, { backgroundColor: '#5f819e' }]}
            onPress={() => {
              toggleMenu();
              setShowVisitsModal(true);
            }}
            activeOpacity={0.8}
          >
            <FontAwesome5 name="hospital" size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.fabOptionLabel}>
            <Text style={styles.fabOptionText}>Visit</Text>
          </View>
        </Animated.View>
        
        {/* Main FAB button */}
        <Animated.View 
          style={[
            styles.fab,
            {
              transform: [
                { scale: fabScale }
              ]
            }
          ]}
        >
          <TouchableOpacity
            style={styles.fabButton}
            onPress={toggleMenu}
            activeOpacity={0.8}
          >
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
              <MaterialIcons name="add" size={28} color="#FFFFFF" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      {/* Vaccination Modal */}
      <VaccineModal
        visible={showVaccineModal}
        onClose={() => setShowVaccineModal(false)}
        onSave={handleAddVaccination}
        selectedDate={selectedDateObj}
      />
      
      {/* Visits Modal - UPDATED TO INCLUDE onSave */}
      <VisitsModal
        visible={showVisitsModal}
        onClose={() => setShowVisitsModal(false)}
        onSave={handleAddVisit}
        selectedDate={selectedDateObj}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    paddingBottom: 90, // Extra padding for FAB
  },
  // Header styles - Updated to match HomeStyles
  headerContainer: {
    width: '100%',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerGradient: {
    width: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  logoText: {
    fontFamily: 'Shrikhand',
    fontSize: 24,
    color: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 15,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: 5,
  },
  activeTabText: {
    color: colors.primary,
  },
  iconButton: {
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Calendar styles
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
  // Vaccination list section styles
  sectionContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 12,
  },
  vaccinationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  pastVaccinationCard: {
    backgroundColor: '#F8F8F8',
  },
  vaccinationHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  vaccinationIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pastVaccinationIcon: {
    backgroundColor: colors.success,
  },
  vaccinationHeaderContent: {
    flex: 1,
  },
  vaccinationName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    color: colors.textGray,
    marginLeft: 4,
    marginRight: 8,
  },
  todayBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  todayText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  completedBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  scheduleAddButton: {
    padding: 8,
  },
  notesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
    paddingLeft: 64,
  },
  notesText: {
    fontSize: 13,
    color: colors.textGray,
    lineHeight: 18,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 8,
  },
  // Floating Action Button styles
  fabContainer: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    alignItems: 'center',
    zIndex: 999,
  },
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabButton: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  menuBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 998,
  },fabOption: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 4,
    zIndex: 1000,
  },
  fabOptionButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabOptionLabel: {
    position: 'absolute',
    right: 54,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: 'center',
  },
  fabOptionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Vaccination;