declare module 'react-native-vector-icons' {
  import { Icon } from './Icon';
  export function createIconSetFromIcoMoon(config: {}, fontName?: string, fontFile?: string): typeof Icon;
}
