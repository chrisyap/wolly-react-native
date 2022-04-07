import styled from 'styled-components/native';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system';

export interface ImgProp extends BorderProps, ColorProps, LayoutProps, PositionProps, SpaceProps {}

const Img = styled.Image<ImgProp>`
  ${border};
  ${color};
  ${layout};
  ${position};
  ${space};
`;

export default Img;
