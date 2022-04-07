"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _reactNative2 = require("@storybook/react-native");

require("./rn-addons");

// import stories
(0, _reactNative2.configure)(function () {
  require("./stories");
}, module); // Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI

var StorybookUIRoot = (0, _reactNative2.getStorybookUI)({}); // If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.

_reactNative.AppRegistry.registerComponent("%APP_NAME%", function () {
  return StorybookUIRoot;
});

var _default = StorybookUIRoot;
exports["default"] = _default;