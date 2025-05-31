import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Dimensions,
  Platform,
  Alert
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles/TipsStyles';
import colors from '../constants/colors'



// Mock data for tip categories - now with unlockable status
const tipCategories = [
  { id: '1', name: 'Newborn', icon: 'baby', ageRange: '0-3 months', locked: false },
  { id: '2', name: 'Infant', icon: 'baby-carriage', ageRange: '3-12 months', locked: false },
  { id: '3', name: 'Toddler', icon: 'child', ageRange: '1-3 years', locked: true },
  { id: '4', name: 'General', icon: 'heart', ageRange: 'All ages', locked: false },
];

// Mock data for featured tips
const featuredTips = [
  {
    id: '1',
    title: 'Sleep Training Methods',
    description: 'Expert-recommended techniques to help your baby sleep through the night.',
    type: 'video',
    thumbnail: require('../assets/picture1.png'),
    babyAge: '3-12 months',
    expert: 'Dr. Sarah Johnson, Pediatrician',
    duration: '5:23'
  },
  {
    id: '2',
    title: 'First Foods Guide',
    description: 'Introduction to solid foods for your baby with safe options and meal ideas.',
    type: 'document',
    thumbnail: require('../assets/picture1.png'),
    babyAge: '4-8 months',
    expert: 'Dr. Michael Chen, Nutritionist',
    pages: '12'
  },
  {
    id: '3',
    title: 'Tummy Time Exercises',
    description: 'Essential exercises to strengthen your baby\'s neck and shoulder muscles.',
    type: 'video',
    thumbnail: require('../assets/picture1.png'),
    babyAge: '0-6 months',
    expert: 'Emma Williams, Pediatric Physical Therapist',
    duration: '4:10'
  },
];

// Mock data for recent tips
const recentTips = [
  {
    id: '6',
    title: 'Rash Identification Guide',
    description: 'How to identify common baby skin conditions and when to see a doctor.',
    type: 'images',
    thumbnail: require('../assets/picture1.png'),
    babyAge: 'All ages',
    expert: 'Dr. Lisa Peterson, Dermatologist',
    count: '8 images'
  },
  {
    id: '7',
    title: 'Baby Safety at Home',
    description: 'Essential tips for baby-proofing your home and preventing accidents.',
    type: 'document',
    thumbnail: require('../assets/picture1.png'),
    babyAge: '6-24 months',
    expert: 'Child Safety Association',
    pages: '10'
  },
  {
    id: '8',
    title: 'Signs of Ear Infection',
    description: 'How to recognize ear infection symptoms in infants and toddlers.',
    type: 'video',
    thumbnail: require('../assets/picture1.png'),
    babyAge: 'All ages',
    expert: 'Dr. James Miller, ENT Specialist',
    duration: '3:45'
  },
];

// Mock data for baby information
const babyInfo = {
  name: "Emma",
  age: "6 months",
  ageGroup: "Infant" // This would be calculated based on actual age
};

const { width } = Dimensions.get('window');

