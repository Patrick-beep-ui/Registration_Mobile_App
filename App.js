import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTapNavigator from './navigations/BottomTap';
import DrawerNavigator from './navigations/Drawer';
import { AuthProvider } from './context/AuthContext';
import { SessionProvider } from './context/SessionContext';

export default function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </SessionProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
