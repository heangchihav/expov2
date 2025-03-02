import { Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGE_STORAGE_KEY, type Language } from '@/contexts/LanguageContext';
import { ActivityIndicator, View } from 'react-native';

export default function Root() {
  const router = useRouter();
  const [storedLanguage, setStoredLanguage] = useState<Language | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getStoredLanguage() {
      try {
        const lang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
        setStoredLanguage(lang || 'fr'); // Default to French if no language stored
      } catch (error) {
        setStoredLanguage('fr'); // Default to French on error
      } finally {
        setIsLoading(false);
      }
    }
    getStoredLanguage();
  }, []);

  useEffect(() => {
    if (!isLoading && storedLanguage) {
      router.replace({
        pathname: '/[lang]/home',
        params: { lang: storedLanguage }
      });
    }
  }, [isLoading, storedLanguage, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
