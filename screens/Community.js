import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import styles from './styles/CommunityStyles';
import colors from '../constants/colors';
import CommunityGuidelines from '../components/Community/CommunityGuidelines';
import CreatePostModal from '../components/Community/CreatePostModal';

// Mock data for community topics
const communityTopics = [
  { id: '1', name: 'Sleep', icon: 'moon' },
  { id: '2', name: 'Nutrition', icon: 'utensils' },
  { id: '3', name: 'Development', icon: 'child' },
  { id: '4', name: 'Health', icon: 'heartbeat' },
  { id: '5', name: 'Behavior', icon: 'brain' },
  { id: '6', name: 'Parents', icon: 'users' },
];

// Mock data for featured discussions
const featuredDiscussions = [
  {
    id: '1',
    title: 'How to handle sleep regression at 4 months?',
    author: 'Sarah M.',
    authorRole: 'Parent of 2',
    replies: 24,
    likes: 47,
    views: 320,
    timeAgo: '2h ago',
    tags: ['Sleep', 'Newborn'],
    verified: true,
    avatar: require('../assets/picture1.png'),
  },
  {
    id: '2',
    title: 'Introducing solid foods - when did you start?',
    author: 'Michael T.',
    authorRole: 'Parent of 1',
    replies: 56,
    likes: 89,
    views: 412,
    timeAgo: '4h ago',
    tags: ['Nutrition', 'Infant'],
    verified: false,
    avatar: require('../assets/picture1.png'),
  },
  {
    id: '3',
    title: 'What are the signs of ear infection in toddlers?',
    author: 'Dr. Emma W.',
    authorRole: 'Pediatrician',
    replies: 18,
    likes: 64,
    views: 286,
    timeAgo: '12h ago',
    tags: ['Health', 'Toddler'],
    verified: true,
    avatar: require('../assets/picture1.png'),
  },
];

// Mock data for recent discussions
const recentDiscussions = [
  {
    id: '4',
    title: 'Best teething toys that actually work?',
    author: 'Lisa R.',
    authorRole: 'Parent of 1',
    replies: 15,
    likes: 27,
    timeAgo: '1d ago',
    tags: ['Products', 'Infant'],
    avatar: require('../assets/picture1.png'),
  },
  {
    id: '5',
    title: 'How to manage tantrums in public spaces',
    author: 'James K.',
    authorRole: 'Parent of 2',
    replies: 42,
    likes: 63,
    timeAgo: '1d ago',
    tags: ['Behavior', 'Toddler'],
    avatar: require('../assets/picture1.png'),
  },
  {
    id: '6',
    title: 'Baby won\'t take bottle - help!',
    author: 'Alyssa N.',
    authorRole: 'Parent of 1',
    replies: 31,
    likes: 19,
    timeAgo: '2d ago',
    tags: ['Feeding', 'Newborn'],
    avatar: require('../assets/picture1.png'),
  },
];

