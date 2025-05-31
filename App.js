import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

// Screens
import Welcome from './screens/Welcome';
import Register from './screens/Register'; 
import Policies from './screens/Policies'
import SignIn from './screens/SignIn';
import ForgotPassword from './screens/ForgotPassword';
import Birthday from './screens/Birthday'
import Home from './screens/Home';
import Vaccination from './screens/Vaccination'
import Growth from './screens/Growth';
import UserProfile from './screens/UserProfile'
import BabyTimelineDetails from './screens/BabyTimelineDetails';
import EntryDetailScreen from './screens/EntryDetailScreen';
import Community from './screens/Community';
import Notifications from './screens/Notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false ,gestureEnabled: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
      
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Birthday" component={Birthday}/>

        <Stack.Screen name="Policies" component={Policies} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="UserProfile" component={UserProfile}/>

        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Vaccination" component={Vaccination}/>
        <Stack.Screen name="Growth" component={Growth}/>
        <Stack.Screen name="EntryDetailScreen" component={EntryDetailScreen}/>

        <Stack.Screen name="Community" component={Community}/>
        <Stack.Screen name="Notifications" component={Notifications}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
