import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Styles
import styles from './styles/GrowthStyles';

// Constants
import colors from '../constants/colors';

// Components
import BabyTimeline from '../components/Growth/BabyTimeline';
import AddEntryModal from '../components/Growth/AddEntryModal';
import Milestones from './Milestones';
import DailyRoutine from './DailyRoutine'; 

export default function Growth({ route, navigation }) {
  const { baby } = route.params || { baby: null };
  const insets = useSafeAreaInsets();
  
  // State
  const [activeTab, setActiveTab] = useState('journal'); // 'chart', 'journal', 'milestones', 'routine'
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [journalEntries, setJournalEntries] = useState({}); // Object with date keys
  const [routineData, setRoutineData] = useState({}); // New state for routine data
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isAddEntryVisible, setIsAddEntryVisible] = useState(false);
  
  // Handle navigation back to Home screen with 'babies' tab selected
  const handleGoBack = () => {
    // Navigate back to Home and pass a parameter to indicate that the 'babies' tab should be selected
    navigation.navigate('Home', { initialTab: 'babies' });
  };

  // Mocked data - in a real app, fetch from your database
  useEffect(() => {
    if (baby) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        // Generate some mock journal entries for demonstration
        const mockEntries = {};
        const mockRoutineData = {};
        const today = new Date();
        
        // Create entries for random days in current month
        for (let i = 1; i <= 10; i++) {
          const day = Math.floor(Math.random() * 28) + 1;
          const date = new Date(today.getFullYear(), today.getMonth(), day);
          const dateStr = date.toISOString().split('T')[0];
          
          mockEntries[dateStr] = {
            date: dateStr,
            entryTypes: getRandomEntryTypes(),
            growthData: Math.random() > 0.5 ? {
              weight: 5 + Math.random() * 5, // 5-10kg
              height: 50 + Math.random() * 30, // 50-80cm
              headCircumference: 35 + Math.random() * 10 // 35-45cm
            } : null,
            milestones: Math.random() > 0.7 ? ['First smile', 'Rolled over', 'Holds head up'] : [],
            mediaItems: [],
            notes: Math.random() > 0.5 ? 'Baby was very active today!' : '',
            mood: ['happy', 'sleepy', 'fussy'][Math.floor(Math.random() * 3)]
          };

          // Generate mock routine data
          mockRoutineData[dateStr] = generateMockRoutineData(dateStr);
        }
        
        setJournalEntries(mockEntries);
        setRoutineData(mockRoutineData);
        setLoading(false);
      }, 1000);
    }
  }, [baby]);

  // Generate mock routine data for demonstration
  const generateMockRoutineData = (dateStr) => {
    const feedingTimes = [];
    const sleepSessions = [];
    const diaperChanges = [];
    
    // Generate 6-8 feeding sessions throughout the day
    for (let i = 0; i < 7; i++) {
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      feedingTimes.push({
        id: `feed_${dateStr}_${i}`,
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        type: Math.random() > 0.5 ? 'breast' : 'bottle',
        duration: Math.floor(Math.random() * 30) + 10, // 10-40 minutes
        amount: Math.random() > 0.5 ? Math.floor(Math.random() * 150) + 50 : null, // 50-200ml for bottle
        notes: Math.random() > 0.7 ? 'Good feeding session' : ''
      });
    }

    // Generate 3-5 sleep sessions
    for (let i = 0; i < 4; i++) {
      const startHour = Math.floor(Math.random() * 24);
      const startMinute = Math.floor(Math.random() * 60);
      const duration = Math.floor(Math.random() * 180) + 30; // 30-210 minutes
      sleepSessions.push({
        id: `sleep_${dateStr}_${i}`,
        startTime: `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`,
        duration: duration,
        quality: ['excellent', 'good', 'fair', 'poor'][Math.floor(Math.random() * 4)],
        location: Math.random() > 0.5 ? 'crib' : 'bassinet',
        notes: Math.random() > 0.8 ? 'Slept peacefully' : ''
      });
    }

    // Generate 8-12 diaper changes
    for (let i = 0; i < 10; i++) {
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      const hasWet = Math.random() > 0.2; // 80% chance of wet
      const hasSoiled = Math.random() > 0.6; // 40% chance of soiled
      
      diaperChanges.push({
        id: `diaper_${dateStr}_${i}`,
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        type: hasWet && hasSoiled ? 'both' : hasWet ? 'wet' : 'soiled',
        consistency: hasSoiled ? ['soft', 'firm', 'loose', 'hard'][Math.floor(Math.random() * 4)] : null,
        color: hasSoiled ? ['yellow', 'brown', 'green'][Math.floor(Math.random() * 3)] : null,
        notes: Math.random() > 0.9 ? 'Unusual color/consistency' : ''
      });
    }

    return {
      date: dateStr,
      feeding: feedingTimes.sort((a, b) => a.time.localeCompare(b.time)),
      sleep: sleepSessions.sort((a, b) => a.startTime.localeCompare(b.startTime)),
      diapers: diaperChanges.sort((a, b) => a.time.localeCompare(b.time))
    };
  };

  // Helper to generate random entry types for mock data
  const getRandomEntryTypes = () => {
    const allTypes = ['growth', 'photo', 'milestone', 'audio', 'note'];
    const typesCount = Math.floor(Math.random() * 3) + 1; // 1-3 types
    const selectedTypes = [];
    
    for (let i = 0; i < typesCount; i++) {
      const randomType = allTypes[Math.floor(Math.random() * allTypes.length)];
      if (!selectedTypes.includes(randomType)) {
        selectedTypes.push(randomType);
      }
    }
    
    return selectedTypes;
  };

  // Handle month navigation
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  // Handle day selection
  const handleDayPress = (day) => {
    setSelectedDay(day);
    setIsAddEntryVisible(true);
  };

  // Save new journal entry
  const handleSaveEntry = (entry) => {
    if (!selectedDay) return;
    
    const updatedEntries = { ...journalEntries };
    updatedEntries[selectedDay.dateStr] = {
      ...entry,
      date: selectedDay.dateStr
    };
    
    setJournalEntries(updatedEntries);
    setIsAddEntryVisible(false);
    setSelectedDay(null);
  };

  // Handle routine data updates
  const handleRoutineUpdate = (dateStr, updatedData) => {
    const updatedRoutineData = { ...routineData };
    updatedRoutineData[dateStr] = updatedData;
    setRoutineData(updatedRoutineData);
  };

  // Handle milestone updates from Milestones component
  const handleMilestoneUpdate = (milestoneId, achievementData) => {
    if (!achievementData) return; // Milestone was removed
    
    // Add milestone to journal entry for the achievement date
    const dateStr = achievementData.date;
    const updatedEntries = { ...journalEntries };
    
    if (!updatedEntries[dateStr]) {
      updatedEntries[dateStr] = {
        date: dateStr,
        entryTypes: ['milestone'],
        growthData: null,
        milestones: [],
        mediaItems: [],
        notes: achievementData.notes || '',
        mood: 'happy'
      };
    }
    
    // Add milestone to the entry if not already present
    const milestoneTitle = getMilestoneTitleById(milestoneId);
    if (milestoneTitle && !updatedEntries[dateStr].milestones.includes(milestoneTitle)) {
      updatedEntries[dateStr].milestones.push(milestoneTitle);
      
      // Add milestone to entry types if not present
      if (!updatedEntries[dateStr].entryTypes.includes('milestone')) {
        updatedEntries[dateStr].entryTypes.push('milestone');
      }
      
      // Update notes with milestone achievement note
      if (achievementData.notes) {
        const existingNotes = updatedEntries[dateStr].notes || '';
        const milestoneNote = `${milestoneTitle}: ${achievementData.notes}`;
        updatedEntries[dateStr].notes = existingNotes 
          ? `${existingNotes}\n${milestoneNote}`
          : milestoneNote;
      }
    }
    
    setJournalEntries(updatedEntries);
  };

  // Helper function to get milestone title by ID (you would implement this based on your milestone data structure)
  const getMilestoneTitleById = (milestoneId) => {
    // This is a simplified mapping - in a real app, you'd have a proper data structure
    const milestoneMap = {
      'm1': 'Holds head up',
      'm2': 'Rolls over',
      'm3': 'Sits without support',
      'm4': 'Crawls',
      'm5': 'Pulls to stand',
      'm6': 'First steps',
      'm7': 'Walks steadily',
      'l1': 'First smile',
      'l2': 'Coos and gurgles',
      'l3': 'Babbles',
      'l4': 'Says "mama" or "dada"',
      'l5': 'First words',
      'l6': 'Follows simple commands',
      'l7': 'Says 10+ words',
      'c1': 'Recognizes familiar faces',
      'c2': 'Shows stranger anxiety',
      'c3': 'Plays peek-a-boo',
      'c4': 'Object permanence',
      'c5': 'Imitates actions',
      'c6': 'Points to objects',
      'c7': 'Pretend play',
      'f1': 'Breastfeeding/bottle feeding',
      'f2': 'Shows hunger cues',
      'f3': 'Ready for solids',
      'f4': 'Self-feeding with hands',
      'f5': 'Uses sippy cup',
      'f6': 'Uses spoon',
      'f7': 'Eats variety of foods',
    };
    
    return milestoneMap[milestoneId] || 'Unknown milestone';
  };

  // Render month name and navigation
  const renderMonthHeader = () => {
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    return (
      <View style={styles.monthHeader}>
        <TouchableOpacity onPress={() => navigateMonth(-1)} style={styles.monthNavButton}>
          <MaterialIcons name="chevron-left" size={28} color={colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.monthTitle}>{monthName}</Text>
        
        <TouchableOpacity onPress={() => navigateMonth(1)} style={styles.monthNavButton}>
          <MaterialIcons name="chevron-right" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
    );
  };

  // Calculate header padding based on platform and insets
  const headerTopPadding = Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 24;

  // Header with baby info - Updated to match Home screen style
  return (
    <View style={styles.container}>
      {/* StatusBar configuration - Matched with Home screen */}
      <StatusBar 
        backgroundColor="transparent"
        barStyle="light-content" 
        translucent={true}
      />
      
      {/* Header area - Updated to match Home screen */}
      <View style={[styles.headerContainer, { paddingTop: headerTopPadding }]}>
        <LinearGradient
          colors={['#7a3e3e', colors.primary]} // Darker shade of primary for gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          {/* Header content */}
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <Text style={styles.logoText}>Babysafe</Text>
            
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="calendar-today" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Baby info section - Updated */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Growth Tracking
            </Text>
            <Text style={styles.welcomeSubtext}>
              {baby?.name ? `Tracking ${baby.name}'s development` : 'Track your baby\'s development journey'}
            </Text>
          </View>
          
          {/* Tab Navigation - Updated with routine tab */}
          <View style={styles.tabContainer}>
  {['chart', 'journal', 'milestones', 'routine'].map((tab) => {
    const isActive = activeTab === tab;
    let icon;
    let label;
    
    switch(tab) {
      case 'chart':
        icon = <MaterialIcons name="bar-chart" size={14} color={isActive ? colors.primary : '#FFFFFF'} />;
        label = "Charts"; // Shortened from "Growth Charts"
        break;
      case 'journal':
        icon = <MaterialIcons name="calendar-today" size={14} color={isActive ? colors.primary : '#FFFFFF'} />;
        label = "Journal"; // Shortened from "BabyDays"
        break;
      case 'milestones':
        icon = <MaterialIcons name="emoji-events" size={14} color={isActive ? colors.primary : '#FFFFFF'} />;
        label = "Milestones";
        break;
      case 'routine':
        icon = <MaterialIcons name="schedule" size={14} color={isActive ? colors.primary : '#FFFFFF'} />;
        label = "Routine"; // Shortened from "Daily Routine"
        break;
      default:
        break;
    }
    
    return (
      <TouchableOpacity 
        key={tab}
        style={[styles.tab, isActive && styles.activeTab]}
        onPress={() => setActiveTab(tab)}
      >
        {icon}
        <Text 
          style={[styles.tabText, isActive && styles.activeTabText]}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>
        </LinearGradient>
      </View>
      
      <View style={styles.content}>
        {activeTab === 'journal' && (
          <>
            {renderMonthHeader()}
            
            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            ) : (
              <BabyTimeline
                month={currentMonth}
                journalEntries={journalEntries}
                onDayPress={handleDayPress}
                onAddEntry={handleDayPress}
                colors={colors}
              />
            )}
          </>
        )}
        
        {activeTab === 'chart' && (
          <ScrollView style={styles.tabContent} contentContainerStyle={styles.tabContentContainer}>
            <View style={styles.chartContainer}>
              <Text style={styles.sectionTitle}>Growth Charts</Text>
              <Text style={styles.comingSoonText}>WHO-standard growth charts coming soon!</Text>
              
              <Image 
                source={require('../assets/picture1.png')} 
                style={styles.chartPlaceholder}
                resizeMode="contain"
              />
            </View>
          </ScrollView>
        )}
        
        {activeTab === 'milestones' && (
          <Milestones
            baby={baby}
            journalEntries={journalEntries}
            onMilestoneUpdate={handleMilestoneUpdate}
          />
        )}

        {activeTab === 'routine' && (
          <DailyRoutine
            baby={baby}
            routineData={routineData}
            onRoutineUpdate={handleRoutineUpdate}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />
        )}
      </View>
      
      {/* Modal for adding/editing entries */}
      <AddEntryModal 
        visible={isAddEntryVisible}
        day={selectedDay}
        onClose={() => {
          setIsAddEntryVisible(false);
          setSelectedDay(null);
        }}
        onSave={handleSaveEntry}
        existingEntry={selectedDay?.entry}
      />
    </View>
  );
}