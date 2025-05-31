import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  StatusBar as RNStatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
// Removed BlurView import since it's causing the error

// Constants
import colors from '../constants/colors';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const UserProfile = ({ navigation, route, visible, onClose }) => {
  // Animation value for drawer
  const slideAnim = useRef(new Animated.Value(width)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  
  // State variables
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    vaccinationReminders: true,
    milestoneAlerts: true,
    generalTips: true
  });
  const [appSettings, setAppSettings] = useState({
    darkMode: false,
    metricUnits: true
  });
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    dateOfBirth: '01/01/1990',
    profileImage: null,
  });
  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
  const [newName, setNewName] = useState('');

  // Open Animation
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible, slideAnim, backdropOpacity]);

  // Handle picking an image from library
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required", 
        "You need to allow access to your photo library to change your profile picture."
      );
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    
    if (!result.canceled) {
      setUserData({
        ...userData,
        profileImage: result.assets[0].uri
      });
    }
  };

  // Handle name change
  const handleNameChange = () => {
    if (newName.trim().length > 0) {
      setUserData({
        ...userData,
        fullName: newName
      });
      setEditNameModalVisible(false);
    } else {
      Alert.alert("Error", "Name cannot be empty");
    }
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => {
            // Perform logout actions here
            onClose();
            // Navigate to login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
          style: "destructive"
        }
      ]
    );
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            // Perform account deletion actions here
            onClose();
            // Navigate to login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
          style: "destructive"
        }
      ]
    );
  };

  // Handle close with animation
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      onClose();
    });
  };

  // Render name edit modal
  const renderEditNameModal = () => {
    return (
      <Modal
        transparent={true}
        visible={editNameModalVisible}
        animationType="fade"
        onRequestClose={() => setEditNameModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Name</Text>
            <TextInput
              style={styles.textInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter your name"
              autoFocus
              placeholderTextColor="#888"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton} 
                onPress={() => setEditNameModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalSaveButton} 
                onPress={handleNameChange}
              >
                <Text style={styles.modalSaveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  if (!visible) return null;

  return (
    <>
      <Animated.View 
        style={[
          styles.backdrop,
          {
            opacity: backdropOpacity,
          }
        ]}
        pointerEvents="auto"
        onTouchStart={handleClose}
      />
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <StatusBar style="light" />
        
        <SafeAreaView style={styles.safeArea}>
          {/* Enhanced Header */}
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <View style={styles.headerTitleContainer}>
                  <Text style={styles.headerTitle}>Profile</Text>
                  <Text style={styles.headerSubtitle}>& Settings</Text>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <View style={styles.closeButtonCircle}>
                    <MaterialIcons name="close" size={20} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              </View>
              
              {/* Profile Section moved to header */}
              <View style={styles.profileInHeader}>
                <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
                  {userData.profileImage ? (
                    <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
                  ) : (
                    <View style={styles.profileImagePlaceholder}>
                      <FontAwesome5 name="user" size={40} color="#FFFFFF" />
                    </View>
                  )}
                  <View style={styles.editImageButton}>
                    <MaterialIcons name="photo-camera" size={18} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>
                
                <View style={styles.profileInfo}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.profileName}>{userData.fullName}</Text>
                    <TouchableOpacity 
                      style={styles.editNameButton} 
                      onPress={() => {
                        setNewName(userData.fullName);
                        setEditNameModalVisible(true);
                      }}
                    >
                      <MaterialIcons name="edit" size={16} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.profileEmail}>{userData.email}</Text>
                </View>
              </View>
            </View>
          </View>
          
          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* 1. Parent Info Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Parent Information</Text>
              
              <View style={styles.sectionContent}>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingItemLeft}>
                    <FontAwesome5 name="birthday-cake" size={18} color={colors.textDark} style={styles.settingIcon} />
                    <View>
                      <Text style={styles.settingLabel}>Date of Birth</Text>
                      <Text style={styles.settingValue}>{userData.dateOfBirth}</Text>
                    </View>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="lock" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <View>
                      <Text style={styles.settingLabel}>Reset Password</Text>
                      <Text style={styles.settingValueSmall}>Change your account password</Text>
                    </View>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* 2. Linked Accounts Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Linked Accounts</Text>
              
              <View style={styles.sectionContent}>
                <View style={styles.settingItem}>
                  <View style={styles.settingItemLeft}>
                    <FontAwesome5 name="google" size={18} color="#DB4437" style={styles.settingIcon} />
                    <View>
                      <Text style={styles.settingLabel}>Google</Text>
                      <Text style={styles.settingValueSmall}>Not linked</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.linkButton}>
                    <Text style={styles.linkButtonText}>Link</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingItemLeft}>
                    <FontAwesome5 name="apple" size={20} color="#000000" style={styles.settingIcon} />
                    <View>
                      <Text style={styles.settingLabel}>Apple</Text>
                      <Text style={styles.settingValueSmall}>Not linked</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.linkButton}>
                    <Text style={styles.linkButtonText}>Link</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            {/* 3. Notification Preferences */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notification Preferences</Text>
              
              <View style={styles.sectionContent}>
                <View style={styles.switchItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="notifications" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Vaccination Reminders</Text>
                  </View>
                  <Switch
                    value={notificationSettings.vaccinationReminders}
                    onValueChange={(value) => 
                      setNotificationSettings({...notificationSettings, vaccinationReminders: value})
                    }
                    trackColor={{ false: "#d1d1d1", true: colors.secondary }}
                    thumbColor={notificationSettings.vaccinationReminders ? colors.primary : "#f4f3f4"}
                  />
                </View>
                
                <View style={styles.switchItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="emoji-events" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Milestone Alerts</Text>
                  </View>
                  <Switch
                    value={notificationSettings.milestoneAlerts}
                    onValueChange={(value) => 
                      setNotificationSettings({...notificationSettings, milestoneAlerts: value})
                    }
                    trackColor={{ false: "#d1d1d1", true: colors.secondary }}
                    thumbColor={notificationSettings.milestoneAlerts ? colors.primary : "#f4f3f4"}
                  />
                </View>
                
                <View style={styles.switchItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="lightbulb" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>General Tips</Text>
                  </View>
                  <Switch
                    value={notificationSettings.generalTips}
                    onValueChange={(value) => 
                      setNotificationSettings({...notificationSettings, generalTips: value})
                    }
                    trackColor={{ false: "#d1d1d1", true: colors.secondary }}
                    thumbColor={notificationSettings.generalTips ? colors.primary : "#f4f3f4"}
                  />
                </View>
              </View>
            </View>
            
            {/* 4. App Settings */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>App Settings</Text>
              
              <View style={styles.sectionContent}>
                <View style={styles.switchItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="dark-mode" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Dark Mode</Text>
                  </View>
                  <Switch
                    value={appSettings.darkMode}
                    onValueChange={(value) => 
                      setAppSettings({...appSettings, darkMode: value})
                    }
                    trackColor={{ false: "#d1d1d1", true: colors.secondary }}
                    thumbColor={appSettings.darkMode ? colors.primary : "#f4f3f4"}
                  />
                </View>
                
                <View style={styles.switchItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="straighten" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Use Metric Units</Text>
                  </View>
                  <Switch
                    value={appSettings.metricUnits}
                    onValueChange={(value) => 
                      setAppSettings({...appSettings, metricUnits: value})
                    }
                    trackColor={{ false: "#d1d1d1", true: colors.secondary }}
                    thumbColor={appSettings.metricUnits ? colors.primary : "#f4f3f4"}
                  />
                </View>
              </View>
            </View>
            
            {/* 5. Support & Feedback */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support & Feedback</Text>
              
              <View style={styles.sectionContent}>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="help-outline" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Help Center</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="bug-report" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Report a Bug</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="lightbulb" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Request a Feature</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="mail" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Contact Support</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* 6. Legal */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Legal</Text>
              
              <View style={styles.sectionContent}>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="privacy-tip" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Privacy Policy</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="description" size={20} color={colors.textDark} style={styles.settingIcon} />
                    <Text style={styles.settingLabel}>Terms of Service</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.settingItem, styles.dangerItem]} 
                  onPress={handleDeleteAccount}
                >
                  <View style={styles.settingItemLeft}>
                    <MaterialIcons name="delete-forever" size={20} color="#FF3B30" style={styles.settingIcon} />
                    <Text style={styles.dangerText}>Delete Account</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* App Version */}
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>Babysafe v1.0.0</Text>
            </View>
            
            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialIcons name="logout" size={20} color="#FFFFFF" style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
        
        {/* Name Edit Modal */}
        {renderEditNameModal()}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 999,
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '85%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    zIndex: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.secondary,
    marginLeft: 5,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  profileInHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 12,
    backgroundColor: colors.lightBackground,
    marginBottom: 5,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F0F0F0',
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.secondary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 2,
  },
  editNameButton: {
    marginLeft: 8,
    padding: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textLight,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  settingLabel: {
    fontSize: 15,
    color: colors.textDark,
  },
  settingValue: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  settingValueSmall: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  dangerText: {
    fontSize: 15,
    color: '#FF3B30',
  },
  versionContainer: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  versionText: {
    fontSize: 12,
    color: colors.textLight,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 14,
    borderRadius: 10,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  modalCancelButtonText: {
    fontSize: 16,
    color: colors.textDark,
  },
  modalSaveButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  modalSaveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  linkButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.secondary,
    borderRadius: 15,
  },
  linkButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
  },
});

export default UserProfile;