import React, { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcherButton';

export default function LanguageLayout() {
  const { theme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const isLargeScreen = useIsLargeScreen();
  const isDarkMode = theme === 'dark';
  const { lang } = useLocalSearchParams<{ lang: string }>();

  // Update language when route param changes
  useEffect(() => {
    if (lang) {
      setLanguage(lang as 'en' | 'fr');
    }
  }, [lang, setLanguage]);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : '#ffffff' }}>
      <View style={{
        position: 'absolute',
        top: 50,
        right: 16,
        zIndex: 1000,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
      }}>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#1a1a1a' : 'white',
            borderTopColor: isDarkMode ? '#333' : '#e5e5e5',
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: isDarkMode ? '#888' : '#666',
        }}
      >
        <Tabs.Screen
          name="home"
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
    </GestureHandlerRootView>
  );
}
