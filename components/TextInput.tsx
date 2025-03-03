import { useTheme } from '@/hooks/useTheme';
import { TextInput, TextInputProps } from 'react-native';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function CustomTextInput({ style, lightColor, darkColor, ...props }: ThemedTextInputProps) {
  const borderColor = useTheme({ light: lightColor, dark: darkColor }, 'borderColor');
  const color = useTheme({ light: lightColor, dark: darkColor }, 'textColor');

  const placeholderTextColor = useTheme({ light: lightColor, dark: darkColor }, 'placeholderTextColor');

  return <TextInput style={[{ color, borderColor }, style]} placeholderTextColor={placeholderTextColor} {...props} />;
}
