import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from '../Theme';

interface AppProps {
  isDark?: boolean;
  theme: any;
}

const App: React.FC<AppProps> = ({ theme, ...props }) => {
  return <ThemeProvider theme={theme !== 'light' ? darkTheme : lightTheme} {...props} />;
};

export default App;
