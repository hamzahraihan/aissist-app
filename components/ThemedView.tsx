import { useTheme } from '@/hooks/useTheme';
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...props }: ThemedViewProps) {
  const backgroundColor = useTheme({ light: lightColor, dark: darkColor }, 'backgroundColor');

  return <View style={[{ backgroundColor }, style]} {...props} />;
}
