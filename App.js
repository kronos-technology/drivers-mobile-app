import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import loadingScreen from "./components/loadingScreen";
import homeScreen from './screens/home/homeScreen';
import splashScreen from './screens/splashScreen';
import loginScreen from './screens/auth/loginScreen';
import registerScreen from './screens/auth/registerScreen';
import verificationScreen from './screens/auth/verificationScreen';
import startTripScreen from './screens/startTrip/startTripScreen';
import endTripScreen from './screens/endTrip/endTripScreen';
import editProfileScreen from './screens/editProfile/editProfileScreen';
import busIssuesScreen from './screens/busIssues/busIssuesScreen';
import walletScreen from './screens/wallet/walletScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Loading" component={loadingScreen} />
        <Stack.Screen name="Splash" component={splashScreen} />
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Register" component={registerScreen} />
        <Stack.Screen name="Verification" component={verificationScreen} />
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="StartTrip" component={startTripScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="EndTrip" component={endTripScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name="EditProfile" component={editProfileScreen} />
        <Stack.Screen name="BusIssues" component={busIssuesScreen} />
        <Stack.Screen name="Wallet" component={walletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;