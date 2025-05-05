import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import colors from '../constants/colors';

const EntryDetailScreen = ({ route, navigation }) => {
  // Get the entry data from route params
  const { entry, date } = route.params || {};
  
  // State for audio playback
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Format date
  const formatDate = () => {
    if (!date) return '';
    
    // Fix for timezone issues - add 'T00:00:00' to ensure date is not shifted
    const dateObj = new Date(`${date}T00:00:00`);
    
    return dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Play audio recording
  const playAudio = async (uri, id) => {
    // Stop any currently playing audio
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      
      // If the same audio is clicked again, just stop it
      if (id === playingAudioId) {
        setPlayingAudioId(null);
        return;
      }
    }
    
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);
      setPlayingAudioId(id);
      setIsPlaying(true);
      
      // Play the audio
      await newSound.playAsync();
      
      // When audio finishes playing
      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          setPlayingAudioId(null);
        }
      });
    } catch (error) {
      console.error('Failed to play audio', error);
      alert('Error playing audio: ' + error.message);
    }
  };
  
  // Format recording time as MM:SS
  const formatTime = (seconds) => {
    if (!seconds) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Render the mood indicator
  const renderMood = () => {
    if (!entry?.mood) return null;
    
    const moodEmoji = {
      'happy': '😊',
      'calm': '😌',
      'tired': '😴',
      'fussy': '😫',
      'sick': '🤒'
    };
    
    return (
      <View style={styles.moodContainer}>
        <Text style={styles.moodLabel}>Baby's Mood:</Text>
        <View style={styles.moodBadge}>
          <Text style={styles.moodEmoji}>{moodEmoji[entry.mood] || '😊'}</Text>
          <Text style={styles.moodText}>{entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</Text>
        </View>
      </View>
    );
  };
  
  // Render entry type badges
  const renderEntryTypes = () => {
    if (!entry?.entryTypes || entry.entryTypes.length === 0) return null;
    
    const typeIcons = {
      note: 'note',
      growth: 'straighten',
      milestone: 'emoji-events',
      media: 'photo-camera'
    };
    
    return (
      <View style={styles.entryTypesContainer}>
        {entry.entryTypes.map((type, index) => (
          <View key={`type-${index}`} style={styles.entryTypeBadge}>
            <MaterialIcons 
              name={typeIcons[type] || 'assignment'} 
              size={14} 
              color="#FFF" 
            />
            <Text style={styles.entryTypeBadgeText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  
  // Render growth data
  const renderGrowthData = () => {
    if (!entry?.growthData) return null;
    
    const { weight, height, headCircumference } = entry.growthData;
    
    // Check if we have any growth data to display
    if (!weight && !height && !headCircumference) return null;
    
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Growth</Text>
        <View style={styles.growthDataContainer}>
          {weight && (
            <View style={styles.growthDataItem}>
              <FontAwesome5 name="weight" size={20} color={colors.primary} />
              <Text style={styles.growthDataValue}>{weight} kg</Text>
              <Text style={styles.growthDataLabel}>Weight</Text>
            </View>
          )}
          
          {height && (
            <View style={styles.growthDataItem}>
              <MaterialIcons name="height" size={22} color={colors.primary} />
              <Text style={styles.growthDataValue}>{height} cm</Text>
              <Text style={styles.growthDataLabel}>Height</Text>
            </View>
          )}
          
          {headCircumference && (
            <View style={styles.growthDataItem}>
              <FontAwesome5 name="circle" size={18} color={colors.primary} />
              <Text style={styles.growthDataValue}>{headCircumference} cm</Text>
              <Text style={styles.growthDataLabel}>Head</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  
  // Render milestones
  const renderMilestones = () => {
    if (!entry?.milestones || entry.milestones.length === 0) return null;
    
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Milestones</Text>
        <View style={styles.milestonesContainer}>
          {entry.milestones.map((milestone, index) => (
            <View key={`milestone-${index}`} style={styles.milestoneItem}>
              <View style={styles.milestoneIconContainer}>
                <MaterialIcons name="emoji-events" size={18} color="#FFF" />
              </View>
              <Text style={styles.milestoneText}>{milestone}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };
  
  // Render media items
  const renderMediaItems = () => {
    if (!entry?.mediaItems || entry.mediaItems.length === 0) return null;
    
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Media</Text>
        <View style={styles.mediaGrid}>
          {entry.mediaItems.map((item, index) => {
            // Handle different media types
            if (item.type === 'image') {
              return (
                <View key={`media-${index}`} style={styles.mediaItem}>
                  <Image source={{ uri: item.uri }} style={styles.mediaImage} />
                  <Text style={styles.mediaLabel}>Photo</Text>
                </View>
              );
            } else if (item.type === 'audio') {
              return (
                <TouchableOpacity 
                  key={`media-${index}`} 
                  style={styles.audioItem}
                  onPress={() => playAudio(item.uri, index)}
                >
                  <View style={styles.audioPlayButton}>
                    <MaterialIcons 
                      name={playingAudioId === index ? "pause" : "play-arrow"} 
                      size={24} 
                      color="#FFF" 
                    />
                  </View>
                  <View style={styles.audioDetails}>
                    <Text style={styles.audioTitle}>Audio Recording</Text>
                    <Text style={styles.audioDuration}>{formatTime(item.duration)}</Text>
                  </View>
                </TouchableOpacity>
              );
            } else if (item.type === 'document') {
              return (
                <View key={`media-${index}`} style={styles.documentItem}>
                  <View style={styles.documentIcon}>
                    <MaterialIcons name="description" size={24} color="#FFF" />
                  </View>
                  <Text style={styles.documentName} numberOfLines={2}>{item.filename}</Text>
                </View>
              );
            }
            
            return null;
          })}
        </View>
      </View>
    );
  };
  
  // Render notes
  const renderNotes = () => {
    if (!entry?.notes) return null;
    
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <View style={styles.notesContainer}>
          <Text style={styles.notesText}>{entry.notes}</Text>
        </View>
      </View>
    );
  };
  
  // Handle going back
  const handleBack = () => {
    if (sound) {
      sound.unloadAsync();
    }
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Entry Details</Text>
        
        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons name="edit" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Display */}
        <View style={styles.dateContainer}>
          <MaterialIcons name="event" size={20} color={colors.primary} />
          <Text style={styles.dateText}>{formatDate()}</Text>
        </View>
        
        {/* Entry Type Badges */}
        {renderEntryTypes()}
        
        {/* Mood Display */}
        {renderMood()}
        
        {/* Growth Data */}
        {renderGrowthData()}
        
        {/* Milestones */}
        {renderMilestones()}
        
        {/* Media Items */}
        {renderMediaItems()}
        
        {/* Notes */}
        {renderNotes()}
        
        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  editButton: {
    padding: 8,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  entryTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  entryTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  entryTypeBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  moodLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  moodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  moodEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  moodText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  sectionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  growthDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  growthDataItem: {
    alignItems: 'center',
    padding: 8,
  },
  growthDataValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  growthDataLabel: {
    fontSize: 12,
    color: '#666',
  },
  milestonesContainer: {
    marginTop: 8,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  milestoneIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  milestoneText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  mediaItem: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mediaLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#FFF',
    fontSize: 12,
    padding: 4,
    textAlign: 'center',
  },
  audioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '100%',
  },
  audioPlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  audioDetails: {
    flex: 1,
  },
  audioTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  audioDuration: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '100%',
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  notesContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
  },
  notesText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 40,
  },
});

export default EntryDetailScreen;