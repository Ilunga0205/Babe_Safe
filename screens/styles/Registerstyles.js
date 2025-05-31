import { StyleSheet, Platform, StatusBar } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 15, // Reduced bottom padding
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 0, // Removed top padding
  },
  topImage: {
    width: 80, // Reduced image size
    height: 80, // Reduced image size
    alignSelf: 'center',
    marginBottom: 10, // Reduced margin
  },
  welcomeText: {
    fontSize: 24, // Reduced font size
    fontWeight: '700',
    color: '#623131',
    textAlign: 'center',
    marginBottom: 4, // Reduced margin
  },
  subtitle: {
    fontSize: 14, // Reduced font size
    color: colors.textGray,
    textAlign: 'center',
    marginBottom: 15, // Reduced margin
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15, // Reduced margin
    marginBottom: 15, // Reduced margin
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    paddingHorizontal: 10,
    color: colors.textGray,
    fontSize: 13, // Reduced font size
  },
  // Add compact styling for input fields
  inputContainer: {
    marginBottom: 10, // Reduced margin between inputs
  },
  // Add compact styling for buttons
  buttonContainer: {
    marginTop: 10, // Reduced margin before button
  },
});

export default styles;