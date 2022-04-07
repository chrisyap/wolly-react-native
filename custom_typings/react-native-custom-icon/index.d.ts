declare module 'react-native-custom-icon' {
  interface MyIconProps {
    name: string;
    color?: string;
    size?: number;
    config: object;
  }
  // export function MyIcon(
  //   props: import('react').PropsWithChildren<MyIconProps>
  // ): import('react').ReactElement;

  export default class MyIcon extends React.Component<MyIconProps> {}
}
