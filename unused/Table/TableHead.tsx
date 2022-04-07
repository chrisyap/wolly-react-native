import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import Icon from '../Icon';
import V from '../View';
import Txt from '../Text';

const HeadWrapper = ({ children }: { children: any }) => children;

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
            this.props.rowRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
        },
        onScrollBeginDrag: (ev: any) => {
          this.isHeaderScrolling = true;
          this.props.setIsHeaderScrolling(true);
          this.props.rowRef && this.props.rowRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
        },
        onScrollEndDrag: (ev: any) => {
          this.isHeaderScrolling = false;
          this.props.setIsHeaderScrolling(false);
          this.props.rowRef && this.props.rowRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
        },
        onMomentumScrollBegin: (ev: any) => {
          this.props.rowRef && this.props.rowRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
        },
        onMomentumScrollEnd: (ev: any) => {
          this.isHeaderScrolling = false;
          this.props.setIsHeaderScrolling(false);
          this.props.rowRef && this.props.rowRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
        },
      }
    : {};

  componentDidUpdate() {
    this.isHeaderScrolling = this.props.isHeaderScrolling;
  }

  render() {
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
          <V borderBottomWidth={2} borderColor="#C1C0B9">
            <V flexDirection="row" bg="white">
              {headers &&
                headers.map((header, index) => {
                  return (
                    <V key={index} width={widths && widths.length > 0 ? widths[index] : undefined}>
                      <TouchableOpacity onPress={header.sort ? () => props.sort(header.value, header.sort) : undefined}>
                        <V
                          pl={header.sort ? 3 : 4}
                          pr={4}
                          py={1}
                          flexDirection="row"
                          justifyContent={
                            header.align === 'right' ? 'flex-end' : header.align === 'center' ? 'center' : 'flex-start'
                          }
                        >
                          {header.sort && (
                            <Icon
                              ml={-1}
                              mr={'-2px'}
                              small
                              name={
                                field === header.value && ascending
                                  ? 'sort-asc'
                                  : field === header.value && !ascending
                                  ? 'sort-desc'
                                  : 'sort'
                              }
                              color={field === header.value ? '#c20000' : '#ddd'}
                            />
                          )}
                          <Txt semibold mr={-1}>
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
