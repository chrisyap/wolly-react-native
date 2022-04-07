import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import Txt from '../Text';
import V, { VProps } from '../View';
import { getTestIdProp, isTablet } from '../Util';

interface MessageViewProps extends VProps {
  icon?: string;
  hasNoIcon?: boolean;
  isOpened: boolean | false;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  testId?: string;
  onClose?: () => void;
}

interface MessageViewState {
  isVisible: boolean;
}

class MessageView extends React.PureComponent<MessageViewProps, MessageViewState> {
  _isMounted = false;
  state = {
    isVisible: this.props.isOpened,
  };
  componentDidMount(): void {
    this._isMounted = true;
  }
  componentDidUpdate(prevProps: MessageViewProps): void {
    if (prevProps.isOpened !== this.props.isOpened) {
      setTimeout(() => {
        this.setState({
          isVisible: this.props.isOpened,
        });
      }, 300);
    }
  }
  componentWillUnmount(): void {
    this._isMounted = false;
  }
  render(): React.ReactNode {
    const { icon, hasNoIcon, success, warning, danger, testId, onClose, ...props } = this.props;
    const extraProps = testId ? getTestIdProp(testId) : undefined;
    const { isVisible } = this.state;

    return isVisible ? (
      <V
        px={isTablet ? 5 : 2}
        py={isTablet ? 3 : 2}
        borderRadius={isTablet ? 3 : 2}
        bg={success ? 'success' : warning ? 'warning' : danger ? 'danger' : 'secondaryAccent'}
        flexDirection="row"
        alignItems={'flex-start'}
        {...props}
      >
        {!hasNoIcon && !isTablet && (
          <V>
            <Icon
              name={icon ? icon : success ? 'checked-circle' : warning || danger ? 'warning-triangle' : 'info-circle'}
              color={success ? 'successText' : warning ? 'warningText' : danger ? 'dangerText' : 'secondaryAccentText'}
            />
          </V>
        )}
        {typeof props.children === 'string' ? (
          <V flex={1}>
            {isTablet ? (
              <V alignSelf="center" position="relative">
                {!hasNoIcon && (
                  <Icon
                    name={
                      icon ? icon : success ? 'checked-circle' : warning || danger ? 'warning-triangle' : 'info-circle'
                    }
                    color={
                      success ? 'successText' : warning ? 'warningText' : danger ? 'dangerText' : 'secondaryAccentText'
                    }
                    zIndex={100}
                    position={'absolute'}
                    top={0}
                    left={0}
                  />
                )}
                <Txt
                  textAlign="center"
                  position="relative"
                  color={
                    success ? 'successText' : warning ? 'warningText' : danger ? 'dangerText' : 'secondaryAccentText'
                  }
                  {...extraProps}
                >
                  {!hasNoIcon && '        '}
                  {props.children}
                </Txt>
              </V>
            ) : (
              <Txt
                ml={1}
                pr={3}
                color={
                  success ? 'successText' : warning ? 'warningText' : danger ? 'dangerText' : 'secondaryAccentText'
                }
                {...extraProps}
              >
                {props.children}
              </Txt>
            )}
            {/* <Txt
              ml={1}
              pr={3}
              color={success ? 'successText' : warning ? 'warningText' : danger ? 'dangerText' : 'secondaryAccentText'}
              textAlign={isTablet ? 'center' : undefined}
              {...extraProps}
            >
              {isTablet && !hasNoIcon && (
                <V>
                  <Icon
                    name={
                      icon ? icon : success ? 'checked-circle' : warning || danger ? 'warning-triangle' : 'info-circle'
                    }
                    color={
                      success ? 'successText' : warning ? 'warningText' : danger ? 'dangerText' : 'secondaryAccentText'
                    }
                    mr={1}
                  />
                </V>
              )}
              {props.children}
            </Txt> */}
          </V>
        ) : (
          <V flex={1} pl={1} pr={isTablet ? 1 : 0} {...extraProps}>
            {props.children}
          </V>
        )}
        {Boolean(onClose) && (
          <V>
            <TouchableOpacity onPress={onClose} style={styles.touchOpacity}>
              <Icon
                name="close"
                medium={isTablet}
                color={
                  success ? 'successText' : warning ? 'warningText' : danger ? 'dangerText' : 'secondaryAccentText'
                }
              />
            </TouchableOpacity>
          </V>
        )}
      </V>
    ) : (
      <></>
    );
  }
}

export default MessageView;

const styles = StyleSheet.create({
  touchOpacity: {
    marginHorizontal: -10,
    marginVertical: -4,
  },
});
