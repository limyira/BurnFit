import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import styles from './style';
import { screenWidth } from '../../../../constants';
import {
  generateMonthDayInfo,
  getMonthData,
  getCurrentMonthIndex,
} from '../../../utils/dateutils';
import Day from '../day/Day';

interface Props {
  selectedDate: Date;
  activeDate: Date | null;
  onDateChange: (d: Date) => void;
  onActiveChange: (d: Date | null) => void;
}

const MonthCalendar = ({
  selectedDate,
  activeDate,
  onDateChange,
  onActiveChange,
}: Props) => {
  const listRef = useRef<FlatList>(null);
  const isScrollingByUser = useRef(false);
  const previousMonthIndex = useRef<number>(-1);

  const monthData = useMemo(() => getMonthData(), []);
  const currentMonthIndex = useMemo(
    () => getCurrentMonthIndex(selectedDate, monthData),
    [selectedDate, monthData],
  );

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
        Math.min(monthData.length - 1, currentScrollIndex),
      );

      if (monthData[clampedIndex]) {
        const { year, month } = monthData[clampedIndex];
        const newDate = new Date(year, month, 1);

        if (
          newDate.getFullYear() !== selectedDate.getFullYear() ||
          newDate.getMonth() !== selectedDate.getMonth()
        ) {
          onDateChange(newDate);
        }
      }
    }

    isScrollingByUser.current = false;
  };

  useEffect(() => {
    if (!isScrollingByUser.current) {
      const indexDiff = Math.abs(
        currentMonthIndex - previousMonthIndex.current,
      );

      const shouldAnimate = indexDiff <= 3 && previousMonthIndex.current !== -1;

      listRef.current?.scrollToIndex({
        index: currentMonthIndex,
        animated: shouldAnimate,
      });

      previousMonthIndex.current = currentMonthIndex;
    }
  }, [selectedDate, currentMonthIndex]);

  const getWeeksInMonth = useCallback((year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstWeekStart = firstDay.getDay();
    const totalDays = lastDay.getDate();
    return Math.ceil((firstWeekStart + totalDays) / 7);
  }, []);

  const onPressDay = useCallback(
    (isCurrentMonth: boolean, date: Date) => {
      if (isCurrentMonth) {
        onActiveChange(date);
      }
    },
    [onActiveChange],
  );

  const renderItem = useCallback(
    ({ item }: { item: { year: number; month: number } }) => {
      const { year, month } = item;

      const first = new Date(year, month, 1);
      const startDay = first.getDay();
      let dayCounter = 1 - startDay;
      const weeksNeeded = getWeeksInMonth(year, month);

      return (
        <View style={styles.monthContainer}>
          {Array.from({ length: weeksNeeded }).map((_, w) => (
            <View key={w} style={styles.daysContainer}>
              {Array.from({ length: 7 }).map(() => {
                const dayInfo = generateMonthDayInfo(
                  year,
                  month,
                  dayCounter,
                  activeDate,
                );
                const { date, isToday, isSelected, isCurrentMonth } = dayInfo;
                dayCounter++;

                return (
                  <Day
                    key={date.toISOString()}
                    onPress={() => onPressDay(isCurrentMonth, date)}
                    isToday={isToday}
                    isSelected={isSelected}
                    day={date}
                    textStyle={!isCurrentMonth && styles.otherMonthText}
                  />
                );
              })}
            </View>
          ))}
        </View>
      );
    },
    [activeDate, onPressDay, getWeeksInMonth],
  );

  const keyExtractor = useCallback(
    (item: { year: number; month: number }, index: number) =>
      `${item.year}-${item.month}-${index}`,
    [],
  );

  return (
    <FlatList
      ref={listRef}
      data={monthData}
      horizontal
      snapToInterval={screenWidth}
      decelerationRate="fast"
      initialScrollIndex={Math.max(0, currentMonthIndex)}
      getItemLayout={(_, i) => ({
        length: screenWidth,
        offset: screenWidth * i,
        index: i,
      })}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      pagingEnabled
      onScrollBeginDrag={onScrollBeginDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      renderItem={renderItem}
      scrollEventThrottle={16}
      snapToAlignment="center"
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={7}
    />
  );
};

export default MonthCalendar;
