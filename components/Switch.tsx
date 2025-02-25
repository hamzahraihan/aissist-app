import { Switch, SwitchProps, useColorScheme } from 'react-native';

export type CustomSwitchProps = SwitchProps & {
  isEnabled: boolean;
  lightColor?: string;
  darkColor?: string;
};

export function CustomSwitch({ style, lightColor, darkColor, ...props }: CustomSwitchProps) {
  const colorScheme = useColorScheme();

  return <Switch trackColor={{ true: '#767577', false: '#81b0ff' }} thumbColor={colorScheme == 'light' ? '#f4f3f4' : '#f5dd4b'} ios_backgroundColor="#3e3e3e" {...props} />;
}
