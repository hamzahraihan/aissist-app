import { useTheme } from '@/context/useTheme';
import { TextInput, TextInputProps } from 'react-native';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function CustomTextInput({ style, lightColor, darkColor, ...props }: ThemedTextInputProps) {
  const borderColor = useTheme({ light: lightColor, dark: darkColor }, 'borderColor');

  const textColor = useTheme({ light: lightColor, dark: darkColor }, 'textColor');

  return <TextInput style={[{ color: textColor, borderColor }, style]} placeholderTextColor={textColor} {...props} />;
}
