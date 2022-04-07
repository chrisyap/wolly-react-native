import 'styled-components/native';
// import { DefaultTheme } from 'styled-components/native';

import { colors, darkThemeColors, lightThemeColors, ColorsProps } from './colors';
import { space, spacer } from './space';
import { shadows } from './shadows';

export const fontSizes = [
  '8px', // 0
  '9px', // 1
  '10px', // 2
  '11px', // 3
  '12px', // 4
  '13px', // 5
  '14px', // 6
  '16px', // 7
  '18px', // 8
  '20px', // 9
  '24px', // 10
  '26px', // 11
  '28px', // 12
  '32px', // 13
  '34px', // 14
  '41px', // 15
  '46px', // 16
  '52px', // 17
  '58px', // 18
  '66px', // 19
  '74px', // 20
  '83px', // 21
  '94px', // 22
  '105px', // 23
];

// export const regular = 400;
// export const bold = 700;

// styled-system's `fontWeight` function can hook into the `fontWeights` object
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const lineHeights = {
  standard: '22px',
  display: '20px',
};

// const letterSpacings = {
//   normal: 'normal',
//   caps: '0.025em',
// };

// export const textStyles = {
//   display8: {
//     fontSize: fontSizes[8] + 'px',
//     fontWeight: fontWeights.bold,
//     lineHeight: lineHeights.display,
//   },
//   display7: {
//     fontSize: fontSizes[7] + 'px',
//     fontWeight: fontWeights.bold,
//     lineHeight: lineHeights.display,
//   },
//   display6: {
//     fontSize: fontSizes[6] + 'px',
//     fontWeight: fontWeights.bold,
//     lineHeight: lineHeights.display,
//   },
//   display5: {
//     fontSize: fontSizes[5] + 'px',
//     fontWeight: fontWeights.bold,
//     lineHeight: lineHeights.display,
//   },
//   display4: {
//     fontSize: fontSizes[4] + 'px',
//     fontWeight: fontWeights.bold,
//     lineHeight: lineHeights.display,
//   },
//   display3: {
//     fontSize: fontSizes[3] + 'px',
//     fontWeight: fontWeights.bold,
//     lineHeight: lineHeights.display,
//   },
//   display2: {
//     fontSize: fontSizes[2] + 'px',
//     fontWeight: fontWeights.bold,
//     lineHeight: lineHeights.display,
//   },
//   display1: {
//     fontSize: fontSizes[1] + 'px',
//     fontWeight: fontWeights.bold,
//     lineHeight: lineHeights.display,
//   },
//   display0: {
//     fontSize: fontSizes[0] + 'px',
//     fontWeight: fontWeights.bold,
//     lineHeight: lineHeights.display,
//     letterSpacing: letterSpacings.caps,
//     textTransform: 'uppercase',
//   },
//   body2: {
//     fontSize: fontSizes[2] + 'px',
//     fontWeight: fontWeights.normal,
//     lineHeight: lineHeights.standard,
//   },
//   body1: {
//     fontSize: fontSizes[1] + 'px',
//     fontWeight: fontWeights.normal,
//     lineHeight: lineHeights.standard,
//   },
//   body0: {
//     fontSize: fontSizes[0] + 'px',
//     fontWeight: fontWeights.normal,
//     lineHeight: lineHeights.standard,
//   },
// };

// export const colorStyles = {
//   whiteOnText: {
//     color: colors.white,
//     backgroundColor: colors.text,
//   },
//   whiteOnGray: {
//     color: colors.white,
//     backgroundColor: colors.gray,
//   },
//   textOnLightGray: {
//     color: colors.text,
//     backgroundColor: colors.lightGray,
//   },
//   whiteOnBlue: {
//     color: colors.white,
//     backgroundColor: colors.blue,
//   },
//   blueOnLightBlue: {
//     color: colors.blue,
//     backgroundColor: colors.lightBlue,
//   },
//   whiteOnGreen: {
//     color: colors.white,
//     backgroundColor: colors.green,
//   },
//   greenOnLightGreen: {
//     color: colors.green,
//     backgroundColor: colors.lightGreen,
//   },
//   whiteOnRed: {
//     color: colors.white,
//     backgroundColor: colors.red,
//   },
//   redOnLightRed: {
//     color: colors.red,
//     backgroundColor: colors.lightRed,
//   },
//   textOnOrange: {
//     color: colors.text,
//     backgroundColor: colors.orange,
//   },
//   whiteOnPurple: {
//     color: colors.white,
//     backgroundColor: colors.purple,
//   },
//   purpleOnLightPurple: {
//     color: colors.purple,
//     backgroundColor: colors.lightPurple,
//   },
//   textOnWhite: {
//     color: colors.text,
//     backgroundColor: colors.white,
//   },
//   grayOnWhite: {
//     color: colors.gray,
//     backgroundColor: colors.white,
//   },
//   blueOnWhite: {
//     color: colors.blue,
//     backgroundColor: colors.white,
//   },
//   greenOnWhite: {
//     color: colors.green,
//     backgroundColor: colors.white,
//   },
//   redOnWhite: {
//     color: colors.red,
//     backgroundColor: colors.white,
//   },
//   purpleOnWhite: {
//     color: colors.purple,
//     backgroundColor: colors.white,
//   },
//   whiteOnDarkOrange: {
//     color: colors.white,
//     backgroundColor: colors.darkOrange,
//   },
// };

// colorStyles.info = colorStyles.textOnLightGray;
// colorStyles.success = colorStyles.whiteOnGreen;
// colorStyles.warning = colorStyles.textOnOrange;
// colorStyles.danger = colorStyles.whiteOnRed;

// styled-system's `borderRadius` function can hook into the `radii` object/array
export const radii = ['0px', '2px', '4px', '8px', '16px'];
export const radius = '2px';
export const radiusRounded = '290486px';

// animation duration
export const duration = {
  fast: `150ms`,
  normal: `300ms`,
  slow: `450ms`,
  slowest: `600ms`,
};

// animation easing curves
const easeInOut = 'cubic-bezier(0.5, 0, 0.25, 1)';
const easeOut = 'cubic-bezier(0, 0, 0.25, 1)';
const easeIn = 'cubic-bezier(0.5, 0, 1, 1)';

const timingFunctions = {
  easeInOut,
  easeOut,
  easeIn,
};

// animation delay
const transitionDelays = {
  small: `60ms`,
  medium: `160ms`,
  large: `260ms`,
  xLarge: `360ms`,
};

export interface ThemeProps {
  space: Array<string>;
  spacer: number;
  fontSizes: Array<string>;
  fontWeights: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeights: {
    standard: string;
    display: string;
  };
  colors: ColorsProps;
  radii: Array<string>;
  radius: string;
  radiusRounded: string;
  shadows: Array<string>;
  duration: { fast: string; normal: string; slow: string; slowest: string };
  timingFunctions: { easeInOut: string; easeOut: string; easeIn: string };
  transitionDelays: {
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  };
}

const theme = {
  space,
  spacer,
  // font,
  fontSizes,
  fontWeights,
  lineHeights,
  // letterSpacings,
  // regular,
  // bold,
  // textStyles,
  // colors,
  // colorStyles,
  radii,
  radius,
  radiusRounded,
  shadows,
  // maxContainerWidth,
  duration,
  timingFunctions,
  transitionDelays,
};

export default { ...theme, colors };

export const darkTheme = {
  ...theme,
  colors: darkThemeColors,
};

export const lightTheme = {
  ...theme,
  colors: lightThemeColors,
};

// console.log('dark', darkThemeColors, 'light', lightThemeColors);
