import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import ModalView from '../Modal';
import Txt from '../Text';
import V from '../View';
import { getTestIdProp, isTablet } from '../Util';
interface Props {
  disabled?: boolean;
  items: Array<ItemProp>;
  onValueChange: (value: string) => void;
  placeholder: string;
  value: string;
  valueComponent?: React.ReactElement | string;
  testId?: string;
  hasNoArrow?: boolean;
  orientation?: string;
  isBottomAligned?: boolean;
  compact?: boolean;
}
interface State {
  isOpened: boolean;
}

interface ItemProp {
  label: string | React.ReactElement;
  value: string;
}

class DropdownView extends React.Component<Props, State> {
  static defaultProps = {
    placeholder: 'Please select',
  };
  state: State = { isOpened: false };
  render(): React.ReactNode {
    const {
      disabled,
      items,
      isBottomAligned,
      onValueChange,
      orientation,
      placeholder,
      value,
      valueComponent,
      testId,
      hasNoArrow,
      compact,
    } = this.props;
    const { isOpened } = this.state;
    const extraProps = testId ? getTestIdProp(testId) : undefined;
    const selectedItem = items && items.find((item) => item.value === value);
    const selectedItemLabel = selectedItem ? selectedItem.label : undefined;

    return (
      <>
        <TouchableOpacity disabled={disabled} onPress={() => this.setState({ isOpened: !isOpened })} {...extraProps}>
          <V flexDirection="row" justifyContent={isTablet ? 'center' : 'space-between'}>
            {valueComponent ? (
              <V
                flexDirection="column"
                {...(isTablet && compact ? { flexShrink: 1, justifyContent: 'center' } : { flex: 1 })}
              >
                {valueComponent}
              </V>
            ) : (
              <Txt py={1} color={selectedItemLabel ? 'black' : 'secondary'}>
                {selectedItemLabel ? selectedItemLabel : placeholder}
              </Txt>
            )}
            {!hasNoArrow && <Icon medium={!isTablet} large={isTablet} name={isOpened ? 'arrow-up' : 'arrow-down'} />}
          </V>
        </TouchableOpacity>
        <ModalView
          visible={isOpened}
          orientation={orientation}
          onClose={() => this.setState({ isOpened: !isOpened })}
          hasCloseBtn
          isBottomAligned={isTablet && isBottomAligned ? true : false}
        >
          <V mt={'4px'}>
            {Boolean(items) &&
              items.map((item: ItemProp, i: number) => (
                <V key={i} bg="white" py={1} px={2} mt="2px" borderColor="secondaries.2" borderBottomWidth={1}>
                  <TouchableOpacity
                    onPress={() => {
                      onValueChange(item.value);
                      this.setState({ isOpened: false });
                    }}
                  >
                    {typeof item.label === 'string' ? (
                      <Txt
                        fontSize={8}
                        textAlign="center"
                        semibold={selectedItemLabel === item.label}
                        color={selectedItemLabel === item.label ? 'secondaries.8' : 'black'}
                      >
                        {item.label}
                      </Txt>
                    ) : (
                      item.label
                    )}
                  </TouchableOpacity>
                </V>
              ))}
          </V>
        </ModalView>
      </>
    );
  }
}

export default DropdownView;
