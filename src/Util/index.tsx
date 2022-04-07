import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const isAndroid = Platform.OS === 'android';
const isIos = Platform.OS === 'ios';
const isSmallScreen = Dimensions.get('window')?.width <= 360;
const getTestIdProp = (id?: string): object | null =>
  id ? (isIos ? { testID: id } : { accessibilityLabel: id }) : null;
const isTablet = DeviceInfo.isTablet();

const convertToPercent = (value: number): string => {
  return `${value * 100}%`;
};

export { convertToPercent, getTestIdProp, isAndroid, isIos, isSmallScreen, isTablet };
