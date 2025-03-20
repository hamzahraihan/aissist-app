/* eslint-disable no-unused-expressions */
import { CustomSwitch } from '@/components/Switch';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCustomTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  const { themeMode, toggleTheme } = useCustomTheme();
  const isDarkMode = themeMode === 'dark';
  // const [theme, setTheme] = useState<{ mode: string | ColorSchemeName }>({ mode: Appearance.getColorScheme() });
  // const [loading, setLoading] = useState<boolean>(false);
  // const colorScheme = Appearance.getColorScheme();
  // console.log(colorScheme);

  // useEffect(() => {
  //   Appearance.addChangeListener(({ colorScheme }) => {
  //     setTheme({ mode: colorScheme });
  //   });
  // }, []);

  // const toggleSwitch = async () => {
  //   try {
  //     if (theme.mode === 'dark') {
  //       Appearance.setColorScheme('light');
  //     } else {
  //       Appearance.setColorScheme('dark');
  //     }
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // };

  // useEffect(() => {
  //   const loadTheme = async () => {
  //     try {
  //       await SplashScreen.preventAutoHideAsync();
  //       let storedTheme = null;
  //       if (Platform.OS !== 'web') {
  //         storedTheme = Appearance.getColorScheme();
  //       } else {
  //         storedTheme = localStorage.getItem('theme');
  //       }

  //       if (storedTheme) {
  //         setTheme({ mode: storedTheme });
  //         applyTheme(storedTheme);
  //       } else {
  //         applyTheme(Appearance.getColorScheme());
  //       }
  //     } catch (error) {
  //       console.error('Failed to load theme', error);
  //     } finally {
  //       setLoading(true);
  //       await SplashScreen.hideAsync();
  //     }
  //   };

  //   loadTheme();

  //   const appearanceListener = Appearance.addChangeListener(({ colorScheme }) => {
  //     setTheme({ mode: colorScheme });
  //     applyTheme(colorScheme);
  //   });

  //   return () => {
  //     appearanceListener.remove();
  //   };
  // }, [colorScheme]);

  // useEffect(() => {
  //   applyTheme(theme.mode);
  // }, [theme.mode]);

  // const applyTheme = (themeMode: any) => {
  //   if (Platform.OS === 'web') {
  //     document.documentElement.setAttribute('data-theme', themeMode);
  //   }
  // };

  // const toggleSwitch = async () => {
  //   const newTheme = theme.mode === 'dark' ? 'light' : 'dark';
  //   setTheme({ mode: newTheme });

  //   try {
  //     if (Platform.OS !== 'web') {
  //       Appearance.setColorScheme('dark');
  //     } else {
  //       localStorage.setItem('theme', newTheme);
  //     }
  //     applyTheme(newTheme);
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.flexRow, { margin: 10 }]}>
        <View style={[styles.flexRow, { gap: 10 }]}>
          <Ionicons name="brush" color={isDarkMode ? 'white' : 'black'} size={22} />
          <ThemedText>Dark mode</ThemedText>
        </View>
        <CustomSwitch onValueChange={toggleTheme} value={isDarkMode} isEnabled />
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
