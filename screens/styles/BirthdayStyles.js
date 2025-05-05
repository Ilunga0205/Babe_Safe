import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    width: '100%', 
  },
  topImage: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textGray,
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  dateSelector: {
    width: '100%',
    height: 56,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateText: {
    fontSize: 16,
    color: colors.textDark,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginBottom: 16,
    alignSelf: 'flex-start',
    paddingLeft: 5,
  },
  resetButton: {
    backgroundColor: '#f2d2bf',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#623131',
    fontSize: 16,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signInText: {
    color: colors.textGray,
    fontSize: 15,
  },
  signInLink: {
    color: '#623131',
    fontSize: 15,
    fontWeight: '600',
  },
  successContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#623131',
    marginBottom: 15,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  
});