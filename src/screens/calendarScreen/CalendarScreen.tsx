import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  SharedValue,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import {
  calculateMonthHeight,
  getCurrentWeekPositionInMonth,
  getNewWeekIndex,
  getWeeksData,
  getCurrentWeekIndex,
} from '../../utils/dateutils';
import MonthCalendar from '../../components/calendar/monthCalendar/MonthCalendar';
import WeekCalendar from '../../components/calendar/weekCalendar/WeekCalendar';
import Agenda from '../../components/calendar/agenda/Agenda';
import { ANIMATION_CONFIG, CALENDAR_CONFIG, SPRING_CONFIG } from './constants';

const AnimationHelpers = {
  calculateProgress: (currentDrawerPos: number, drawerRange: number) => {
    'worklet';
    return Math.max(0, Math.min(1, currentDrawerPos / drawerRange));
  },

  handleExpandAnimation: (
    progress: number,
    startOffset: number,
    weekOpacity: SharedValue<number>,
    monthOpacity: SharedValue<number>,
    monthTranslateY: SharedValue<number>,
    weekTranslateY: SharedValue<number>,
  ) => {
    'worklet';
    weekOpacity.value = 1 - progress;
    monthOpacity.value = progress;
    monthTranslateY.value =
      (startOffset + ANIMATION_CONFIG.ANIMATION_OFFSET) * (1 - progress);
    weekTranslateY.value =
      (-startOffset + ANIMATION_CONFIG.ANIMATION_OFFSET) * progress;
  },

  handleCollapseAnimation: (
    progress: number,
    startOffset: number,
    weekOpacity: SharedValue<number>,
    monthOpacity: SharedValue<number>,
    monthTranslateY: SharedValue<number>,
    weekTranslateY: SharedValue<number>,
  ) => {
    'worklet';
    weekOpacity.value = progress;
    monthOpacity.value = 1 - progress;
    monthTranslateY.value =
      (startOffset + ANIMATION_CONFIG.ANIMATION_OFFSET) * progress;
    weekTranslateY.value =
      (-startOffset + ANIMATION_CONFIG.ANIMATION_OFFSET) * (1 - progress);
  },

  animateToExpanded: (
    weekOpacity: SharedValue<number>,
    monthOpacity: SharedValue<number>,
    monthTranslateY: SharedValue<number>,
    weekTranslateY: SharedValue<number>,
    drawerTranslateY: SharedValue<number>,
    currentWeekPosition: SharedValue<number>,
    monthHeight: number,
  ) => {
    'worklet';
    weekOpacity.value = withSpring(0, SPRING_CONFIG);
    monthOpacity.value = withSpring(1, SPRING_CONFIG);
    monthTranslateY.value = withSpring(
      ANIMATION_CONFIG.ANIMATION_OFFSET,
      SPRING_CONFIG,
    );

    const weekPosition = currentWeekPosition.value;
    const startOffset = -(weekPosition * ANIMATION_CONFIG.WEEK_HEIGHT);

    weekTranslateY.value = withSpring(
      -startOffset + ANIMATION_CONFIG.ANIMATION_OFFSET,
      SPRING_CONFIG,
    );
    drawerTranslateY.value = withSpring(
      monthHeight * ANIMATION_CONFIG.MONTH_HEIGHT_RATIO +
        ANIMATION_CONFIG.DRAWER_OFFSET,
      SPRING_CONFIG,
    );
  },

  animateToCollapsed: (
    weekOpacity: SharedValue<number>,
    monthOpacity: SharedValue<number>,
    monthTranslateY: SharedValue<number>,
    weekTranslateY: SharedValue<number>,
    drawerTranslateY: SharedValue<number>,
    currentWeekPosition: SharedValue<number>,
  ) => {
    'worklet';
    weekOpacity.value = withSpring(1, SPRING_CONFIG);
    monthOpacity.value = withSpring(0, SPRING_CONFIG);
    weekTranslateY.value = withSpring(
      ANIMATION_CONFIG.ANIMATION_OFFSET,
      SPRING_CONFIG,
    );
    drawerTranslateY.value = withSpring(
      ANIMATION_CONFIG.MIN_DRAWER_Y,
      SPRING_CONFIG,
    );

    const weekPosition = currentWeekPosition.value;
    const startOffset = -(weekPosition * ANIMATION_CONFIG.WEEK_HEIGHT);

    monthTranslateY.value = withSpring(
      startOffset + ANIMATION_CONFIG.ANIMATION_OFFSET,
      SPRING_CONFIG,
    );
  },

  animateToRestore: (
    weekOpacity: SharedValue<number>,
    monthOpacity: SharedValue<number>,
    monthTranslateY: SharedValue<number>,
    weekTranslateY: SharedValue<number>,
    drawerTranslateY: SharedValue<number>,
    currentWeekPosition: SharedValue<number>,
    monthHeight: number,
    isExpanded: boolean,
  ) => {
    'worklet';

    weekOpacity.value = withSpring(isExpanded ? 0 : 1, SPRING_CONFIG);
    monthOpacity.value = withSpring(isExpanded ? 1 : 0, SPRING_CONFIG);

    const targetDrawerY = isExpanded
      ? monthHeight * ANIMATION_CONFIG.MONTH_HEIGHT_RATIO +
        ANIMATION_CONFIG.DRAWER_OFFSET
      : ANIMATION_CONFIG.MIN_DRAWER_Y;

    drawerTranslateY.value = withSpring(targetDrawerY, SPRING_CONFIG);

    const weekPosition = currentWeekPosition.value;
    const startOffset = -(weekPosition * ANIMATION_CONFIG.WEEK_HEIGHT);

    if (isExpanded) {
      monthTranslateY.value = withSpring(
        ANIMATION_CONFIG.ANIMATION_OFFSET,
        SPRING_CONFIG,
      );
      weekTranslateY.value = withSpring(
        -startOffset + ANIMATION_CONFIG.ANIMATION_OFFSET,
        SPRING_CONFIG,
      );
    } else {
      monthTranslateY.value = withSpring(
        startOffset + ANIMATION_CONFIG.ANIMATION_OFFSET,
        SPRING_CONFIG,
      );
      weekTranslateY.value = withSpring(
        ANIMATION_CONFIG.ANIMATION_OFFSET,
        SPRING_CONFIG,
      );
    }
  },
} as const;

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState<Date | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [weekIndex, setWeekIndex] = useState(0);

  const weekOpacity = useSharedValue(1);
  const monthOpacity = useSharedValue(0);
  const monthTranslateY = useSharedValue(ANIMATION_CONFIG.ANIMATION_OFFSET);
  const weekTranslateY = useSharedValue(ANIMATION_CONFIG.ANIMATION_OFFSET);
  const currentWeekPosition = useSharedValue(0);
  const drawerTranslateY = useSharedValue(ANIMATION_CONFIG.DRAWER_OFFSET);
  const currentMonthHeight = useSharedValue(calculateMonthHeight(selectedDate));
  const gestureStartY = useSharedValue(0);

  const weeksData = useMemo(() => getWeeksData(), []);
  const headerMonth = useMemo(
    () => selectedDate.getMonth() + 1,
    [selectedDate],
  );

  const weekAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: weekOpacity.value,
      transform: [{ translateY: weekTranslateY.value }],
    };
  });
  const monthAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: monthOpacity.value,
      transform: [{ translateY: monthTranslateY.value }],
    };
  });
  const drawerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: drawerTranslateY.value }],
    };
  });

  const toggleExpanded = useCallback((expanded: boolean) => {
    setIsExpanded(expanded);
  }, []);

  const handleWeekScroll = useCallback(
    (idx: number) => {
      setWeekIndex(idx);
      setSelectedDate(weeksData[idx].weekStart);
    },
    [weeksData],
  );

  const goToPrevious = useCallback(() => {
    if (isExpanded) {
      const d = new Date(selectedDate);
      d.setMonth(d.getMonth() - 1);
      setSelectedDate(d);
    } else {
      const newWeekIndex = Math.max(0, weekIndex - 1);
      handleWeekScroll(newWeekIndex);
    }
  }, [isExpanded, selectedDate, weekIndex, handleWeekScroll]);

  const goToNext = useCallback(() => {
    if (isExpanded) {
      const d = new Date(selectedDate);

      d.setMonth(d.getMonth() + 1);
      setSelectedDate(d);
    } else {
      const newWeekIndex = Math.min(weeksData.length - 1, weekIndex + 1);
      handleWeekScroll(newWeekIndex);
    }
  }, [isExpanded, selectedDate, weekIndex, handleWeekScroll, weeksData.length]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      gestureStartY.value = drawerTranslateY.value;
    })
    .onUpdate(event => {
      const monthHeight = currentMonthHeight.value;

      const newTranslateY = gestureStartY.value + event.translationY;

      const minTranslateY = ANIMATION_CONFIG.MIN_DRAWER_Y;
      const maxTranslateY =
        monthHeight * ANIMATION_CONFIG.MONTH_HEIGHT_RATIO +
        ANIMATION_CONFIG.DRAWER_OFFSET;

      drawerTranslateY.value = Math.max(
        minTranslateY,
        Math.min(maxTranslateY, newTranslateY),
      );

      const drawerRange =
        monthHeight * ANIMATION_CONFIG.MONTH_HEIGHT_RATIO -
        ANIMATION_CONFIG.DRAWER_RANGE_OFFSET;
      const currentDrawerPos =
        drawerTranslateY.value - ANIMATION_CONFIG.MIN_DRAWER_Y;
      const startOffset = -(
        currentWeekPosition.value * ANIMATION_CONFIG.WEEK_HEIGHT
      );

      if (event.translationY > 0 && !isExpanded) {
        const progress = AnimationHelpers.calculateProgress(
          currentDrawerPos,
          drawerRange,
        );
        AnimationHelpers.handleExpandAnimation(
          progress,
          startOffset,
          weekOpacity,
          monthOpacity,
          monthTranslateY,
          weekTranslateY,
        );
      } else if (event.translationY < 0 && isExpanded) {
        const progress = AnimationHelpers.calculateProgress(
          1 - currentDrawerPos / drawerRange,
          1,
        );
        AnimationHelpers.handleCollapseAnimation(
          progress,
          startOffset,
          weekOpacity,
          monthOpacity,
          monthTranslateY,
          weekTranslateY,
        );
      }
    })
    .onEnd(event => {
      const monthHeight = currentMonthHeight.value;

      if (
        event.translationY > ANIMATION_CONFIG.GESTURE_THRESHOLD &&
        !isExpanded
      ) {
        AnimationHelpers.animateToExpanded(
          weekOpacity,
          monthOpacity,
          monthTranslateY,
          weekTranslateY,
          drawerTranslateY,
          currentWeekPosition,
          monthHeight,
        );
        runOnJS(toggleExpanded)(true);
      } else if (
        event.translationY < -ANIMATION_CONFIG.GESTURE_THRESHOLD &&
        isExpanded
      ) {
        AnimationHelpers.animateToCollapsed(
          weekOpacity,
          monthOpacity,
          monthTranslateY,
          weekTranslateY,
          drawerTranslateY,
          currentWeekPosition,
        );
        runOnJS(toggleExpanded)(false);
      } else {
        AnimationHelpers.animateToRestore(
          weekOpacity,
          monthOpacity,
          monthTranslateY,
          weekTranslateY,
          drawerTranslateY,
          currentWeekPosition,
          monthHeight,
          isExpanded,
        );
      }
    });

  useEffect(() => {
    const newWeekIndex = getCurrentWeekIndex(selectedDate, weeksData);
    if (newWeekIndex >= 0 && newWeekIndex !== weekIndex) {
      setWeekIndex(newWeekIndex);
    }

    const weekPos = getCurrentWeekPositionInMonth(
      weeksData,
      weekIndex,
      selectedDate,
    );
    currentWeekPosition.value = weekPos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, weeksData, weekIndex]);

  useEffect(() => {
    const targetY = isExpanded
      ? currentMonthHeight.value * ANIMATION_CONFIG.MONTH_HEIGHT_RATIO +
        ANIMATION_CONFIG.DRAWER_OFFSET
      : ANIMATION_CONFIG.MIN_DRAWER_Y;

    drawerTranslateY.value = withSpring(targetY, SPRING_CONFIG);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  useEffect(() => {
    let targetDate = new Date(selectedDate);
    if (targetDate.getDate() === 1) {
      targetDate.setDate(CALENDAR_CONFIG.DEFAULT_DAY_OF_MONTH);
    }
    const newWeekIndex = getNewWeekIndex(weeksData, targetDate);
    if (newWeekIndex >= 0) {
      setWeekIndex(newWeekIndex);
    }
  }, [selectedDate, weeksData]);

  useEffect(() => {
    const newHeight = calculateMonthHeight(selectedDate);
    currentMonthHeight.value = newHeight;

    if (isExpanded) {
      drawerTranslateY.value = withSpring(
        newHeight * ANIMATION_CONFIG.MONTH_HEIGHT_RATIO +
          ANIMATION_CONFIG.DRAWER_OFFSET,
        SPRING_CONFIG,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, isExpanded]);
  useEffect(() => {
    const correctIndex = getCurrentWeekIndex(selectedDate, weeksData);
    if (correctIndex >= 0) {
      setWeekIndex(correctIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeksData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.monthNavigator}>
          <TouchableOpacity style={styles.navButton} onPress={goToPrevious}>
            <Text style={styles.navButtonText}>‹</Text>
          </TouchableOpacity>
          <Text
            style={styles.currentDateText}
          >{`${selectedDate.getFullYear()}년 ${headerMonth}월`}</Text>
          <TouchableOpacity style={styles.navButton} onPress={goToNext}>
            <Text style={styles.navButtonText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekdayLabels}>
        {CALENDAR_CONFIG.WEEKDAYS.map((d, i) => (
          <View key={i} style={styles.weekdayLabel}>
            <Text style={styles.weekdayText}>{d}</Text>
          </View>
        ))}
      </View>

      <Animated.View style={[styles.calendarContainer]}>
        <Animated.View
          style={monthAnimatedStyle}
          pointerEvents={isExpanded ? 'auto' : 'none'}
        >
          <MonthCalendar
            selectedDate={selectedDate}
            activeDate={activeDate}
            onDateChange={setSelectedDate}
            onActiveChange={setActiveDate}
          />
        </Animated.View>

        <Animated.View
          style={[styles.weekViewContainer, weekAnimatedStyle]}
          pointerEvents={isExpanded ? 'none' : 'auto'}
        >
          <WeekCalendar
            weeksData={weeksData}
            weekIndex={weekIndex}
            selectedDate={activeDate}
            onWeekIndexChange={handleWeekScroll}
            onDateSelect={setActiveDate}
          />
        </Animated.View>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.drawerContainer, drawerAnimatedStyle]}>
          <View style={styles.knobContainer}>
            <View style={styles.knob} />
          </View>

          <Agenda activeDate={activeDate || new Date()} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
