import { shade, tint, readableColor, saturate } from 'polished';

const getShades = (color: string, steps: number, dark?: boolean): Array<string> => {
  let lights = [];
  const darks = [];
  let lightArrays = [];
  let darkArrays = [];
  for (let i = 1; i <= steps; i += 1) {
    const col = tint(i * (1 / (steps + 1)), color);
    lights.push(col);
  }
  for (let i = 1; i <= steps; i += 1) {
    const col = shade(i * (1 / (steps + 1)), color);
    darks.push(col);
  }
  lights = lights.reverse();
  lightArrays = [...lights, color].concat(darks);
  darkArrays = [...lightArrays].reverse();

  if (dark) {
    return darkArrays;
  }
  return lightArrays;
};

const reverseArray = (array: Array<string>): Array<string> => {
  const newArray = [...array].reverse();
  return newArray;
};

export interface ColorsProps {
  text: string;
  black: string;
  blacks: Array<string>;
  white: string;

  primary: string;
  primaries: Array<string>;
  primaryText: string;

  secondary: string;
  secondaries: Array<string>;
  secondaryAccent: string;
  secondaryAccentText: string;

  red: string;
  reds: Array<string>;

  bluegrey: string;
  bluegreys: Array<string>;

  sea: string;
  seas: Array<string>;

  blueberry: string;
  blueberries: Array<string>;

  sky: string;
  skies: Array<string>;

  lime: string;
  limes: Array<string>;

  tangerine: string;
  tangerines: Array<string>;

  success: string;
  successes: Array<string>;
  successText: string;

  info: string;
  infos: Array<string>;
  infoText: string;

  warning: string;
  warnings: Array<string>;
  warningText: string;

  danger: string;
  dangers: Array<string>;
  dangerText: string;

  texts: Array<string>;
  backgrounds: Array<string>;
  borders: Array<string>;

  modalBackdrop: string;
  isDarkTheme: boolean;
}

const primaryColors = {
  red: '#c20000',
  blueGrey: '#4c626c',
  black: '#000000',
};

const secondaryColors = {
  sea: '#152773',
  blueberry: '#572381',
  sky: '#005aa3',
  lime: '#a4b123',
  tangerine: '#e9600e',
};
const contextual = {
  success: '#037d04',
  info: '#005aa3',
  warning: '#F36E20',
  danger: '#d20000',
};

const secondaryDark = {
  secondary: saturate(0.1, tint(0.4, primaryColors.blueGrey)),
  secondaryAccent: saturate(0.15, primaryColors.blueGrey),
};

const contextualDark = {
  success: saturate(0.3, tint(0.2, contextual.success)),
  info: saturate(0.4, tint(0.38, contextual.info)),
  warning: saturate(0.3, tint(0.2, contextual.warning)),
  danger: saturate(0.3, tint(0.47, contextual.danger)),
};

const colors = {
  text: '#111111',

  black: primaryColors.black,
  blacks: getShades(primaryColors.black, 10),
  white: '#ffffff',

  primary: primaryColors.red,
  primaries: getShades(primaryColors.red, 10),
  primaryText: readableColor(primaryColors.red, '#000000', '#ffffff'),
  secondary: primaryColors.blueGrey,
  secondaries: getShades(primaryColors.blueGrey, 10),
  secondaryAccent: primaryColors.blueGrey,
  secondaryAccentText: readableColor(primaryColors.blueGrey, '#000000', '#ffffff'),

  red: primaryColors.red,
  reds: getShades(primaryColors.red, 10),

  bluegrey: primaryColors.blueGrey,
  bluegreys: getShades(primaryColors.blueGrey, 10),
  sea: secondaryColors.sea,
  seas: getShades(secondaryColors.sea, 10),

  blueberry: secondaryColors.blueberry,
  blueberries: getShades(secondaryColors.blueberry, 10),

  sky: secondaryColors.sky,
  skies: getShades(secondaryColors.sky, 10),

  lime: secondaryColors.lime,
  limes: getShades(secondaryColors.lime, 10),

  tangerine: secondaryColors.tangerine,
  tangerines: getShades(secondaryColors.tangerine, 10),

  success: contextual.success,
  successes: getShades(contextual.success, 10),
  successText: readableColor(contextual.success, '#000000', '#ffffff'),

  info: contextual.info,
  infos: getShades(contextual.info, 10),
  infoText: readableColor(contextual.info, '#000000', '#ffffff'),

  warning: contextual.warning,
  warnings: getShades(contextual.warning, 10),
  warningText: readableColor(contextual.warning, '#000000', '#ffffff'),

  danger: contextual.danger,
  dangers: getShades(contextual.danger, 10),
  dangerText: readableColor(contextual.danger, '#000000', '#ffffff'),
};

