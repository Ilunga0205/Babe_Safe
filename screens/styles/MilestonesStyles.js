import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFBFC',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: colors.textLight,
    fontFamily: 'Inter-Medium',
  },

  // Header
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTop: {
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  filterToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Category Pills
  categoryPills: {
    marginBottom: 16,
  },
  categoryPillsContent: {
    paddingRight: 20,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeCategoryPill: {
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryPillText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textDark,
    marginLeft: 6,
  },
  activeCategoryPillText: {
    color: '#FFFFFF',
  },
  categoryBadge: {
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  activeCategoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryBadgeText: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    color: colors.textDark,
  },
  activeCategoryBadgeText: {
    color: '#FFFFFF',
  },

  // Progress
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: colors.textLight,
  },

  // Filters
  filtersContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: colors.textDark,
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },
  filterChipIcon: {
    marginRight: 4,
  },

  // Milestones List
  milestonesContainer: {
    flex: 1,
  },
  milestonesContent: {
    padding: 16,
  },
  milestoneCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  achievedMilestoneCard: {
    borderColor: '#D1FAE5',
    backgroundColor: '#FEFFFE',
  },

  // Milestone Content
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  milestoneCheck: {
    marginRight: 12,
    marginTop: 2,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    borderColor: 'transparent',
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  milestoneTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textDark,
    flex: 1,
    marginRight: 8,
  },
  achievedMilestoneTitle: {
    color: colors.textLight,
    textDecorationLine: 'line-through',
  },
  milestoneMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textLight,
    marginRight: 6,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  milestoneDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 8,
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  achievementText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },

  // Notes Section
  notesSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  notesText: {
    fontSize: 13,
    fontFamily: 'Inter-Italic',
    color: colors.textLight,
    lineHeight: 18,
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textLight,
    marginTop: 16,
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  clearButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalCancel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textLight,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.textDark,
  },
  modalSave: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalMilestone: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  modalMilestoneTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  modalMilestoneDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textLight,
    lineHeight: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textDark,
    marginBottom: 12,
  },
  datePicker: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
  },
  modalTextInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.textDark,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.textLight,
    textAlign: 'right',
    marginTop: 8,
  },
});