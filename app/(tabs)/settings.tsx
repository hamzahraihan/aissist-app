/* eslint-disable no-unused-expressions */
import { CustomSwitch } from '@/components/Switch';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Appearance, StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  const [theme, setTheme] = useState({ mode: Appearance.getColorScheme() });
  const colorScheme = Appearance.getColorScheme();
  console.log(colorScheme);

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setTheme({ mode: colorScheme });
    });
  }, []);

  const toggleSwitch = async () => {
    try {
      if (theme.mode === 'dark') {
        Appearance.setColorScheme('light');
      } else {
        Appearance.setColorScheme('dark');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.flexRow, { margin: 10 }]}>
        <View style={[styles.flexRow, { gap: 10 }]}>
          <Ionicons name="brush" color={colorScheme === 'light' ? 'black' : 'white'} size={22} />
          <ThemedText>Dark mode</ThemedText>
        </View>
        <CustomSwitch onValueChange={toggleSwitch} value={colorScheme === 'dark'} isEnabled />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
