import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, Platform, View } from 'react-native';
import styles from './style';
import { screenWidth } from '../../../../constants';
import Day from '../day/Day';
import { generateWeekDays, getNewWeekIndex } from '../../../utils/dateutils';

interface Props {
  weeksData: { weekStart: Date }[];
  weekIndex: number;
  selectedDate?: Date | null;
  onWeekIndexChange: (idx: number) => void;
  onDateSelect?: (date: Date) => void;
}

const WeekCalendar = ({
  weeksData,
  weekIndex,
  selectedDate,
  onWeekIndexChange,
  onDateSelect,
}: Props) => {
  const listRef = useRef<FlatList>(null);
  const isScrollingByUser = useRef(false);
  const previousWeekIndex = useRef<number>(-1);

  const onScrollBeginDrag = () => {
    isScrollingByUser.current = true;
  };

  const onMomentumScrollEnd = (event: any) => {
    if (isScrollingByUser.current) {
      const currentScrollIndex = Math.round(
        event.nativeEvent.contentOffset.x / screenWidth,
      );

      const clampedIndex = Math.max(
        0,
        Math.min(weeksData.length - 1, currentScrollIndex),
      );

      if (clampedIndex !== weekIndex) {
        onWeekIndexChange(clampedIndex);
      }
    }

    isScrollingByUser.current = false;
  };

  const onDayPress = useCallback(
    (d: Date) => {
      onDateSelect?.(d);
      const idx = getNewWeekIndex(weeksData, d);
      if (idx >= 0) onWeekIndexChange(idx);
    },
    [weeksData, onDateSelect, onWeekIndexChange],
  );

  const renderItem = useCallback(
    ({ item }: { item: { weekStart: Date } }) => {
      const days = generateWeekDays(item.weekStart, selectedDate);
      return (
        <View style={styles.weekContainer}>
          <View style={styles.daysContainer}>
            {days.map(({ date, isToday, isSelected }) => (
              <Day
                key={`weekcalendar-${item.weekStart.toISOString()}-${date.toISOString()}`}
                onPress={() => onDayPress(date)}
                isToday={isToday}
                isSelected={isSelected}
                day={date}
              />
            ))}
          </View>
        </View>
      );
    },
    [selectedDate, onDayPress],
  );
  useEffect(() => {
    if (!isScrollingByUser.current) {
      const indexDiff = Math.abs(weekIndex - previousWeekIndex.current);

      const shouldAnimate = indexDiff <= 4 && previousWeekIndex.current !== -1;

      listRef.current?.scrollToIndex({
        index: weekIndex,
        animated: shouldAnimate,
      });

      previousWeekIndex.current = weekIndex;
    }
  }, [weekIndex]);

  return (
    <FlatList
      ref={listRef}
      data={weeksData}
      horizontal
      snapToInterval={screenWidth}
      decelerationRate="normal"
      initialScrollIndex={Math.max(0, weekIndex)}
      getItemLayout={(_, i) => ({
        length: screenWidth,
        offset: screenWidth * i,
        index: i,
      })}
      keyExtractor={(_, idx) => String(idx)}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      pagingEnabled
      onScrollBeginDrag={onScrollBeginDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      renderItem={renderItem}
      scrollEventThrottle={16}
      snapToAlignment="center"
      disableIntervalMomentum={Platform.OS === 'android'}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={7}
    />
  );
};

export default WeekCalendar;
