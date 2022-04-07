import React from 'react';
import Collapsible from 'react-native-collapsible';

interface ShowHideProps {
  isOpened: number;
  style?: object;
}

const ShowHide: React.FC<ShowHideProps> = ({ isOpened, ...props }) => {
  return <Collapsible collapsed={!isOpened} {...props} />;
};

export default ShowHide;
