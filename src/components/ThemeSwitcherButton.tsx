import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeType, useTheme, VALID_THEMES } from '../contexts/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, currentTheme, setTheme } = useTheme();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const getThemeIcon = (themeType: ThemeType) => {
    switch (themeType) {
      case 'light':
        return <Ionicons name="sunny" size={16} color="#FFA500" />;
      case 'dark':
        return <Ionicons name="moon" size={16} color="#FFD700" />;
      case 'system':
        return <Ionicons name="phone-portrait" size={16} color="#808080" />;
    }
  };

  const getThemeLabel = (themeType: ThemeType) => {
    switch (themeType) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
    }
  };

  const handleThemeChange = useCallback((newTheme: ThemeType) => {
    setTheme(newTheme);
    setDropdownVisible(false);
  }, [setTheme]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        {getThemeIcon(theme)}
        <Text style={styles.buttonText}>{getThemeLabel(theme)}</Text>
        <Ionicons
          name={dropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#000"
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          {VALID_THEMES.map((themeOption) => (
            <TouchableOpacity
              key={themeOption}
              style={[
                styles.dropdownItem,
                theme === themeOption && styles.activeItem,
              ]}
              onPress={() => handleThemeChange(themeOption)}
            >
              {getThemeIcon(themeOption)}
              <Text
                style={[
                  styles.dropdownText,
                  theme === themeOption && styles.activeText,
                ]}
              >
                {getThemeLabel(themeOption)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 4,
    minWidth: '100%',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  activeItem: {
    backgroundColor: '#f0f0f0',
  },
  dropdownText: {
    fontSize: 14,
  },
  activeText: {
    fontWeight: '500',
  },
});
