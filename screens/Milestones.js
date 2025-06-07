import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AdvancedDatePicker from '../components/AdvancedDatePicker';

// Clean Modern Styles
import styles from './styles/MilestonesStyles.js';

// Constants
import colors from '../constants/colors';

// Mock milestone data - in a real app, this would come from your database
const MILESTONE_DATA = {
  motor: {
    title: 'Motor',
    icon: 'directions-run',
    color: '#6366F1',
    milestones: [
      { id: 'm1', title: 'Holds head up', description: 'Can lift and hold head up when lying on tummy', ageRange: '0-3 months', difficulty: 'beginner' },
      { id: 'm2', title: 'Rolls over', description: 'Rolls from tummy to back or back to tummy', ageRange: '3-6 months', difficulty: 'beginner' },
      { id: 'm3', title: 'Sits without support', description: 'Can sit upright without help', ageRange: '4-7 months', difficulty: 'intermediate' },
      { id: 'm4', title: 'Crawls', description: 'Moves forward on hands and knees', ageRange: '6-10 months', difficulty: 'intermediate' },
      { id: 'm5', title: 'Pulls to stand', description: 'Uses furniture to pull themselves up to standing', ageRange: '8-12 months', difficulty: 'intermediate' },
      { id: 'm6', title: 'First steps', description: 'Takes first independent steps', ageRange: '9-15 months', difficulty: 'advanced' },
      { id: 'm7', title: 'Walks steadily', description: 'Walks without falling frequently', ageRange: '12-18 months', difficulty: 'advanced' },
    ]
  },
  language: {
    title: 'Language',
    icon: 'record-voice-over',
    color: '#10B981',
    milestones: [
      { id: 'l1', title: 'First smile', description: 'Social smile in response to interaction', ageRange: '6-12 weeks', difficulty: 'beginner' },
      { id: 'l2', title: 'Coos and gurgles', description: 'Makes happy vowel sounds', ageRange: '2-4 months', difficulty: 'beginner' },
      { id: 'l3', title: 'Babbles', description: 'Makes consonant sounds like "ba-ba" or "da-da"', ageRange: '4-7 months', difficulty: 'beginner' },
      { id: 'l4', title: 'Says "mama" or "dada"', description: 'Uses "mama" or "dada" with meaning', ageRange: '8-12 months', difficulty: 'intermediate' },
      { id: 'l5', title: 'First words', description: 'Says first clear words besides mama/dada', ageRange: '10-14 months', difficulty: 'intermediate' },
      { id: 'l6', title: 'Follows simple commands', description: 'Understands and follows simple instructions', ageRange: '10-16 months', difficulty: 'intermediate' },
      { id: 'l7', title: 'Says 10+ words', description: 'Has vocabulary of 10 or more words', ageRange: '12-18 months', difficulty: 'advanced' },
    ]
  },
  cognitive: {
    title: 'Cognitive',
    icon: 'psychology',
    color: '#F59E0B',
    milestones: [
      { id: 'c1', title: 'Recognizes familiar faces', description: 'Shows recognition of parents and caregivers', ageRange: '2-4 months', difficulty: 'beginner' },
      { id: 'c2', title: 'Shows stranger anxiety', description: 'Shows preference for familiar people', ageRange: '6-12 months', difficulty: 'beginner' },
      { id: 'c3', title: 'Plays peek-a-boo', description: 'Enjoys and participates in peek-a-boo games', ageRange: '6-10 months', difficulty: 'beginner' },
      { id: 'c4', title: 'Object permanence', description: 'Looks for hidden objects', ageRange: '8-12 months', difficulty: 'intermediate' },
      { id: 'c5', title: 'Imitates actions', description: 'Copies simple actions like clapping', ageRange: '9-15 months', difficulty: 'intermediate' },
      { id: 'c6', title: 'Points to objects', description: 'Points to show interest or make requests', ageRange: '10-16 months', difficulty: 'intermediate' },
      { id: 'c7', title: 'Pretend play', description: 'Engages in simple pretend play', ageRange: '12-18 months', difficulty: 'advanced' },
    ]
  },
  feeding: {
    title: 'Feeding',
    icon: 'restaurant',
    color: '#EF4444',
    milestones: [
      { id: 'f1', title: 'Breastfeeding/bottle feeding', description: 'Establishes good feeding routine', ageRange: '0-2 months', difficulty: 'beginner' },
      { id: 'f2', title: 'Shows hunger cues', description: 'Clearly signals when hungry or full', ageRange: '1-3 months', difficulty: 'beginner' },
      { id: 'f3', title: 'Ready for solids', description: 'Shows readiness for solid foods', ageRange: '4-6 months', difficulty: 'beginner' },
      { id: 'f4', title: 'Self-feeding with hands', description: 'Picks up and eats finger foods', ageRange: '6-9 months', difficulty: 'intermediate' },
      { id: 'f5', title: 'Uses sippy cup', description: 'Drinks from a sippy cup independently', ageRange: '6-12 months', difficulty: 'intermediate' },
      { id: 'f6', title: 'Uses spoon', description: 'Attempts to use spoon for self-feeding', ageRange: '10-15 months', difficulty: 'intermediate' },
      { id: 'f7', title: 'Eats variety of foods', description: 'Accepts different textures and flavors', ageRange: '12-18 months', difficulty: 'advanced' },
    ]
  }
};