const Tips = ({ navigation }) => {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState('Infant'); // Default to infant based on mock baby age
  const [categories, setCategories] = useState(tipCategories);
  
  // Animated values for header
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [90, 60],
    extrapolate: 'clamp'
  });
  
  // Header opacity animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [1, 0.95],
    extrapolate: 'clamp'
  });

  // Handle tip item press
  const handleTipPress = (tip) => {
    navigation.navigate('TipDetail', { tip });
  };

  // Navigate to community forum
  const navigateToCommunity = () => {
    navigation.navigate('Community');
  };

  // Handle category lock/unlock
  const toggleCategoryLock = (categoryId) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === categoryId 
        ? { ...category, locked: !category.locked } 
        : category
      )
    );
  };

  // Handle category press - either select or show lock options
  const handleCategoryPress = (category) => {
    if (category.locked) {
      // Show unlock options dialog
      Alert.alert(
        "Category Locked",
        `"${category.name}" content is designed for babies ${category.ageRange}.`,
        [
          {
            text: "Keep Locked",
            style: "cancel"
          },
          { 
            text: "Unlock Now", 
            onPress: () => {
              toggleCategoryLock(category.id);
              setSelectedCategory(category.name);
            }
          }
        ]
      );
    } else {
      setSelectedCategory(category.name);
    }
  };

  // Handle long press on category for lock/unlock
  const handleCategoryLongPress = (category) => {
    if (!category.locked) {
      Alert.alert(
        "Lock Category?",
        `Do you want to lock "${category.name}" content?`,
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Lock", 
            onPress: () => toggleCategoryLock(category.id)
          }
        ]
      );
    } else {
      // If already locked, use the normal press handler for unlock options
      handleCategoryPress(category);
    }
  };

  // Render tip category item with lock status
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategoryItem
      ]}
      onPress={() => handleCategoryPress(item)}
      onLongPress={() => handleCategoryLongPress(item)}
      delayLongPress={500}
    >
      <View style={[
        styles.categoryIconContainer,
        selectedCategory === item.name ? 
          { backgroundColor: 'rgba(255, 255, 255, 0.25)' } : 
          { backgroundColor: 'rgba(98, 49, 49, 0.08)' }
      ]}>
        <FontAwesome5
          name={item.icon}
          size={18}
          color={selectedCategory === item.name ? colors.white : colors.primary}
        />
        {item.locked && (
          <View style={styles.lockIconContainer}>
            <FontAwesome5 name="lock" size={9} color="#FFFFFF" />
          </View>
        )}
      </View>
      <Text style={[
        styles.categoryText,
        selectedCategory === item.name && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
      <Text style={[
        styles.categoryAgeRange,
        selectedCategory === item.name && styles.selectedCategoryAgeRange
      ]}>
        {item.ageRange}
      </Text>
    </TouchableOpacity>
  );

  // Render featured tip item
  const renderTipItem = ({ item }) => (
    <TouchableOpacity
      style={styles.tipCard}
      onPress={() => handleTipPress(item)}
    >
      <Image source={item.thumbnail} style={styles.tipImage} />
      
      {/* Content type badge */}
      <View style={styles.tipTypeBadge}>
        {item.type === 'video' && (
          <>
            <FontAwesome5 name="play" size={10} color="#FFFFFF" />
            <Text style={styles.tipTypeBadgeText}>{item.duration}</Text>
          </>
        )}
        {item.type === 'document' && (
          <>
            <MaterialIcons name="description" size={10} color="#FFFFFF" />
            <Text style={styles.tipTypeBadgeText}>{item.pages} pages</Text>
          </>
        )}
        {item.type === 'images' && (
          <>
            <MaterialIcons name="photo-library" size={10} color="#FFFFFF" />
            <Text style={styles.tipTypeBadgeText}>{item.count}</Text>
          </>
        )}
      </View>
      
      {/* Age range badge */}
      <View style={styles.ageBadge}>
        <Text style={styles.ageBadgeText}>{item.babyAge}</Text>
      </View>
      
      <View style={styles.tipContent}>
        <Text style={styles.tipTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
        <Text style={styles.tipDescription} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
        
        <View style={styles.expertContainer}>
          <FontAwesome5 name="user-md" size={12} color={colors.textLight} />
          <Text style={styles.expertText} numberOfLines={1} ellipsizeMode="tail">{item.expert}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render recent tip item (horizontal list)
  const renderRecentTipItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recentTipCard}
      onPress={() => handleTipPress(item)}
    >
      <Image source={item.thumbnail} style={styles.recentTipImage} />
      
      <View style={styles.recentTipTypeBadge}>
        {item.type === 'video' && <FontAwesome5 name="play" size={10} color="#FFFFFF" />}
        {item.type === 'document' && <MaterialIcons name="description" size={10} color="#FFFFFF" />}
        {item.type === 'images' && <MaterialIcons name="photo-library" size={10} color="#FFFFFF" />}
      </View>
      
      <View style={styles.recentTipContent}>
        <Text style={styles.recentTipTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
        <View style={styles.recentExpertContainer}>
          <FontAwesome5 name="user-md" size={10} color={colors.textLight} />
          <Text style={styles.recentExpertText} numberOfLines={1} ellipsizeMode="tail">{item.expert}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      
      {/* Animated Header */}
      <Animated.View style={[
        styles.header, 
        { 
          height: headerHeight,
          opacity: headerOpacity
        }
      ]}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTitleContainer}>
              <MaterialIcons name="lightbulb" size={22} color="#FFFFFF" />
              <Text style={styles.headerTitle}>Expert Tips</Text>
              <View style={styles.babyInfoContainer}>
                <Text style={styles.babyInfoText}>
                  for {babyInfo.name}, {babyInfo.age}
                </Text>
              </View>
            </View>
            
            {/* Community button in header - This is the ONLY community button now */}
            <TouchableOpacity 
              style={styles.headerCommunityButton}
              onPress={navigateToCommunity}
            >
              <FontAwesome5 name="users" size={14} color={colors.primary} />
              <Text style={styles.headerCommunityText}>Community</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Categories help tooltip */}
        <View style={styles.helpTipContainer}>
          <View style={styles.helpTipIconContainer}>
            <FontAwesome5 name="info-circle" size={16} color={colors.primary} />
          </View>
          <Text style={styles.helpTipText}>
            <Text style={{fontWeight: '600'}}>Pro tip:</Text> Long-press any category to lock or unlock it
          </Text>
        </View>

        {/* Expert disclaimer */}
        <View style={styles.disclaimerContainer}>
          <View style={styles.disclaimerIconContainer}>
            <FontAwesome5 name="user-md" size={16} color={colors.primary} />
          </View>
          <Text style={styles.disclaimerText}>
            All tips are provided by certified pediatricians and healthcare experts
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.categoriesSubtitle}>Manage Content Access</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured tips */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Featured for {babyInfo.name}</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            horizontal
            data={featuredTips}
            renderItem={renderTipItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tipsList}
          />
        </View>

        {/* Recent tips */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recently Added</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            horizontal
            data={recentTips}
            renderItem={renderRecentTipItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentTipsList}
          />
        </View>

        {/* Educational banner about content categories */}
        <View style={styles.educationalBannerContainer}>
          <LinearGradient
            colors={['#f0f6ff', '#e1ebfa']} // Light blue gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.educationalBanner}
          >
            <View style={styles.educationalBannerContent}>
              <View style={styles.educationalBannerIconContainer}>
                <AntDesign name="bulb1" size={24} color="#4b7bec" />
              </View>
              <View style={styles.educationalBannerTextContainer}>
                <Text style={styles.educationalBannerTitle}>
                  Why are some categories locked?
                </Text>
                <Text style={styles.educationalBannerDescription}>
                  We automatically unlock content based on your baby's age, but you can manually access any category anytime by tapping and selecting "Unlock Now"
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        
        {/* Bottom padding for scroll */}
        <View style={{ height: 20 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Tips;