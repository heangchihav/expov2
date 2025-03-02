import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import HomeScreen from '@/screens/HomeScreen';
import ContactScreen from '@/screens/ContactScreen';
import PromotionScreen from '@/screens/PromotionScreen';

export default function TabsNavigator() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1a1a1a' : 'white',
          borderTopColor: isDark ? '#333' : '#e5e5e5',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDark ? '#888' : '#666',
      }}
    >
      <Tabs.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: language === 'fr' ? 'Accueil' : 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        component={ContactScreen}
        options={{
          title: language === 'fr' ? 'Contact' : 'Contact',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'mail' : 'mail-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="promotion"
        component={PromotionScreen}
        options={{
          title: language === 'fr' ? 'Promotions' : 'Promotions',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'pricetag' : 'pricetag-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
