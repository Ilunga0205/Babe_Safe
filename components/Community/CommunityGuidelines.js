import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../../screens/styles/CommunityStyles';
import colors from '../../constants/colors';

const CommunityGuidelines = ({ visible, onClose, onAccept, tcAccepted, navigation }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.tcModalContent}>
          <View style={styles.tcModalHeader}>
            <FontAwesome5 name="shield-alt" size={22} color={colors.primary} />
            <Text style={styles.tcModalTitle}>Community Guidelines</Text>
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={onClose}
            >
              <MaterialIcons name="close" size={24} color={colors.textDark} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.tcScrollView}>
            <Text style={styles.tcSectionTitle}>Respectful Communication</Text>
            <Text style={styles.tcText}>
              • Be kind and respectful to all community members.{'\n'}
              • No personal attacks, harassment, or bullying.{'\n'}
              • Disagreements should be expressed respectfully.{'\n'}
              • No hate speech or discriminatory content.
            </Text>
            
            <Text style={styles.tcSectionTitle}>Medical Information</Text>
            <Text style={styles.tcText}>
              • Information shared is not medical advice.{'\n'}
              • Always consult healthcare providers for medical decisions.{'\n'}
              • Don't present yourself as a medical expert unless verified.{'\n'}
              • Critical medical situations require immediate professional help, not forum advice.
            </Text>
            
            <Text style={styles.tcSectionTitle}>Privacy & Safety</Text>
            <Text style={styles.tcText}>
              • Don't share personally identifiable information.{'\n'}
              • Obtain permission before sharing photos of children.{'\n'}
              • Never share another user's private information.{'\n'}
              • Report concerning content to moderators immediately.
            </Text>
            
            <Text style={styles.tcSectionTitle}>Content Quality</Text>
            <Text style={styles.tcText}>
              • Provide accurate, helpful information.{'\n'}
              • Avoid spamming, excessive self-promotion, or advertising.{'\n'}
              • No plagiarized content or copyright violations.{'\n'}
              • Use clear, understandable language.
            </Text>
            
            <Text style={styles.tcSectionTitle}>Moderation</Text>
            <Text style={styles.tcText}>
              • Moderators may remove content that violates guidelines.{'\n'}
              • Repeated violations may result in temporary or permanent bans.{'\n'}
              • Report inappropriate content rather than engaging with it.{'\n'}
              • Moderator decisions are final, but can be appealed through proper channels.
            </Text>
            
            <Text style={styles.tcDisclaimer}>
              By accepting these guidelines, you acknowledge that BabySafe is not responsible for content posted by community members and does not endorse any specific parenting practices or medical advice shared within the community. We encourage critical thinking and professional consultation for important decisions.
            </Text>
          </ScrollView>
          
          <View style={styles.tcModalButtons}>
            <TouchableOpacity 
              style={styles.declineButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.declineButtonText}>Decline & Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.acceptButton}
              onPress={onAccept}
            >
              <Text style={styles.acceptButtonText}>Accept & Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommunityGuidelines;