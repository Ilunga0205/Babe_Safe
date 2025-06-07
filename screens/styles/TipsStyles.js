import { StyleSheet, Dimensions, Platform } from 'react-native';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    width: '100%',
    overflow: 'hidden',
    zIndex: 10,
  },
  headerGradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 30,
    paddingHorizontal: 20,
  },
  headerContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  paddingBottom: 10,
  flex: 1,
},
  headerTitleContainer: {
  flexDirection: 'column', // Changed from 'row' to 'column'
  alignItems: 'flex-start', // Changed from 'center' to 'flex-start'
  flexShrink: 1,
  flex: 1, // Add this to take available space
},
headerTitleRow: { // Add this new style
  flexDirection: 'row',
  alignItems: 'center',
},
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginLeft: 8,
  },
  babyInfoContainer: {
  marginLeft: 28, // Align with the title text (icon width + marginLeft)
  alignSelf: 'flex-start',
},
  babyInfoText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
    opacity: 0.9,
  },
  
  // Header Community Button
  headerCommunityButton: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    // marginLeft: 10, // Remove this if it causes misalignment
    alignSelf: 'flex-end', // Ensures it aligns to the end of its container
  },
  headerCommunityText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 5,
  },
  
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 15,
    paddingBottom: 30,
  },
  
  // Help tip container
  helpTipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 210, 191, 0.3)', // Lighter version of secondary color
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  helpTipIconContainer: {
    marginRight: 10,
  },
  helpTipText: {
    flex: 1,
    fontSize: 12,
    color: colors.textDark,
  },
  
  // Expert disclaimer styles
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  disclaimerIconContainer: {
    backgroundColor: 'rgba(98, 49, 49, 0.08)',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: colors.textDark,
    lineHeight: 16,
  },
  
  // Section container styles
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  categoriesSubtitle: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 13,
    color: colors.primary,
    marginRight: 4,
    fontWeight: '600',
  },
  
  // Category styles with lock indication
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.03)',
    width: 105,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategoryItem: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryIconContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    position: 'relative', // For positioning the lock icon
  },
  lockIconContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#888',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 2,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: colors.white,
  },
  categoryAgeRange: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'center',
  },
  selectedCategoryAgeRange: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  // Tips styles
  tipsList: {
    paddingLeft: 16,
    paddingRight: 6,
  },
  tipCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    width: width * 0.75,
    maxWidth: 300,
    marginRight: 14,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.84,
    elevation: 3,
  },
  tipImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tipTypeBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipTypeBadgeText: {
    color: colors.white,
    fontSize: 10,
    marginLeft: 4,
    fontWeight: '500',
  },
  ageBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  ageBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '500',
  },
  tipContent: {
    padding: 14,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
    marginBottom: 10,
  },
  expertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expertText: {
    fontSize: 11,
    color: colors.textLight,
    marginLeft: 5,
    flex: 1,
  },
  
  // Recent tips styles
  recentTipsList: {
    paddingLeft: 16,
    paddingRight: 6,
  },
  recentTipCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    width: 160,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 2,
  },
  recentTipImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  recentTipTypeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentTipContent: {
    padding: 12,
  },
  recentTipTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 5,
    height: 36,
  },
  recentExpertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentExpertText: {
    fontSize: 10,
    color: colors.textLight,
    marginLeft: 4,
    flex: 1,
  },
  
  // Educational banner styles
  educationalBannerContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  educationalBanner: {
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  educationalBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  educationalBannerIconContainer: {
    backgroundColor: 'rgba(75, 123, 236, 0.1)',
    padding: 10,
    borderRadius: 12,
    marginRight: 14,
  },
  educationalBannerTextContainer: {
    flex: 1,
  },
  educationalBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4b7bec',
    marginBottom: 4,
  },
  educationalBannerDescription: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
});

export default styles;