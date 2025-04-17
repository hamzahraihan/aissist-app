const colors = {
  white: '#fff',
  black: '#000',
  gray: 'rgb(26, 26, 26)',
  lightWhite: '#9e9e9e',
  blueTintColor: '#0281ff',
  lightPink: '#F7B5CD',
  whitesmoke: '#F7F7F8',
  lightBlack: '#161616',
};

const fonts = {
  thinFont: 'Poppins_100Thin',
  extraLightFont: 'Poppins_200ExtraLight',
  lightFont: 'Poppins_300Light',
  regularFont: 'Poppins_400Regular',
  mediumFont: 'Poppins_500Medium',
  semiBoldFont: 'Poppins_600SemiBold',
  boldFont: 'Poppins_700Bold',
  extraBold: 'Poppins_800ExtraBold',
  blackFont: 'Poppins_900Black',
  italicFont: 'Poppins_400Regular_Italic',
};

const lightTheme = {
  textColor: colors.black,
  secondaryTextColor: colors.white,
  mutedForegroundColor: colors.gray,
  backgroundColor: colors.white,
  placeholderTextColor: colors.lightWhite,
  secondaryBackgroundColor: colors.black,
  borderColor: 'rgba(0, 0, 0, .15)',
  tintColor: '#0281ff',
  tintTextColor: colors.white,
  tabBarActiveTintColor: colors.black,
  tabBarInactiveTintColor: colors.gray,
  cardColor: colors.whitesmoke,
};

const darkTheme = {
  textColor: colors.white,
  secondaryTextColor: colors.black,
  mutedForegroundColor: colors.lightWhite,
  backgroundColor: colors.black,
  placeholderTextColor: colors.lightWhite,
  secondaryBackgroundColor: colors.white,
  borderColor: 'rgba(255, 255, 255, .2)',
  tintColor: '#0281ff',
  tintTextColor: colors.white,
  tabBarActiveTintColor: colors.white,
  tabBarInactiveTintColor: colors.lightWhite,
  cardColor: colors.lightBlack,
};

export { colors, fonts, darkTheme, lightTheme };
