import { darkTheme, lightTheme } from '@/constants/theme';
import { useCustomTheme } from '@/context/ThemeContext';

export function useTheme(props: { light?: string; dark?: string }, colorName: keyof typeof lightTheme & keyof typeof darkTheme): any {
  const { themeMode } = useCustomTheme();
  const colorFromProps = props[themeMode];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return themeMode === 'light' ? lightTheme[colorName] : darkTheme[colorName];
  }
}
