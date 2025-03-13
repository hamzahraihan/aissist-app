import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  onSelected?: boolean;
  type?: 'function' | 'developer' | 'assistant' | 'user' | 'system' | 'tool';
};

export function ThemedView({ style, lightColor, darkColor, onSelected, type = 'user', ...props }: ThemedViewProps) {
  let backgroundColor = useTheme({ light: lightColor, dark: darkColor }, 'backgroundColor');
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

  return (
    <View
      style={[
        {
          backgroundColor,
        },
        type === 'assistant' ? styles.assistant : styles.user,
        style,
      ]}
      {...props}
    />
  );
}