const lightThemeColors = {
  ...colors,
  texts: [colors.text, colors.secondary, colors.secondaries[5]],
  backgrounds: [colors.secondaries[1], colors.white, colors.blacks[4]],
  borders: [colors.secondaries[2], colors.blacks[3]],
  modalBackdrop: primaryColors.black,
  btnGroupBorder: primaryColors.blueGrey,
  rowOdd: tint(0.5, colors.secondaries[0]),
  isDarkTheme: false,
};

const colorsDark = {
  text: '#eeeeee',

  black: '#ffffff',
  blacks: reverseArray(getShades(colors.black, 10, true)),
  white: primaryColors.black,

  primary: primaryColors.red,
  primaries: reverseArray(colors.primaries),
  primaryText: readableColor(primaryColors.red, '#000000', '#ffffff'),
  secondary: secondaryDark.secondary,
  secondaries: getShades(secondaryDark.secondary, 10, true),

  secondaryAccent: secondaryDark.secondaryAccent,
  secondaryAccentText: readableColor(secondaryDark.secondaryAccent, '#000000', '#ffffff'),

  red: primaryColors.red,
  reds: reverseArray(colors.reds),

  bluegrey: primaryColors.blueGrey,
  bluegreys: reverseArray(colors.bluegreys),
  sea: secondaryColors.sea,
  seas: reverseArray(colors.seas),

  blueberry: secondaryColors.blueberry,
  blueberries: reverseArray(colors.blueberries),

  sky: secondaryColors.sky,
  skies: reverseArray(colors.skies),

  lime: secondaryColors.lime,
  limes: reverseArray(colors.limes),

  tangerine: secondaryColors.tangerine,
  tangerines: reverseArray(colors.tangerines),

  success: contextualDark.success,
  successes: getShades(contextualDark.success, 10, true),
  successText: readableColor(contextualDark.success, '#000000', '#ffffff'),

  info: contextualDark.info,
  infos: getShades(contextualDark.info, 10, true),
  infoText: readableColor(contextualDark.info, '#000000', '#ffffff'),

  warning: contextualDark.warning,
  warnings: getShades(contextualDark.warning, 10, true),
  warningText: readableColor(contextualDark.warning, '#000000', '#ffffff'),

  danger: contextualDark.danger,
  dangers: getShades(contextualDark.danger, 10, true),
  dangerText: readableColor(contextualDark.danger, '#000000', '#ffffff'),

  texts: [colors.white, colors.secondaries[4], colors.secondaries[8]],
  backgrounds: [colors.secondaries[8], colors.black],
  borders: [colors.secondaries[6], colors.blacks[7]],
};

const darkThemeColors = {
  ...colorsDark,
  modalBackdrop: secondaryDark.secondaryAccent,
  btnGroupBorder: secondaryDark.secondaryAccent,
  rowOdd: colorsDark.secondaries[1],
  isDarkTheme: true,
};

const updateBackground = (): void => {
  colorsDark.secondaries.splice(
    0,
    1,
    tint(
      0.02,
      colorsDark.secondaries[0]
      // 'pink'
    )
  );
};

updateBackground();

export { colors, darkThemeColors, lightThemeColors };

// console.log('dark', JSON.stringify(darkThemeColors, null, 4));
