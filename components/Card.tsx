import { useTheme } from '@/context/useTheme';
import { View, type ViewProps } from 'react-native';

export type CardProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Card({ style, lightColor, darkColor, ...props }: CardProps) {
  const backgroundColor = useTheme({ light: lightColor, dark: darkColor }, 'cardColor');

  return <View style={[{ backgroundColor, borderRadius: 20 }, style]} {...props} />;
}
