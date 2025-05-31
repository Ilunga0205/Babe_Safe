import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

// Colors constants - importing from your constants file
const colors = {
  primary: '#623131', // Rich burgundy
  secondary: '#f2d2bf', // Soft peach
  white: '#FFFFFF',
  black: '#333333',
  textDark: '#333333',
  textLight: '#777777',
  background: '#F8F9FA',
  cardBg: '#FFFFFF',
  gradientStart: '#623131', // Burgundy
  gradientEnd: '#905858', // Lighter burgundy for gradient
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  
  // Header Styles
  headerContainer: {
    width: '100%',
    overflow: 'hidden',
    zIndex: 10,
  },
  headerGradient: {
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginLeft: 8,
    fontFamily: 'Shrikhand',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  createPostButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  welcomeContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  // Main Content Styles
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  
  // Search Bar Styles
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInputContainerFocused: {
    borderColor: colors.primary,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textDark,
    marginLeft: 8,
    paddingVertical: 2,
  },
  
  // Guidelines Banner Styles
  guidelinesBanner: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  guidelinesBannerGradient: {
    borderRadius: 12,
  },
  guidelinesBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  guidelinesBannerIconContainer: {
    backgroundColor: 'rgba(75, 123, 236, 0.1)',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  guidelinesBannerTextContainer: {
    flex: 1,
  },
  guidelinesBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4b7bec',
    marginBottom: 2,
  },
  guidelinesBannerDescription: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  
  // Section Styles
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
  
  // Topics Styles
  topicsList: {
    paddingHorizontal: 16,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  selectedTopicItem: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  topicIconContainer: {
    backgroundColor: 'rgba(98, 49, 49, 0.1)',
    padding: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  selectedTopicIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  topicText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
  },
  selectedTopicText: {
    color: colors.white,
  },
  
  // Featured Discussions Styles
  discussionsList: {
    paddingHorizontal: 16,
  },
  featuredDiscussionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginRight: 14,
    width: width * 0.75,
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  featuredDiscussionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  authorInfo: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
    marginRight: 4,
  },
  verifiedBadge: {
    backgroundColor: colors.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorRole: {
    fontSize: 11,
    color: colors.textLight,
  },
  timeAgo: {
    fontSize: 11,
    color: colors.textLight,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 10,
    lineHeight: 22,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: 'rgba(98, 49, 49, 0.08)',
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '500',
  },
  discussionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  
  // Recent Discussions Styles
  recentDiscussionsContainer: {
    paddingHorizontal: 16,
  },
  recentDiscussionWrapper: {
    marginBottom: 12,
  },
  recentDiscussionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentDiscussionContent: {
    flexDirection: 'column',
  },
  recentAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentAuthorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  recentAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  recentAuthorName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDark,
  },
  recentTimeAgo: {
    fontSize: 11,
    color: colors.textLight,
  },
  recentDiscussionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 8,
    lineHeight: 20,
  },
  recentTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  recentTag: {
    backgroundColor: 'rgba(98, 49, 49, 0.08)',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginRight: 6,
    marginBottom: 6,
  },
  recentTagText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '500',
  },
  recentDiscussionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  recentStatText: {
    fontSize: 11,
    color: colors.textLight,
    marginLeft: 4,
  },
  
  // Floating Action Button
  floatingActionButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    overflow: 'hidden',
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // T&C Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  tcModalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    maxHeight: '90%',
  },
  tcModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tcModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginLeft: 10,
    flex: 1,
  },
  closeModalButton: {
    padding: 4,
  },
  tcScrollView: {
    paddingHorizontal: 20,
    maxHeight: 400,
  },
  tcSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: 14,
    marginBottom: 8,
  },
  tcText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textLight,
    marginBottom: 10,
  },
  tcDisclaimer: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.textLight,
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 18,
  },
  tcModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  declineButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    minWidth: 120,
    alignItems: 'center',
  },
  declineButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  acceptButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  
  // Create Post Modal Styles
  createPostModalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: '90%',
  },
  createPostModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  createPostModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  createPostForm: {
    paddingHorizontal: 20,
  },
  createPostLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  createPostTitleInput: {
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  createPostContentInput: {
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 16,
    height: 120,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  createPostTopicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  createPostTopicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 49, 49, 0.08)',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  createPostTopicText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 6,
  },
  createPostUploadContainer: {
    marginBottom: 16,
  },
  createPostUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(98, 49, 49, 0.08)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(98, 49, 49, 0.2)',
    borderStyle: 'dashed',
  },
  createPostUploadText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  createPostDisclaimer: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  submitPostButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  submitPostButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

export default styles;