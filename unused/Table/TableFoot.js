import React from 'react';
import styled from 'styled-components';
import { rgba, tint } from 'polished';
import Row from './TableRow';
import { CellWrapper, ChildWrapper } from './Cell';
import Icon from '../Icon';
import Div from '../Div';
import { composed } from '../Theme/Composed';
import theme from '../Theme';

const TableCell = styled(CellWrapper)`
  border-width: 2px 0 0;
  border-bottom-color: transparent;
  border-top-color: ${props => rgba(props.theme.colors.secondaries[2], 1)};
  font-weight: 700;
  vertical-align: top;
  line-height: 1.1;
  padding-top: calc(0.5em + 2px);
  padding-left: ${props => props.sort && '.3em'};
  ${ChildWrapper} {
    padding-left: 0;
  }
`;

const FootWrapper = styled.div`
  display: table-footer-group;
  ${composed};

  ${TableCell} {
    top: ${props => (props.bottom ? props.bottom : 0)};
    background-color: ${props =>
      props.success
        ? tint(0.9, props.theme.colors.successes[1])
        : props.info
        ? tint(0.9, props.theme.colors.infos[1])
        : props.warning
        ? tint(0.9, props.theme.colors.warnings[1])
        : props.danger
        ? tint(0.9, props.theme.colors.dangers[1])
        : 'white'};
    color: ${props =>
      props.success
        ? props.theme.colors.successes[6]
        : props.info
        ? props.theme.colors.infos[6]
        : props.warning
        ? props.theme.colors.warnings[6]
        : props.danger && props.theme.colors.dangers[6]};
    border-top-color: ${props =>
      props.success
        ? props.theme.colors.success
        : props.info
        ? props.theme.colors.info
        : props.warning
        ? props.theme.colors.warning
        : props.danger && props.theme.colors.danger};
  }
`;

const Foot = ({ ascending, selectedField: field, footers, ...props }) => {
  return (
    <FootWrapper {...props}>
      <Row>
        {footers.map((footer, index) => {
          const contentProps = {
            role: footer.sort && 'button',
          };
          return (
            <TableCell
              key={index}
              sort={footer.sort}
              right={footer.align === 'right'}
              className={`${footer.className || ''} ${footer.sort && 'has-pointer'}`}
              onClick={footer.sort ? () => props.sort(footer.value, footer.sort) : null}
              contentProps={contentProps}
              style={{ width: footer.width ? footer.width : 'auto' }}
            >
              <Div
                display="flex"
                justifyContent={
                  footer.align === 'right' ? 'flex-end' : footer.align === 'centered' ? 'center' : 'flex-start'
                }
              >
                {footer.sort && (
                  <Div minHeight="20px">
                    <Icon
                      small
                      className={`${field === footer.value ? 'has-text-primary' : 'has-text-black text--lighten-4'}`}
                    >
                      {field === footer.value && ascending
                        ? 'sort-asc'
                        : field === footer.value && !ascending
                        ? 'sort-desc'
                        : 'sort'}
                    </Icon>
                  </Div>
                )}
                <Div>{footer.name}</Div>
              </Div>
            </TableCell>
          );
        })}
      </Row>
    </FootWrapper>
  );
};

export default { Foot, FootWrapper };

Foot.defaultProps = {
  theme,
};

TableCell.defaultProps = {
  theme,
};
