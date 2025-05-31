import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
  ActivityIndicator,
  ScrollView,
  Keyboard
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../../screens/styles/CommunityStyles';
import colors from '../../constants/colors';

const CreatePostModal = ({ visible, onClose, communityTopics }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

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
  const toggleTopic = (topicId) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter(id => id !== topicId));
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
    }
  };

  // Reset form when closing
  const handleClose = () => {
    setPostTitle('');
    setPostContent('');
    setSelectedTopics([]);
    onClose();
  };

  // Submit post
  const submitPost = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
    }, 1000);
  };

  // Check if form is valid
  const isFormValid = postTitle.trim().length > 0 && postContent.trim().length > 0;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={[
          styles.createPostModalContent,
          keyboardVisible && Platform.OS === 'ios' && { maxHeight: '60%' }
        ]}>
          <View style={styles.createPostModalHeader}>
            <Text style={styles.createPostModalTitle}>Create Post</Text>
            <TouchableOpacity onPress={handleClose}>
              <MaterialIcons name="close" size={24} color={colors.textDark} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.createPostForm}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.createPostLabel}>Title</Text>
            <TextInput
              style={styles.createPostTitleInput}
              placeholder="Enter a descriptive title..."
              placeholderTextColor={colors.textLight}
              value={postTitle}
              onChangeText={setPostTitle}
              returnKeyType="next"
            />
            
            <Text style={styles.createPostLabel}>Content</Text>
            <TextInput
              style={styles.createPostContentInput}
              placeholder="Share your question or experience..."
              placeholderTextColor={colors.textLight}
              multiline={true}
              textAlignVertical="top"
              value={postContent}
              onChangeText={setPostContent}
            />
            
            <Text style={styles.createPostLabel}>Topics (Select up to 2)</Text>
            <View style={styles.createPostTopicsContainer}>
              {communityTopics.map(topic => (
                <TouchableOpacity 
                  key={topic.id} 
                  style={[
                    styles.createPostTopicChip,
                    selectedTopics.includes(topic.id) && styles.selectedCreatePostTopicChip
                  ]}
                  onPress={() => toggleTopic(topic.id)}
                  disabled={!selectedTopics.includes(topic.id) && selectedTopics.length >= 2}
                >
                  <FontAwesome5 
                    name={topic.icon} 
                    size={12} 
                    color={selectedTopics.includes(topic.id) ? colors.white : colors.primary} 
                  />
                  <Text 
                    style={[
                      styles.createPostTopicText,
                      selectedTopics.includes(topic.id) && styles.selectedCreatePostTopicText
                    ]}
                  >
                    {topic.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.createPostDisclaimer}>
              By posting, you confirm this content follows our Community Guidelines.
            </Text>
          </ScrollView>
          
          <TouchableOpacity 
            style={[
              styles.submitPostButton,
              !isFormValid && styles.submitPostButtonDisabled
            ]}
            onPress={submitPost}
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.submitPostButtonText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreatePostModal;