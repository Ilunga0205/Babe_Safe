// components/Growth/Milestones.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { 
  MILESTONE_DATA, 
  calculateBabyAgeInMonths, 
  getAgeRangeKey, 
  getMilestonesForAge,
  formatBabyAge 
} from '../../constants/milestones';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

const Milestones = ({ baby, completedMilestones = [], onMarkMilestone }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [babyAge, setBabyAge] = useState(0);
  const [currentMilestones, setCurrentMilestones] = useState(null);
  
  useEffect(() => {
    if (baby?.birthDate) {
      const ageInMonths = calculateBabyAgeInMonths(baby.birthDate);
      setBabyAge(ageInMonths);
      setCurrentMilestones(getMilestonesForAge(ageInMonths));
    }
  }, [baby]);

  const categories = [
    { key: 'all', label: 'All', icon: 'view-list' },
    { key: 'physical', label: 'Physical', icon: 'fitness-center' },
    { key: 'cognitive', label: 'Cognitive', icon: 'psychology' },
    { key: 'social', label: 'Social', icon: 'people' },
    { key: 'communication', label: 'Speech', icon: 'chat' }
  ];

  const handleMarkMilestone = (milestone, category) => {
    const milestoneId = `${category.toLowerCase()}_${milestone.replace(/\s+/g, '_').toLowerCase()}`;
    onMarkMilestone?.(milestoneId, milestone, category);
  };

  const isMilestoneCompleted = (milestone, category) => {
    const milestoneId = `${category.toLowerCase()}_${milestone.replace(/\s+/g, '_').toLowerCase()}`;
    return completedMilestones.includes(milestoneId);
  };

  const renderMilestoneItem = (milestone, category) => {
    const isCompleted = isMilestoneCompleted(milestone, category);
    
    return (
      <TouchableOpacity
        key={`${category}_${milestone}`}
        style={[styles.milestoneItem, isCompleted && styles.completedMilestone]}
        onPress={() => handleMarkMilestone(milestone, category)}
      >
        <View style={styles.milestoneContent}>
          <View style={[styles.checkbox, isCompleted && styles.checkedBox]}>
            {isCompleted && (
              <MaterialIcons name="check" size={16} color="#FFFFFF" />
            )}
          </View>
          
          <View style={styles.milestoneText}>
            <Text style={[styles.milestoneTitle, isCompleted && styles.completedText]}>
              {milestone}
            </Text>
            <Text style={styles.milestoneCategory}>{category}</Text>
          </View>
        </View>
        
        {isCompleted && (
          <View style={styles.completedBadge}>
            <MaterialIcons name="emoji-events" size={16} color={colors.success} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderMilestoneSection = (title, milestones, category) => {
    if (selectedCategory !== 'all' && selectedCategory !== category.toLowerCase()) {
      return null;
    }

    if (!milestones || milestones.length === 0) {
      return null;
    }

    return (
      <View style={styles.milestoneSection} key={category}>
        <View style={styles.sectionHeader}>
          <MaterialIcons 
            name={getCategoryIcon(category)} 
            size={20} 
            color={colors.primary} 
          />
          <Text style={styles.sectionTitle}>{title}</Text>
          <View style={styles.progressBadge}>
            <Text style={styles.progressText}>
              {milestones.filter(m => isMilestoneCompleted(m, category)).length}/{milestones.length}
            </Text>
          </View>
        </View>
        
        {milestones.map(milestone => renderMilestoneItem(milestone, category))}
      </View>
    );
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'physical': return 'fitness-center';
      case 'cognitive': return 'psychology';
      case 'social': return 'people';
      case 'communication': return 'chat';
      default: return 'star';
    }
  };

  const getCompletionStats = () => {
    if (!currentMilestones) return { completed: 0, total: 0 };
    
    const allMilestones = [
      ...currentMilestones.physical.map(m => ({ text: m, category: 'Physical' })),
      ...currentMilestones.cognitive.map(m => ({ text: m, category: 'Cognitive' })),
      ...currentMilestones.social.map(m => ({ text: m, category: 'Social' })),
      ...currentMilestones.communication.map(m => ({ text: m, category: 'Communication' }))
    ];
    
    const completed = allMilestones.filter(m => 
      isMilestoneCompleted(m.text, m.category)
    ).length;
    
    return { completed, total: allMilestones.length };
  };

  if (!baby) {
    return (
      <View style={styles.noBabyContainer}>
        <MaterialIcons name="child-care" size={64} color={colors.textGray} />
        <Text style={styles.noBabyText}>Select a baby to track milestones</Text>
      </View>
    );
  }

  if (!currentMilestones) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialIcons name="hourglass-empty" size={64} color={colors.textGray} />
        <Text style={styles.loadingText}>Loading milestones...</Text>
      </View>
    );
  }

  const stats = getCompletionStats();

  return (
    <View style={styles.container}>
      {/* Header with baby info and progress */}
      <View style={styles.header}>
        <View style={styles.babyInfo}>
          <Text style={styles.babyName}>{baby.name}</Text>
          <Text style={styles.babyAge}>{formatBabyAge(babyAge)} old</Text>
          <Text style={styles.ageRange}>{currentMilestones.label} Milestones</Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressPercentage}>
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </Text>
          </View>
          <Text style={styles.progressLabel}>
            {stats.completed} of {stats.total} completed
          </Text>
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScrollView}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryButton,
              selectedCategory === category.key && styles.activeCategoryButton
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <MaterialIcons 
              name={category.icon} 
              size={18} 
              color={selectedCategory === category.key ? '#FFFFFF' : colors.primary} 
            />
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category.key && styles.activeCategoryButtonText
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Milestones List */}
      <ScrollView 
        style={styles.milestonesContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderMilestoneSection('Physical Development', currentMilestones.physical, 'Physical')}
        {renderMilestoneSection('Cognitive Development', currentMilestones.cognitive, 'Cognitive')}
        {renderMilestoneSection('Social & Emotional', currentMilestones.social, 'Social')}
        {renderMilestoneSection('Communication', currentMilestones.communication, 'Communication')}
        
        {/* Progress Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Keep it up! 🎉</Text>
          <Text style={styles.summaryText}>
            Every baby develops at their own pace. These milestones are general guidelines. 
            If you have concerns, consult with your pediatrician.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  babyInfo: {
    flex: 1,
  },
  babyName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  babyAge: {
    fontSize: 16,
    color: colors.textGray,
    marginBottom: 2,
  },
  ageRange: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textGray,
    textAlign: 'center',
  },
  categoryScrollView: {
    maxHeight: 60,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  activeCategoryButtonText: {
    color: '#FFFFFF',
  },
  milestonesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  milestoneSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 10,
    flex: 1,
  },
  progressBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  completedMilestone: {
    backgroundColor: '#F8F9FA',
    borderColor: colors.success,
  },
  milestoneContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: colors.primary,
  },
  milestoneText: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textGray,
  },
  milestoneCategory: {
    fontSize: 12,
    color: colors.textGray,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  completedBadge: {
    marginLeft: 10,
  },
  summaryContainer: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
    marginBottom: 40,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  noBabyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noBabyText: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Milestones;