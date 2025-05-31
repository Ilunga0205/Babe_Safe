import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

// Styles and constants
import styles from './styles/NotificationsStyles';
import colors from '../constants/colors';

// Sample notification data - you'll replace this with actual data from your backend
const SAMPLE_NOTIFICATIONS = [
  {
    id: '1',
    type: 'vaccination',
    title: 'Upcoming Vaccination',
    message: 'Sarah has a DTP vaccination due in 3 days',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    babyId: '1',
  },
  {
    id: '2',
    type: 'growth',
    title: 'New Growth Milestone',
    message: 'Alex reached the 6-month height milestone!',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    babyId: '2',
  },
  {
    id: '3',
    type: 'tip',
    title: 'Nutrition Tip',
    message: 'New feeding recommendations for 4-6 month babies',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: false,
    babyId: null, // Not associated with specific baby
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Doctor Appointment',
    message: 'Sarah has a pediatrician check-up tomorrow at 10:00 AM',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    read: true,
    babyId: '1',
  },
  {
    id: '5',
    type: 'system',
    title: 'App Update Available',
    message: 'Update Babysafe to get the latest features and improvements',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    read: false,
    babyId: null, // Not associated with specific baby
  },
];

const NotificationItem = ({ notification, onPress }) => {
  // Get the appropriate icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'vaccination':
        return <MaterialIcons name="medical-services" size={24} color={colors.primary} />;
      case 'growth':
        return <MaterialIcons name="show-chart" size={24} color="#4CAF50" />;
      case 'tip':
        return <MaterialIcons name="lightbulb" size={24} color="#FFC107" />;
      case 'reminder':
        return <MaterialIcons name="event" size={24} color="#2196F3" />;
      case 'system':
        return <MaterialIcons name="system-update" size={24} color="#9E9E9E" />;
      default:
        return <MaterialIcons name="notifications" size={24} color={colors.primary} />;
    }
  };

  // Format the date relative to current time
  const formattedDate = moment(notification.date).fromNow();

  return (
    <TouchableOpacity 
      style={[styles.notificationItem, !notification.read && styles.unreadNotification]} 
      onPress={() => onPress(notification)}
    >
      <View style={styles.notificationIconContainer}>
        {getNotificationIcon(notification.type)}
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationTime}>{formattedDate}</Text>
      </View>
      {!notification.read && <View style={styles.unreadIndicator} />}
      <MaterialIcons name="chevron-right" size={20} color="#AAAAAA" style={styles.rightArrow} />
    </TouchableOpacity>
  );
};

export default function Notifications({ navigation }) {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // Filter options: all, unread, read

  // Handle notification press
  const handleNotificationPress = (notification) => {
    // Mark as read
    setNotifications(
      notifications.map(item => 
        item.id === notification.id ? { ...item, read: true } : item
      )
    );

    // Navigate to relevant screen based on notification type
    switch (notification.type) {
      case 'vaccination':
        // Navigate to vaccination details (you'll need to implement this)
        // navigation.navigate('Vaccination', { babyId: notification.babyId });
        break;
      case 'growth':
        // Navigate to growth chart
        navigation.navigate('Growth', { babyId: notification.babyId });
        break;
      case 'tip':
        // Navigate to tips section
        navigation.navigate('Home', { initialTab: 'tips' });
        break;
      case 'reminder':
        // Navigate to calendar/events
        navigation.navigate('Home', { initialTab: 'events' });
        break;
      default:
        // Do nothing for system notifications
        break;
    }
  };

  // Function to filter notifications
  const filterNotifications = () => {
    if (filter === 'unread') {
      return notifications.filter(item => !item.read);
    } else if (filter === 'read') {
      return notifications.filter(item => item.read);
    }
    return notifications;
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(item => ({ ...item, read: true }))
    );
  };

  // Calculate number of unread notifications
  const unreadCount = notifications.filter(item => !item.read).length;

  // Calculate StatusBar height for padding
  const statusBarHeight = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      
      {/* Header */}
      <LinearGradient
        colors={['#7a3e3e', colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.header, { paddingTop: statusBarHeight }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          
          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.markReadButton}
              onPress={markAllAsRead}
            >
              <Text style={styles.markReadText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
      
      {/* Filter tabs */}
      <View style={styles.filterContainer}>
        {['all', 'unread', 'read'].map((filterOption) => (
          <TouchableOpacity
            key={filterOption}
            style={[styles.filterTab, filter === filterOption && styles.activeFilterTab]}
            onPress={() => setFilter(filterOption)}
          >
            <Text style={[styles.filterText, filter === filterOption && styles.activeFilterText]}>
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              {filterOption === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Notifications list */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filterNotifications()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationItem 
              notification={item} 
              onPress={handleNotificationPress}
            />
          )}
          contentContainerStyle={styles.notificationsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome5 name="bell-slash" size={64} color="#AAAAAA" />
              <Text style={styles.emptyText}>
                {filter === 'unread' 
                  ? "You've read all notifications" 
                  : filter === 'read' 
                    ? "No read notifications" 
                    : "No notifications yet"}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}