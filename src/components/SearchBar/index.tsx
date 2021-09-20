import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Components
import TextInput, { InputProps } from 'src/components/Input';
import Icon from 'react-native-vector-icons/Ionicons';

// Layout
import { APP_HEADER_HEIGHT } from 'src/components/Navigation/AppHeader';
import { Colors } from 'src/layout';

export type SearchBarProps = Omit<
  InputProps,
  'renderLeftComponent' | 'renderRightComponent'
> & {
  icon?: string;
  onIconPress?: () => void;
};

const SearchBar: FC<SearchBarProps> = ({
  icon = 'search',
  onIconPress,
  ...props
}) => {
  const renderLeftComponent = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.iconWrapper}
      onPress={onIconPress}>
      <Icon name={icon} size={20} color={Colors.Manatee} />
    </TouchableOpacity>
  );

  return (
    <TextInput
      placeholderTextColor={Colors.Manatee}
      {...props}
      renderLeftComponent={renderLeftComponent}
    />
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: APP_HEADER_HEIGHT,
    width: 46,
  },
});

export default SearchBar;
