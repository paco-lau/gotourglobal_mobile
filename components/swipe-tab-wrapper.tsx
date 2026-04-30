import { useRouter, useFocusEffect } from 'expo-router';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { StyleSheet, Dimensions, View } from 'react-native';
import { useCallback } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const TAB_ORDER = ['explore', 'trips', 'profile'] as const;
const SCREEN_WIDTH = Dimensions.get('window').width;

// Module-level so the incoming tab can read it on focus
let pendingSwipeDirection: 'left' | 'right' | null = null;

interface Props {
  currentTab: typeof TAB_ORDER[number];
  children: React.ReactNode;
}

export function SwipeTabWrapper({ currentTab, children }: Props) {
  const router = useRouter();
  const translateX = useSharedValue(0);

  // When this tab gains focus after a swipe, slide in from the appropriate side
  useFocusEffect(
    useCallback(() => {
      if (pendingSwipeDirection) {
        const startX = pendingSwipeDirection === 'left' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        translateX.value = startX;
        translateX.value = withTiming(0, {
          duration: 280,
          easing: Easing.out(Easing.ease),
        });
        pendingSwipeDirection = null;
      }
    }, [])
  );

  const doNavigate = (path: string, direction: 'left' | 'right') => {
    pendingSwipeDirection = direction;
    router.navigate(path as any);
  };

  const swipe = Gesture.Pan()
    .activeOffsetX([-15, 15])
    .failOffsetY([-20, 20])
    .onUpdate((e) => {
      const idx = TAB_ORDER.indexOf(currentTab);
      const canGoLeft = e.translationX < 0 && idx < TAB_ORDER.length - 1;
      const canGoRight = e.translationX > 0 && idx > 0;
      if (canGoLeft || canGoRight) {
        translateX.value = e.translationX;
      }
    })
    .onEnd((e) => {
      const idx = TAB_ORDER.indexOf(currentTab);
      const goNext = e.translationX < -50 && e.velocityX < -200 && idx < TAB_ORDER.length - 1;
      const goPrev = e.translationX > 50 && e.velocityX > 200 && idx > 0;

      if (goNext) {
        translateX.value = withTiming(
          -SCREEN_WIDTH,
          { duration: 220, easing: Easing.out(Easing.ease) },
          () => {
            runOnJS(doNavigate)(`/(tabs)/${TAB_ORDER[idx + 1]}`, 'left');
            translateX.value = 0;
          }
        );
      } else if (goPrev) {
        translateX.value = withTiming(
          SCREEN_WIDTH,
          { duration: 220, easing: Easing.out(Easing.ease) },
          () => {
            runOnJS(doNavigate)(`/(tabs)/${TAB_ORDER[idx - 1]}`, 'right');
            translateX.value = 0;
          }
        );
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={swipe}>
      <View style={styles.clip}>
        <Animated.View style={[styles.container, animatedStyle]}>
          {children}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  clip: { flex: 1, overflow: 'hidden' },
  container: { flex: 1, backgroundColor: '#F0EAE6' },
});
