import { fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';
import { StyleSheet, Text, TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({ style, lightColor, darkColor, type = 'default', ...props }: ThemedTextProps) {
  const color = useTheme({ light: lightColor, dark: darkColor }, 'textColor');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontFamily: fonts.regularFont,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontFamily: fonts.semiBoldFont,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.regularFont,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: fonts.regularFont,
  },
  link: {
    fontSize: 16,
    fontFamily: fonts.regularFont,
    color: '#0a7ea4',
  },
});
