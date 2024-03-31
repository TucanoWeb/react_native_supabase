import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../screens/HomePage';
import WelcomePage from '../screens/WelcomePage';
import LoginPage from '../screens/LoginPage';
import RegisterPage from '../screens/RegisterPage';
import ProfilePage from '../screens/ProfilePage';
import EditProfilePage from '../screens/EditProfilePage';
import SearchPage from '../screens/SearchPage';
import FavoritesPage from '../screens/FavoritesPage';
import UserHomePage from '../screens/UserHomePage';
import SchoolPage from '../screens/SchoolPage';
import { userContext } from '../context/userContext';

const Stack = createNativeStackNavigator()

export default function AppNavigation() {

  const user = useContext(userContext)

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomePage} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} component={EditProfilePage} />
          <Stack.Screen name="Favorites" options={{ headerShown: false }} component={FavoritesPage} />
          <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchPage} />
          <Stack.Screen name="UserHome" options={{ headerShown: false }} component={UserHomePage} />
          <Stack.Screen name="School" options={{ headerShown: false }} component={SchoolPage} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomePage} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginPage} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}