export default function Milestones({ baby, journalEntries = {}, onMilestoneUpdate }) {
  // State
  const [activeCategory, setActiveCategory] = useState('motor');
  const [achievedMilestones, setAchievedMilestones] = useState({});
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [achievementDate, setAchievementDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [showAchievedOnly, setShowAchievedOnly] = useState(false);

  // Load achieved milestones on component mount
  useEffect(() => {
    loadAchievedMilestones();
  }, [baby, journalEntries]);

  // Load achieved milestones from journal entries and saved data
  const loadAchievedMilestones = async () => {
    setLoading(true);
    
    try {
      const achieved = {};
      
      // Extract milestones from journal entries
      Object.values(journalEntries).forEach(entry => {
        if (entry.milestones && entry.milestones.length > 0) {
          entry.milestones.forEach(milestone => {
            Object.values(MILESTONE_DATA).forEach(category => {
              const foundMilestone = category.milestones.find(m => 
                m.title.toLowerCase().includes(milestone.toLowerCase()) ||
                milestone.toLowerCase().includes(m.title.toLowerCase())
              );
              if (foundMilestone) {
                achieved[foundMilestone.id] = {
                  date: entry.date,
                  notes: entry.notes || '',
                  source: 'journal'
                };
              }
            });
          });
        }
      });

      // Add some mock achieved milestones for demonstration
      if (baby) {
        achieved['m1'] = { date: '2024-02-15', notes: 'Such a strong little one!', source: 'milestone' };
        achieved['l1'] = { date: '2024-02-20', notes: 'Melted my heart ❤️', source: 'milestone' };
        achieved['c1'] = { date: '2024-03-01', notes: 'Definitely knows mama and dada', source: 'milestone' };
        achieved['f1'] = { date: '2024-01-20', notes: 'Feeding well from day one', source: 'milestone' };
      }

      setAchievedMilestones(achieved);
    } catch (error) {
      console.error('Error loading achieved milestones:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle milestone achievement
  const handleAchieveMilestone = (milestone) => {
    setSelectedMilestone(milestone);
    setAchievementDate(new Date());
    setNotes('');
    setIsModalVisible(true);
  };

  // Handle un-achieving milestone
  const handleUnachieveMilestone = (milestoneId) => {
    Alert.alert(
      'Remove Achievement',
      'Are you sure you want to remove this milestone achievement?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updated = { ...achievedMilestones };
            delete updated[milestoneId];
            setAchievedMilestones(updated);
            
            if (onMilestoneUpdate) {
              onMilestoneUpdate(milestoneId, null);
            }
          }
        }
      ]
    );
  };

  // Save milestone achievement
  const saveMilestoneAchievement = () => {
    if (!selectedMilestone) return;

    const achievementData = {
      date: achievementDate.toISOString().split('T')[0],
      notes: notes.trim(),
      source: 'milestone'
    };

    const updated = {
      ...achievedMilestones,
      [selectedMilestone.id]: achievementData
    };

    setAchievedMilestones(updated);
    setIsModalVisible(false);
    setSelectedMilestone(null);

    if (onMilestoneUpdate) {
      onMilestoneUpdate(selectedMilestone.id, achievementData);
    }
  };

  // Handle date change - compatible with both onChange and onDateChange
  const handleDateChange = (date) => {
    setAchievementDate(date);
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return colors.textLight;
    }
  };

  // Filter milestones based on current filters
  const getFilteredMilestones = (categoryMilestones) => {
    let filtered = [...categoryMilestones];

    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(m => m.difficulty === filterDifficulty);
    }

    if (showAchievedOnly) {
      filtered = filtered.filter(m => achievedMilestones[m.id]);
    }

    return filtered;
  };

  // Render clean header with category selector (title removed)
  const renderHeader = () => {
    const currentCategory = MILESTONE_DATA[activeCategory];
    const achievedCount = currentCategory.milestones.filter(m => achievedMilestones[m.id]).length;
    
    return (
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.filterToggle}
              onPress={() => setShowFilters(!showFilters)}
            >
              <MaterialIcons 
                name={showFilters ? "tune" : "tune"} 
                size={20} 
                color={colors.primary} 
              />
            </TouchableOpacity>
          </View>
          
          {/* Category Pills */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryPills}
            contentContainerStyle={styles.categoryPillsContent}
          >
            {Object.entries(MILESTONE_DATA).map(([key, category]) => {
              const isActive = activeCategory === key;
              const count = category.milestones.filter(m => achievedMilestones[m.id]).length;
              
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.categoryPill,
                    isActive && [styles.activeCategoryPill, { backgroundColor: category.color }]
                  ]}
                  onPress={() => setActiveCategory(key)}
                >
                  <MaterialIcons 
                    name={category.icon} 
                    size={16} 
                    color={isActive ? '#FFFFFF' : category.color} 
                  />
                  <Text style={[
                    styles.categoryPillText,
                    isActive && styles.activeCategoryPillText
                  ]}>
                    {category.title}
                  </Text>
                  {count > 0 && (
                    <View style={[
                      styles.categoryBadge,
                      isActive && styles.activeCategoryBadge
                    ]}>
                      <Text style={[
                        styles.categoryBadgeText,
                        isActive && styles.activeCategoryBadgeText
                      ]}>
                        {count}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${(achievedCount / currentCategory.milestones.length) * 100}%`,
                  backgroundColor: currentCategory.color 
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {achievedCount} of {currentCategory.milestones.length} completed
          </Text>
        </View>

        {/* Filters */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterRow}>
                {['all', 'beginner', 'intermediate', 'advanced'].map((difficulty) => (
                  <TouchableOpacity
                    key={difficulty}
                    style={[
                      styles.filterChip,
                      filterDifficulty === difficulty && styles.activeFilterChip
                    ]}
                    onPress={() => setFilterDifficulty(difficulty)}
                  >
                    <Text style={[
                      styles.filterChipText,
                      filterDifficulty === difficulty && styles.activeFilterChipText
                    ]}>
                      {difficulty === 'all' ? 'All' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
                
                <TouchableOpacity
                  style={[
                    styles.filterChip,
                    showAchievedOnly && styles.activeFilterChip
                  ]}
                  onPress={() => setShowAchievedOnly(!showAchievedOnly)}
                >
                  <MaterialIcons 
                    name="check" 
                    size={14} 
                    color={showAchievedOnly ? '#FFFFFF' : colors.primary}
                    style={styles.filterChipIcon}
                  />
                  <Text style={[
                    styles.filterChipText,
                    showAchievedOnly && styles.activeFilterChipText
                  ]}>
                    Achieved
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  // Render milestone item with clean design
  const renderMilestoneItem = (milestone) => {
    const isAchieved = achievedMilestones[milestone.id];
    const category = MILESTONE_DATA[activeCategory];
    
    return (
      <TouchableOpacity
        key={milestone.id}
        style={[
          styles.milestoneCard,
          isAchieved && styles.achievedMilestoneCard
        ]}
        onPress={() => {
          if (isAchieved) {
            handleUnachieveMilestone(milestone.id);
          } else {
            handleAchieveMilestone(milestone);
          }
        }}
      >
        <View style={styles.milestoneHeader}>
          <View style={styles.milestoneCheck}>
            <View style={[
              styles.checkCircle,
              isAchieved && [styles.checkedCircle, { backgroundColor: category.color }]
            ]}>
              {isAchieved && (
                <MaterialIcons name="check" size={14} color="#FFFFFF" />
              )}
            </View>
          </View>
          
          <View style={styles.milestoneContent}>
            <View style={styles.milestoneTop}>
              <Text style={[
                styles.milestoneTitle,
                isAchieved && styles.achievedMilestoneTitle
              ]}>
                {milestone.title}
              </Text>
              <View style={styles.milestoneMeta}>
                <Text style={styles.ageText}>{milestone.ageRange}</Text>
                <View style={[
                  styles.difficultyDot,
                  { backgroundColor: getDifficultyColor(milestone.difficulty) }
                ]} />
              </View>
            </View>
            
            <Text style={styles.milestoneDescription}>
              {milestone.description}
            </Text>
            
            {isAchieved && (
              <View style={styles.achievementBadge}>
                <MaterialIcons name="celebration" size={12} color={category.color} />
                <Text style={[styles.achievementText, { color: category.color }]}>
                  Achieved {new Date(isAchieved.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        {isAchieved && isAchieved.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.notesText}>"{isAchieved.notes}"</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Render achievement modal
  const renderAchievementModal = () => {
    return (
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>🎉 Milestone Achieved!</Text>
            
            <TouchableOpacity onPress={saveMilestoneAchievement}>
              <Text style={styles.modalSave}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {selectedMilestone && (
              <>
                <View style={styles.modalMilestone}>
                  <Text style={styles.modalMilestoneTitle}>
                    {selectedMilestone.title}
                  </Text>
                  <Text style={styles.modalMilestoneDesc}>
                    {selectedMilestone.description}
                  </Text>
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Achievement Date</Text>
                  <AdvancedDatePicker
                    selectedDate={achievementDate}
                    onChange={handleDateChange}
                    onDateChange={handleDateChange}
                    maximumDate={new Date()}
                    style={styles.datePicker}
                  />
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.modalLabel}>Notes (Optional)</Text>
                  <TextInput
                    style={styles.modalTextInput}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Add a special note about this moment..."
                    multiline={true}
                    maxLength={200}
                    placeholderTextColor={colors.textLight}
                  />
                  <Text style={styles.charCount}>{notes.length}/200</Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading milestones...</Text>
      </View>
    );
  }

  const currentCategory = MILESTONE_DATA[activeCategory];
  const filteredMilestones = getFilteredMilestones(currentCategory.milestones);

  return (
    <View style={styles.container}>
      {renderHeader()}

      <ScrollView 
        style={styles.milestonesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.milestonesContent}
      >
        {filteredMilestones.length > 0 ? (
          filteredMilestones.map(renderMilestoneItem)
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={48} color={colors.textLight} />
            <Text style={styles.emptyText}>No milestones match your filters</Text>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => {
                setFilterDifficulty('all');
                setShowAchievedOnly(false);
              }}
            >
              <Text style={styles.clearButtonText}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {renderAchievementModal()}
    </View>
  );
}