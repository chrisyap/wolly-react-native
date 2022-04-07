import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import V from '../View';
import Txt from '../Text';
import { ThemeProps } from '../Theme';

interface Props {
  label: string;
  listItems?: ListItems[];
  checked?: boolean;
  disabled?: boolean;
  headerLabel?: string;
  error?: boolean;
  errorMsg?: string;
  isSelected?: boolean;
  rounded?: boolean;
  theme?: ThemeProps;
  onChange?: (item: any) => void;
  onPress?: () => any;
}

type ListItems = {
  id: number;
  label: string;
  checked?: boolean;
};

const CheckBoxItem: React.FC<Props> = ({ checked, label, onPress, disabled, error, rounded, ...props }) => {
  const styles = StyleSheet.create({
    touch: { flexDirection: 'row', alignItems: 'flex-start' },
  });
  return (
    <TouchableOpacity style={styles.touch} onPress={onPress} disabled={disabled} {...props}>
      <Icon
        size={32}
        color={disabled ? 'secondaries.5' : error ? 'danger' : checked ? 'secondaryAccent' : 'secondary'}
        name={
          checked && rounded
            ? 'checked-circle'
            : rounded
            ? 'circle-outline'
            : checked
            ? 'checked-square'
            : 'square-outline'
        }
        mr={'4px'}
      />
      <Txt flex={1} mt={'6px'} color={disabled ? 'secondaries.5' : error ? 'danger' : undefined}>
        {label}
      </Txt>
    </TouchableOpacity>
  );
};
export default class CheckboxList extends React.Component<Props, {}> {
  state = {
    checked: this.props.isSelected,
    selectAllItems: false,
  };
  selectCurrentItem = (id?: number): void => {
    const { checked } = this.state;
    const { listItems } = this.props;
    if (listItems) {
      const index = listItems.findIndex((x) => x.id === id);
      listItems[index].checked = !listItems[index].checked;
      this.setState({ listItems });

      if (Object.values(listItems).every((item) => item.checked)) {
        this.setState({ selectAllItems: true });
      } else {
        this.setState({ selectAllItems: false });
      }
      this.props.onChange && this.props.onChange(listItems);
    } else {
      this.setState({ checked: !checked });
      this.props.onChange && this.props.onChange(checked);
    }
  };
  selectAllItems = (): void => {
    const { selectAllItems } = this.state;
    const { listItems } = this.props;

    if (listItems) {
      listItems.forEach((item) => (item.checked = !selectAllItems));
      this.setState({ listItems, selectAllItems: !selectAllItems });
      this.props.onChange && this.props.onChange(listItems);
    }
  };
  render(): ReactNode {
    const { checked, selectAllItems } = this.state;
    const { listItems, label, disabled, headerLabel, error, errorMsg, rounded, ...props } = this.props;
    return (
      <V>
        {listItems ? (
          <>
            {headerLabel && (
              <CheckBoxItem
                label={headerLabel}
                key={headerLabel}
                checked={selectAllItems}
                onPress={this.selectAllItems}
                disabled={disabled}
                rounded={rounded}
                error={error}
              />
            )}
            {listItems.map((item: ListItems) => (
              <CheckBoxItem
                label={item.label}
                key={item.label}
                checked={item.checked}
                onPress={() => this.selectCurrentItem(item.id)}
                disabled={disabled}
                rounded={rounded}
                error={error}
                {...props}
              />
            ))}
          </>
        ) : (
          <CheckBoxItem
            label={label}
            key={label}
            checked={checked}
            onPress={() => this.selectCurrentItem()}
            disabled={disabled}
            rounded={rounded}
            error={error}
            {...props}
          />
        )}
        {errorMsg && (
          <Txt px={'5px'} color="danger">
            {errorMsg}
          </Txt>
        )}
      </V>
    );
  }
}
