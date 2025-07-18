export const ANIMATION_CONFIG = {
  MIN_DRAWER_Y: 35,
  DRAWER_OFFSET: 25,
  MONTH_HEIGHT_RATIO: 0.8,
  DRAWER_RANGE_OFFSET: 30,
  ANIMATION_OFFSET: 0,
  GESTURE_THRESHOLD: 40,
  WEEK_HEIGHT: 48,
};

export const CALENDAR_CONFIG = {
  WEEKDAYS: ['일', '월', '화', '수', '목', '금', '토'] as const,
  DEFAULT_DAY_OF_MONTH: 15,
} as const;

export const SPRING_CONFIG = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
} as const;
