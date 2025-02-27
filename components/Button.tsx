import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export type CustomButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
};

export function CustomButton({ style, lightColor, darkColor, ...props }: CustomButtonProps) {
  const backgroundColor = useTheme({ light: lightColor, dark: darkColor }, 'cardColor');
  return <TouchableOpacity style={[{ backgroundColor }, style]} {...props} />;
}
