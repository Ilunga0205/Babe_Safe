import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Month Header
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  monthNavButton: {
    padding: 5,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Calendar
  calendarContainer: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    width: width / 7 - 10,
    textAlign: 'center',
  },
  calendarGrid: {
    alignItems: 'center',
  },
  calendarDay: {
    width: (width - 60) / 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 8,
    position: 'relative',
  },
  emptyCalendarDay: {
    width: (width - 60) / 7,
    height: 40,
  },
  selectedCalendarDay: {
    backgroundColor: colors.primary,
  },
  todayCalendarDay: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  calendarDayWithData: {
    backgroundColor: colors.lightBlue,
  },
  calendarDayText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  selectedCalendarDayText: {
    color: 'white',
    fontWeight: '600',
  },
  todayCalendarDayText: {
    color: colors.primary,
    fontWeight: '600',
  },
  dataDot: {
    position: 'absolute',
    bottom: 3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },

  // Concerns
  concernsContainer: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  concernItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  concernMedium: {
    backgroundColor: '#fff3e0',
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  concernLow: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  concernText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },

  // Category Filter
  categoryFilter: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeCategoryButtonText: {
    color: 'white',
    fontWeight: '600',
  },

  // Timeline
  timeline: {
    flex: 1,
    marginTop: 15,
  },
  timelineContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  routineItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routineItemContent: {
    flex: 1,
  },
  routineItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  routineItemSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  routineItemNotes: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  routineItemTime: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 15,
    marginBottom: 5,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Floating Buttons
  floatingButtons: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    alignItems: 'center',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  feedingButton: {
    backgroundColor: '#4CAF50',
  },
  sleepButton: {
    backgroundColor: '#2196F3',
  },
  diaperButton: {
    backgroundColor: '#FF9800',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  modalBody: {
    padding: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  // Form
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.textPrimary,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  timeButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  timeButtonText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  optionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  optionButtonTextActive: {
    color: 'white',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});