const Community = ({ navigation }) => {
  // Get safe area insets
  const insets = useSafeAreaInsets();
  
  // State variables
  const [tcAccepted, setTcAccepted] = useState(false);
  const [showTcModal, setShowTcModal] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Shrikhand: require('../assets/fonts/Shrikhand-Regular.ttf'),
  });
  
  // Animated values for scrolling transparency
  const scrollY = useRef(new Animated.Value(0)).current;
  const fabOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.3],
    extrapolate: 'clamp'
  });

  // Effect to show T&C modal when screen is first loaded
  useEffect(() => {
    if (!tcAccepted) {
      setShowTcModal(true);
    }
  }, [tcAccepted]);

  // Effect for keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Handle topic selection
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic.id === selectedTopic ? null : topic.id);
  };

  // Accept T&Cs and close modal
  const acceptTerms = () => {
    setTcAccepted(true);
    setShowTcModal(false);
  };

  // Navigate to discussion details
  const navigateToDiscussion = (discussion) => {
    // This would navigate to a discussion detail screen
    console.log('Navigate to discussion:', discussion.id);
  };

  // Handle creating a new post
  const handleCreatePost = () => {
    setShowCreatePostModal(true);
  };

  // Navigate to notifications
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };

  // Render topic item
  const renderTopicItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.topicItem,
        selectedTopic === item.id && styles.selectedTopicItem
      ]}
      onPress={() => handleTopicSelect(item)}
    >
      <View style={[
        styles.topicIconContainer,
        selectedTopic === item.id && styles.selectedTopicIconContainer
      ]}>
        <FontAwesome5
          name={item.icon}
          size={16}
          color={selectedTopic === item.id ? colors.white : colors.primary}
        />
      </View>
      <Text style={[
        styles.topicText,
        selectedTopic === item.id && styles.selectedTopicText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Render featured discussion item
  const renderFeaturedDiscussionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredDiscussionCard}
      onPress={() => navigateToDiscussion(item)}
    >
      <View style={styles.featuredDiscussionHeader}>
        <View style={styles.authorContainer}>
          <Image source={item.avatar} style={styles.authorAvatar} />
          <View style={styles.authorInfo}>
            <View style={styles.authorNameRow}>
              <Text style={styles.authorName}>{item.author}</Text>
              {item.verified && (
                <View style={styles.verifiedBadge}>
                  <MaterialIcons name="verified" size={12} color={colors.white} />
                </View>
              )}
            </View>
            <Text style={styles.authorRole}>{item.authorRole}</Text>
          </View>
        </View>
        <Text style={styles.timeAgo}>{item.timeAgo}</Text>
      </View>
      
      <Text style={styles.discussionTitle}>{item.title}</Text>
      
      <View style={styles.tagContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.discussionStats}>
        <View style={styles.statItem}>
          <MaterialIcons name="message" size={14} color={colors.textLight} />
          <Text style={styles.statText}>{item.replies}</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="thumb-up" size={14} color={colors.textLight} />
          <Text style={styles.statText}>{item.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="visibility" size={14} color={colors.textLight} />
          <Text style={styles.statText}>{item.views}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render recent discussion item
  const renderRecentDiscussionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recentDiscussionCard}
      onPress={() => navigateToDiscussion(item)}
    >
      <View style={styles.recentDiscussionContent}>
        <View style={styles.recentAuthorContainer}>
          <Image source={item.avatar} style={styles.recentAuthorAvatar} />
          <View style={styles.recentAuthorInfo}>
            <Text style={styles.recentAuthorName}>{item.author}</Text>
            <Text style={styles.recentTimeAgo}>{item.timeAgo}</Text>
          </View>
        </View>
        
        <Text style={styles.recentDiscussionTitle}>{item.title}</Text>
        
        <View style={styles.recentTagContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.recentTag}>
              <Text style={styles.recentTagText}>{tag}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.recentDiscussionStats}>
          <View style={styles.recentStatItem}>
            <MaterialIcons name="message" size={12} color={colors.textLight} />
            <Text style={styles.recentStatText}>{item.replies}</Text>
          </View>
          <View style={styles.recentStatItem}>
            <MaterialIcons name="thumb-up" size={12} color={colors.textLight} />
            <Text style={styles.recentStatText}>{item.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
        
        {/* Header - Now static (no animation) */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#7a3e3e', colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.headerGradient}
          >
            {/* Header content */}
            <View style={[styles.headerContent, { paddingTop: insets.top }]}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.headerTitleContainer}>
                {/* Removed FontAwesome5 users icon */}
                <Text style={styles.headerTitle}>BabySafe</Text>
              </View>
              <View style={styles.headerButtons}>
                <TouchableOpacity style={styles.iconButton} onPress={navigateToNotifications}>
                  <MaterialIcons name="notifications" size={22} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.createPostButton}
                  onPress={handleCreatePost}
                >
                  <MaterialIcons name="add" size={22} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Welcome message - Changed to "Community" */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>
                Community
              </Text>
              <Text style={styles.welcomeSubtext}>
                Connect with parents and experts
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Main content */}
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: keyboardVisible ? 10 : 0 }
          ]}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
        >
          {/* Search bar */}
          <View style={styles.searchContainer}>
            <View style={[
              styles.searchInputContainer,
              isSearchFocused && styles.searchInputContainerFocused
            ]}>
              <MaterialIcons name="search" size={20} color={colors.textLight} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search discussions..."
                placeholderTextColor={colors.textLight}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <MaterialIcons name="close" size={20} color={colors.textLight} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Community guidelines banner */}
          <TouchableOpacity 
            style={styles.guidelinesBanner}
            onPress={() => setShowTcModal(true)}
          >
            <LinearGradient
              colors={['#f0f6ff', '#e1ebfa']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.guidelinesBannerGradient}
            >
              <View style={styles.guidelinesBannerContent}>
                <View style={styles.guidelinesBannerIconContainer}>
                  <FontAwesome5 name="shield-alt" size={18} color="#4b7bec" />
                </View>
                <View style={styles.guidelinesBannerTextContainer}>
                  <Text style={styles.guidelinesBannerTitle}>
                    Community Guidelines
                  </Text>
                  <Text style={styles.guidelinesBannerDescription}>
                    Be respectful, supportive, and share reliable information only
                  </Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#4b7bec" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Topics */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Topics</Text>
            <FlatList
              horizontal
              data={communityTopics}
              renderItem={renderTopicItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topicsList}
            />
          </View>

          {/* Featured Discussions */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Featured Discussions</Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              horizontal
              data={featuredDiscussions}
              renderItem={renderFeaturedDiscussionItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.discussionsList}
            />
          </View>

          {/* Recent Discussions */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Recent Discussions</Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.recentDiscussionsContainer}>
              {recentDiscussions.map(item => (
                <View key={item.id} style={styles.recentDiscussionWrapper}>
                  {renderRecentDiscussionItem({ item })}
                </View>
              ))}
            </View>
          </View>
          
          {/* Bottom spacing */}
          <View style={{ height: 80 }} />
        </Animated.ScrollView>

        {/* Floating Action Button for creating post - Now with transparency when scrolling */}
        {!keyboardVisible && (
          <Animated.View style={{ opacity: fabOpacity }}>
            <TouchableOpacity 
              style={styles.floatingActionButton}
              onPress={handleCreatePost}
            >
              <LinearGradient
                colors={[colors.primary, '#7a3e3e']}
                style={styles.fabGradient}
              >
                <MaterialIcons name="edit" size={24} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Community Guidelines Modal */}
        <CommunityGuidelines 
          visible={showTcModal}
          tcAccepted={tcAccepted}
          onAccept={acceptTerms}
          onClose={() => tcAccepted ? setShowTcModal(false) : navigation.goBack()}
          navigation={navigation}
        />

        {/* Create Post Modal */}
        <CreatePostModal
          visible={showCreatePostModal}
          onClose={() => setShowCreatePostModal(false)}
          communityTopics={communityTopics}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Community;