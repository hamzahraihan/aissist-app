import { fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';
import { Pressable, StyleSheet, View, Clipboard, Text } from 'react-native';
import Markdown, { MarkdownIt, MarkdownProps, RenderRules } from 'react-native-markdown-display';
import { useCustomTheme } from '@/context/ThemeContext';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { MaterialIcons } from '@expo/vector-icons';

export type AIResponseProps = MarkdownProps & {
  lightColor?: string;
  darkColor?: string;
  children: any;
};

export function AIResponse({ style, lightColor, darkColor, ...props }: AIResponseProps) {
  const color = useTheme({ light: lightColor, dark: darkColor }, 'textColor');
  const secondaryBackgroundColor = useTheme({ light: lightColor, dark: darkColor }, 'secondaryBackgroundColor');

  const { themeMode } = useCustomTheme();

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

  const renderRules: Partial<RenderRules> = {
    fence: (node: any, children, parent, styles) => {
      console.log(node);
      const language = node.sourceInfo?.trimStart() || 'javascript';
      console.log(language);
      const code = node.content || '';

      return (
        <View key={node.key} style={styles.fence}>
          <SyntaxHighlighter language={language} style={themeMode === 'dark' ? atomOneDark : atomOneLight}>
            {code}
          </SyntaxHighlighter>
          {language && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <Text style={styles.fence_language_label}>{language}</Text>
              <Pressable android_ripple={{ color: '#77777761', radius: 18, borderless: true, foreground: true }} onPress={() => copyToClipboard(node.content)}>
                <MaterialIcons name="content-copy" color="#fefefe" size={16} />
              </Pressable>
            </View>
          )}
        </View>
      );
    },
  };

  // Create a merged style object - this is the key fix
  const markdownStyles = StyleSheet.create({
    // Base styles
    body: {
      color,
      fontFamily: fonts.regularFont,
      lineHeight: 22, // Improved readability
    },

    // Paragraph styling
    paragraph: {
      fontSize: 16,
      fontFamily: fonts.regularFont,
      marginVertical: 8, // Better spacing between paragraphs
      lineHeight: 24,
    },

    // Inline code styling
    code_inline: {
      color: '#E83E8C', // Vibrant pink for inline code (or use your secondaryTextColor)
      backgroundColor: 'rgba(0, 0, 0, 0.05)', // Subtle background
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.15)',
      fontFamily: fonts.lightFont,
      padding: 4,
      paddingHorizontal: 6,
      borderRadius: 4,
      fontSize: 15, // Slightly smaller than paragraph text
    },

    // Code block styling
    fence: {
      marginVertical: 12,
      marginHorizontal: 0,
      padding: 0, // No padding as SyntaxHighlighter has its own padding
      backgroundColor: 'rgba(20, 20, 20, 0.95)', // Darker background for code blocks
      borderColor: 'rgba(255, 255, 255, 0.15)',
      borderWidth: 1,
      borderRadius: 6,
    },

    // Language label for code blocks
    fence_language_label: {
      color: 'white',
      fontSize: 12,
      fontFamily: fonts.mediumFont,
      borderRadius: 6,
    },

    // Code block with language label
    code_block: {
      backgroundColor: secondaryBackgroundColor,
      padding: 0,
      margin: 0,
      borderRadius: 6,
      overflow: 'hidden',
    },

    // Headings with better visual hierarchy
    heading1: {
      fontFamily: fonts.boldFont || fonts.semiBoldFont,
      fontSize: 26,
      marginTop: 24,
      marginBottom: 12,
      color: color, // Same as body text or slightly emphasized
      lineHeight: 32,
    },

    heading2: {
      fontFamily: fonts.semiBoldFont,
      fontSize: 22,
      marginTop: 22,
      marginBottom: 10,
      color: color,
      lineHeight: 28,
    },

    heading3: {
      fontFamily: fonts.semiBoldFont,
      fontSize: 18,
      marginTop: 20,
      marginBottom: 8,
      color: color,
      lineHeight: 24,
    },

    heading4: {
      fontFamily: fonts.mediumFont,
      fontSize: 16,
      marginTop: 16,
      marginBottom: 8,
      color: color,
      lineHeight: 22,
    },

    heading5: {
      fontFamily: fonts.mediumFont,
      fontSize: 15,
      marginTop: 14,
      marginBottom: 6,
      color: color,
    },

    heading6: {
      fontFamily: fonts.mediumFont,
      fontSize: 14,
      marginTop: 12,
      marginBottom: 6,
      color: color,
    },

    // List styling
    bullet_list: {
      marginVertical: 8,
    },

    ordered_list: {
      marginVertical: 8,
    },

    // List items with better spacing
    list_item: {
      marginVertical: 4,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },

    // List markers
    bullet_list_icon: {
      fontSize: 16,
      lineHeight: 24,
      marginRight: 8,
      fontFamily: fonts.regularFont,
      color: color, // Same as text color
    },

    ordered_list_icon: {
      fontSize: 14,
      lineHeight: 24,
      marginRight: 8,
      fontFamily: fonts.mediumFont,
      color: color, // Same as text color
    },

    // Horizontal rule styling
    hr: {
      backgroundColor: 'rgba(255, 255, 255, .15)',
      height: 1,
      marginVertical: 20,
    },

    // Table styling
    table: {
      marginVertical: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, .25)',
      borderRadius: 6,
      overflow: 'hidden',
    },

    thead: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle header background
      borderBottomWidth: 2,
      borderColor: 'rgba(255, 255, 255, .25)',
    },

    th: {
      padding: 12,
      fontFamily: fonts.semiBoldFont,
    },

    tr: {
      borderBottomWidth: 1,
      borderColor: 'rgba(255, 255, 255, .15)',
      flexDirection: 'row',
    },

    td: {
      padding: 10,
      paddingVertical: 12,
    },

    // Blockquote styling
    blockquote: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderLeftWidth: 4,
      borderLeftColor: '#6C8EEF', // Distinctive color for quotes
      marginVertical: 12,
      marginHorizontal: 0,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 0,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },

    // Link styling
    link: {
      color: '#6C8EEF', // Bright blue for links
      textDecorationLine: 'none',
      fontFamily: fonts.mediumFont,
    },

    // Image styling
    image: {
      marginVertical: 12,
      alignSelf: 'center',
      maxWidth: '100%',
      borderRadius: 6,
    },

    // Strong text styling
    strong: {
      fontFamily: fonts.boldFont || fonts.semiBoldFont,
      fontWeight: 'bold',
    },

    // Italic text styling
    em: {
      fontFamily: fonts.italicFont || fonts.regularFont,
      fontStyle: 'italic',
    },

    // Strikethrough text
    s: {
      textDecorationLine: 'line-through',
    },
  });

  return <Markdown style={markdownStyles} rules={renderRules} {...props} markdownit={MarkdownIt({ typographer: true })} />;
}
