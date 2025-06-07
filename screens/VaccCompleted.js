import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import colors from '../constants/colors';

const VaccCompleted = ({ 
  pastVaccinations, 
  pastVisits, 
  onDeleteVaccination, 
  onDeleteVisit 
}) => {
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  return (
    <View style={styles.sectionContainer}>
      {/* Past Vaccinations */}
      <Text style={styles.sectionTitle}>Completed Vaccinations</Text>
      
      {pastVaccinations.length === 0 ? (
        <View style={styles.emptyState}>
          <FontAwesome5 name="check-circle" size={24} color={colors.textLight} />
          <Text style={styles.emptyStateText}>No completed vaccinations</Text>
        </View>
      ) : (
        pastVaccinations.map(vaccination => (
          <View key={vaccination.id} style={[styles.vaccinationCard, styles.pastVaccinationCard]}>
            <View style={styles.vaccinationHeader}>
              <View style={[styles.vaccinationIconContainer, styles.pastVaccinationIcon]}>
                <FontAwesome5 name="check" size={14} color="#FFFFFF" />
              </View>
              <View style={styles.vaccinationHeaderContent}>
                <Text style={styles.vaccinationName}>{vaccination.name}</Text>
                <View style={styles.dateContainer}>
                  <MaterialIcons name="event" size={14} color={colors.textGray} />
                  <Text style={styles.dateText}>{formatDate(vaccination.date)}</Text>
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>COMPLETED</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => onDeleteVaccination(vaccination.id)}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              >
                <MaterialIcons name="close" size={20} color={colors.textLight} />
              </TouchableOpacity>
            </View>
            
            {vaccination.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesText}>{vaccination.notes}</Text>
              </View>
            )}
          </View>
        ))
      )}

      {/* Past Visits */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Past Doctor Visits</Text>
      
      {pastVisits.length === 0 ? (
        <View style={styles.emptyState}>
          <FontAwesome5 name="hospital" size={24} color={colors.textLight} />
          <Text style={styles.emptyStateText}>No past doctor visits</Text>
        </View>
      ) : (
        pastVisits.map(visit => {
          const { date, time } = formatDateTime(visit.dateTime);
          return (
            <View key={visit.id} style={[styles.vaccinationCard, styles.pastVaccinationCard]}>
              <View style={styles.vaccinationHeader}>
                <View style={[styles.vaccinationIconContainer, { backgroundColor: colors.success }]}>
                  <FontAwesome5 name="check" size={14} color="#FFFFFF" />
                </View>
                <View style={styles.vaccinationHeaderContent}>
                  <Text style={styles.vaccinationName}>{visit.doctorName}</Text>
                  <Text style={[styles.vaccinationName, { fontSize: 14, fontWeight: '500', color: colors.textGray }]}>{visit.type}</Text>
                  <View style={styles.dateContainer}>
                    <MaterialIcons name="event" size={14} color={colors.textGray} />
                    <Text style={styles.dateText}>{date} at {time}</Text>
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>COMPLETED</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => onDeleteVisit(visit.id)}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                >
                  <MaterialIcons name="close" size={20} color={colors.textLight} />
                </TouchableOpacity>
              </View>
              
              {visit.notes && (
                <View style={styles.notesContainer}>
                  <Text style={styles.notesText}>{visit.notes}</Text>
                </View>
              )}
            </View>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 12,
  },
  vaccinationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  pastVaccinationCard: {
    backgroundColor: '#F8F8F8',
  },
  vaccinationHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  vaccinationIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pastVaccinationIcon: {
    backgroundColor: colors.success,
  },
  vaccinationHeaderContent: {
    flex: 1,
  },
  vaccinationName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    color: colors.textGray,
    marginLeft: 4,
    marginRight: 8,
  },
  completedBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  notesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
    paddingLeft: 64,
  },
  notesText: {
    fontSize: 13,
    color: colors.textGray,
    lineHeight: 18,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 8,
  },
});

export default VaccCompleted;