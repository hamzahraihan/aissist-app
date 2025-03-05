import { darkTheme, lightTheme } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export function useTheme(props: { light?: string; dark?: string }, colorName: keyof typeof lightTheme & keyof typeof darkTheme): any {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return theme === 'light' ? lightTheme[colorName] : darkTheme[colorName];
  }
}
