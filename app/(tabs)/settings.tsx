import { CustomSwitch } from '@/components/Switch';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Appearance, StyleSheet, useColorScheme, View } from 'react-native';

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (isEnabled) {
      Appearance.setColorScheme('light');
    } else {
      Appearance.setColorScheme('dark');
    }
  }, [isEnabled]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.flexRow, { margin: 10 }]}>
        <View style={[styles.flexRow, { gap: 10 }]}>
          <Ionicons name="brush" color={colorScheme === 'light' ? 'black' : 'white'} size={22} />
          <ThemedText>Dark mode</ThemedText>
        </View>
        <CustomSwitch onValueChange={toggleSwitch} value={!isEnabled} isEnabled />
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
