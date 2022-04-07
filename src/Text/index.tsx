import styled from 'styled-components/native';
import { composed, ComposedProps } from '../Common/Composed';
import theme from '../Theme';
import { isTablet } from '../Util';

export interface TxtProps extends ComposedProps {
  light?: boolean;
  semibold?: boolean;
  bold?: boolean;
  style?: object;
  uppercase?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  underlineLineThrough?: boolean;
}

const Txt = styled.Text<TxtProps>`
  font-family: ${(props) =>
    props.light
      ? 'SourceSansPro-Light'
      : props.semibold
      ? 'SourceSansPro-Semibold'
      : props.bold
      ? 'SourceSansPro-Bold'
      : 'SourceSansPro'};
  text-decoration: ${(props) =>
    props.underline
      ? 'underline'
      : props.lineThrough
      ? 'line-through'
      : props.underlineLineThrough
      ? 'underline line-through'
      : 'none'};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};
  ${composed};
`;

export default Txt;

Txt.defaultProps = {
  theme,
  fontSize: isTablet ? 8 : 7,
  color: 'text',
  allowFontScaling: false,
};
