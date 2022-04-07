import React from 'react';
import { useKeyboard } from '@react-native-community/hooks';
import { ThemeContext } from 'styled-components';
import { ModalProps, StyleSheet } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Modal, { ModalProps as RNModalProps } from 'react-native-modal';
import ConditionalWrapper from '../Common/ConditionalWrapper';
import TabletPaddedLayout from '../TabletPaddedLayout/TabletPaddedLayout';
import Btn from '../Button';
import ScrollView from '../ScrollView';
import Txt from '../Text';
import { ThemeProps } from '../Theme';
import V, { VProps } from '../View';
import { getTestIdProp, isSmallScreen, isTablet } from '../Util';
interface ModalViewProps extends ModalProps {
  onClose?: () => void;
  title?: string | React.ReactElement;
  onReset?: () => void;
  scrollProps?: object;
  closeLabel?: string;
  hasCloseBtn?: boolean;
  customBtn?: React.ReactElement;
  isFullScreen?: boolean;
  orientation?: string;
  coverScreen?: boolean;
  modalProps?: RNModalProps;
  isBottomAligned?: boolean;
  bodyProps?: VProps;
  isKeyboardVisible?: boolean;
}

const ModalView: React.FC<ModalViewProps> = (props) => {
  const insets = React.useContext(SafeAreaInsetsContext);
  const theme = React.useContext(ThemeContext) as ThemeProps;
  const isKeyboardVisible = useKeyboard()?.keyboardShown;

  const notchMargin =
    props.orientation === 'LANDSCAPE-RIGHT' || props.orientation === 'LANDSCAPE-LEFT'
      ? insets && insets.left > 30
        ? insets.left - 18
        : 12
      : 0;

  const styles = StyleSheet.create({
    title: { flexGrow: 1 },
    modal: !isTablet
      ? {
          marginLeft: notchMargin,
          marginRight: notchMargin,
          marginTop: 0,
          marginBottom: 0,
          justifyContent: 'flex-end',
        }
      : {
          margin: 0,
          justifyContent: props.isBottomAligned ? 'flex-end' : 'center',
        },
  });

  return (
    <Modal
      hasBackdrop
      avoidKeyboard
      isVisible={props?.visible}
      onBackdropPress={props?.onClose}
      backdropOpacity={0.45}
      backdropTransitionOutTiming={0}
      backdropColor={theme.colors.modalBackdrop}
      style={styles.modal}
      onDismiss={props?.onDismiss}
      coverScreen={props?.coverScreen}
      useNativeDriver
      useNativeDriverForBackdrop
      {...props.modalProps}
    >
      <ConditionalWrapper
        condition={isTablet}
        wrapper={(children) => (
          <TabletPaddedLayout>
            <V py={props.isKeyboardVisible ? 0 : 8}>{children}</V>
          </TabletPaddedLayout>
        )}
      >
        <V
          bg="white"
          maxHeight={props?.isFullScreen || isTablet ? '100%' : '92%'}
          width={!isTablet ? '100%' : undefined}
          borderTopLeftRadius={isTablet ? theme.radii[3] : 20}
          borderTopRightRadius={isTablet ? theme.radii[3] : 20}
          borderBottomLeftRadius={isTablet ? theme.radii[3] : 0}
          borderBottomRightRadius={isTablet ? theme.radii[3] : 0}
          pb={(!isKeyboardVisible && !isTablet && insets?.bottom) || 1}
          overflow="hidden"
          {...getTestIdProp('modal-wrapper')}
        >
          {props?.title && (
            <V
              borderBottomWidth={1}
              borderColor="secondaries.2"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              px={2}
            >
              {!isTablet ? (
                <Btn ml={0} round medium flat icon="close" onPress={props?.onClose} {...getTestIdProp('close-modal')} />
              ) : (
                <V width={60} />
              )}
              <Txt py={isTablet ? 2 : 1} fontSize={!isTablet ? 9 : 8} semibold textAlign="center" style={styles.title}>
                {props?.title}
              </Txt>
              {isTablet && (
                <Btn mr={0} round large flat icon="close" onPress={props?.onClose} {...getTestIdProp('close-modal')} />
              )}
              {!isTablet &&
                (props?.onReset ? (
                  <Btn mr={0} round flat secondary onPress={props?.onReset} {...getTestIdProp('reset-fields')}>
                    Reset
                  </Btn>
                ) : (
                  <Btn mr={0} round flat />
                ))}
            </V>
          )}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            extraScrollHeight={-100}
            enableResetScrollToCoords
            {...props?.scrollProps}
          >
            <V flex={1} {...props.bodyProps}>
              {props?.children}
            </V>
          </ScrollView>
          {Boolean(props?.hasCloseBtn) && (
            <V borderTopWidth={isTablet ? 0 : 1} pt={1} borderColor="secondaries.2">
              <Btn
                mx={isTablet ? 5 : 2}
                flat={!isTablet}
                secondary={!isTablet}
                black={isTablet}
                mt={isTablet ? 2 : undefined}
                mb={isTablet ? 2 : undefined}
                medium={!isSmallScreen}
                onPress={props?.onClose}
                {...getTestIdProp('close')}
              >
                {props?.closeLabel || 'Close'}
              </Btn>
            </V>
          )}
          {Boolean(props?.customBtn) && (
            <V borderTopWidth={isTablet ? 0 : 1} pt={1} borderColor="secondaries.2">
              {props?.customBtn}
            </V>
          )}
        </V>
      </ConditionalWrapper>
    </Modal>
  );
};

export default ModalView;
