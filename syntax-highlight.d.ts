declare module 'react-native-syntax-highlighter' {
  import { ComponentType } from 'react';
  const SyntaxHighlighter: ComponentType<any>;
  export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/cjs/styles/hljs' {
  const styles: { [key: string]: any };
  export const atomOneDark: any;
  export const atomOneLight: any;
  export default styles;
}
