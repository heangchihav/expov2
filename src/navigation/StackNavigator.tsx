import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@/contexts/ThemeContext';
import HomeScreen from '@/screens/HomeScreen';
import ContactScreen from '@/screens/ContactScreen';
import PromotionScreen from '@/screens/PromotionScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        },
        headerTintColor: isDark ? '#ffffff' : '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName="Home"
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home'
        }}
      />
      <Stack.Screen 
        name="Contact" 
        component={ContactScreen}
        options={{
          title: 'Contact'
        }}
      />
      <Stack.Screen 
        name="Promotion" 
        component={PromotionScreen}
        options={{
          title: 'Promotions'
        }}
      />
    </Stack.Navigator>
  );
}
