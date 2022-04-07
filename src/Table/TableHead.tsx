import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import V from '../View';
import Txt from '../Text';
import { isTablet } from '../Util';

const HeadWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

interface HeadProps {
  ascending?: boolean;
  selectedField?: string;
  headers: Array<{
    sort?: boolean;
    label?: string;
    value?: string;
    align?: string;
  }>;
  widths?: Array<number>;
  sort: (value?: string, sort?: any) => void;
  isHeaderScrolling: boolean;
  setIsHeaderScrolling: (arg: boolean) => boolean;
  rowRef: any;
  setHeaderRef: any;
}

class Head extends React.Component<HeadProps, {}> {
  isHeaderScrolling?: boolean = false;
  isSingle = this.props.headers.length === 1;
  hScrollProps = !this.isSingle
    ? {
        ref: this.props.setHeaderRef,
        onScroll: (ev: any) => {
          this.isHeaderScrolling &&
            this.props.rowRef &&
            this.props.rowRef.scrollTo({
              x: ev.nativeEvent.contentOffset.x,
              animated: false,
            });
        },
        onScrollBeginDrag: (ev: any) => {
          this.isHeaderScrolling = true;
          this.props.setIsHeaderScrolling(true);
          this.props.rowRef &&
            this.props.rowRef.scrollTo({
              x: ev.nativeEvent.contentOffset.x,
              animated: false,
            });
        },
        onScrollEndDrag: (ev: any) => {
          this.isHeaderScrolling = false;
          this.props.setIsHeaderScrolling(false);
          this.props.rowRef &&
            this.props.rowRef.scrollTo({
              x: ev.nativeEvent.contentOffset.x,
              animated: false,
            });
        },
        onMomentumScrollBegin: (ev: any) => {
          this.props.rowRef &&
            this.props.rowRef.scrollTo({
              x: ev.nativeEvent.contentOffset.x,
              animated: false,
            });
        },
        onMomentumScrollEnd: (ev: any) => {
          this.isHeaderScrolling = false;
          this.props.setIsHeaderScrolling(false);
          this.props.rowRef &&
            this.props.rowRef.scrollTo({
              x: ev.nativeEvent.contentOffset.x,
              animated: false,
            });
        },
      }
    : {};
  componentDidUpdate(): void {
    this.isHeaderScrolling = this.props.isHeaderScrolling;
  }
  render(): React.ReactNode {
    const { ascending, selectedField: field, headers, widths, ...props } = this.props;
    return (
      <HeadWrapper {...props}>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          {...this.hScrollProps}
        >
          <V bg="white" borderBottomWidth={2} borderColor="rowOdd" py={isTablet ? 1 : 0}>
            <V flexDirection="row">
              {headers &&
                headers.map((header, index) => {
                  return (
                    <V key={index} width={widths && widths.length > 0 ? widths[index] : undefined}>
                      <TouchableOpacity onPress={header.sort ? () => props.sort(header.value, header.sort) : undefined}>
                        <V
                          pl={header.sort ? 1 : 2}
                          pr={2}
                          py={'4px'}
                          flexDirection="row"
                          justifyContent={
                            header.align === 'right' ? 'flex-end' : header.align === 'center' ? 'center' : 'flex-start'
                          }
                        >
                          {header.sort && (
                            <Icon
                              ml={'-2px'}
                              mr={'-2px'}
                              mt={'-2px'}
                              name={
                                field === header.value && ascending
                                  ? 'sort-asc'
                                  : field === header.value && !ascending
                                  ? 'sort-desc'
                                  : 'sort'
                              }
                              color={field === header.value ? 'danger' : 'secondaries.5'}
                            />
                          )}
                          <Txt semibold fontSize={isTablet ? 7 : 6} mr={'-4px'}>
                            {header.label}
                          </Txt>
                        </V>
                      </TouchableOpacity>
                    </V>
                  );
                })}
            </V>
          </V>
        </ScrollView>
      </HeadWrapper>
    );
  }
}

export default { Head, HeadWrapper };
