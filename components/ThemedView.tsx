import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'developer' | 'assistant' | 'user';
};

export function ThemedView({ style, lightColor, darkColor, type = 'user', ...props }: ThemedViewProps) {
  const backgroundColor = useTheme({ light: lightColor, dark: darkColor }, 'backgroundColor');
  const assistantBackground = useTheme({ light: lightColor, dark: darkColor }, 'cardColor');
  const userBackground = useTheme({ light: lightColor, dark: darkColor }, 'backgroundColor');

  const styles = StyleSheet.create({
    assistant: {
      backgroundColor: assistantBackground,
    },
    user: {
      backgroundColor: userBackground,
    },
  });

  return <View style={[{ backgroundColor }, type === 'assistant' ? styles.assistant : styles.user, style]} {...props} />;
}
