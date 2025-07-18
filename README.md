# BurnFit (React Native)

**개발자**: 임이라  
**과제 목적**: React Native 기반 앱에 캘린더 기능 구현

---

## 🚀 프로젝트 소개

- React Native로 캘린더 데모 앱
- 하단에 4개 탭(Bottom Tabs Navigator): 홈 / 캘린더 / 라이브러리 / 마이페이지
- 외부 라이브러리 없이 직접 만든 월간/주간 캘린더 컴포넌트
- Reanimated + Gesture Handler로 드래그/스와이프 시 월간↔주간 뷰 전환

---

## 🎯 주요 기능

### Level 1: 네비게이션

- `react-navigation`의 Bottom Tabs Navigator 사용
- 4개 스크린 생성 및 라우팅
  - HomeScreen
  - CalendarScreen
  - LibraryScreen
  - MyPageScreen

### Level 2: 커스텀 캘린더

- **월간 뷰**
  - 현재 월·연도 표시
  - 오늘 날짜 강조 스타일
  - 이전/다음 월 이동 버튼
- **날짜 선택**
  - 터치한 날짜에 원(circle) 표시
  - 마지막 선택된 날짜만 유지

### Level 3: 제스처 전환

- `react-native-reanimated` + `react-native-gesture-handler` 활용
- **스와이프** 제스처로
  - 월간 뷰 → 주간 뷰
  - 주간 뷰 → 월간 뷰
- 애니메이션: 자연스러운 높이·위치 전환

---

## 🛠️ 기술 스택

- **플랫폼**: React Native
- **네비게이션**: `@react-navigation/native`, `@react-navigation/bottom-tabs`
- **애니메이션/제스처**: `react-native-reanimated`, `react-native-gesture-handler`
- **언어**: TypeScript
- **버전 관리**: Git / GitHub

---

## 📦 설치 & 실행

### 1. 저장소 클론

```bash
git clone https://github.com/yourname/BurnFit.git
cd BurnFit
```

### 2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

### 3. iOS 실행

```bash
cd ios
pod install
cd ..
npm run ios
```

### 4. Android 실행

```bash
npm run android
```

---

## 📱 주요 화면

- **홈**: 메인 대시보드
- **캘린더**: 월간/주간 뷰 전환 가능한 커스텀 캘린더
- **라이브러리**: 콘텐츠 라이브러리
- **마이페이지**: 사용자 설정

---

## 🔧 개발 환경

- Node.js
- React Native CLI
- Android Studio (Android 개발)
- Xcode (iOS 개발)
