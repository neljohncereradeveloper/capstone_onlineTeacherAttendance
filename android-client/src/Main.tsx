import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useAppSelector } from './redux/store';
import LoginScreen from './screens/LoginScreen';

export default function Main() {
  const _isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {_isLoggedIn ? (
          <Navigation colorScheme={colorScheme} />
        ) : (
          <LoginScreen />
        )}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
