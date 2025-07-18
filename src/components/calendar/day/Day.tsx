import React from 'react';
import { Pressable, Text, StyleProp, TextStyle } from 'react-native';
import styles from './style';

interface Props {
  onPress: () => void;
  isToday: boolean;
  isSelected?: boolean | null;
  day: Date;
  textStyle?: StyleProp<TextStyle>;
}

const Day = ({ onPress, isToday, isSelected, day, textStyle }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.dayItem,
        isToday && styles.todayItem,
        isSelected && styles.selectedItem,
      ]}
      hitSlop={10}
    >
      <Text
        style={[
          styles.dayNumber,
          isToday && styles.todayText,
          isSelected && styles.selectedText,
          textStyle,
        ]}
      >
        {day.getDate()}
      </Text>
    </Pressable>
  );
};

export default React.memo(Day);
