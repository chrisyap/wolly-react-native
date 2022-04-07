import * as React from 'react';
import { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
// import configureMockStore from 'redux-mock-store';
// import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// Make available in all test files without importing
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.renderer = renderer;

jest.mock('../../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-device-info', () => mockRNDeviceInfo);
