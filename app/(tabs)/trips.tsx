import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useState, useRef } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';

export default function TripsScreen() {
  const [fontsLoaded] = useFonts({ Inter_700Bold });
  const [active, setActive] = useState<'upcoming' | 'past'>('upcoming');
  const slideX = useSharedValue(0);

  const [tabWidth, setTabWidth] = useState(0);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  const select = (tab: 'upcoming' | 'past') => {
    setActive(tab);
    slideX.value = withTiming(tab === 'upcoming' ? 0 : tabWidth, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>
          My Trips
        </Text>
      </View>

      <View
        style={styles.tabBar}
        onLayout={(e) => setTabWidth(e.nativeEvent.layout.width / 2)}>
        <Animated.View style={[styles.indicator, { width: tabWidth }, indicatorStyle]} />
        <Pressable style={styles.tab} onPress={() => select('upcoming')}>
          <Text style={[styles.tabText, fontsLoaded && { fontFamily: 'Inter_700Bold' }, active === 'upcoming' && styles.tabTextActive]}>
            Upcoming
          </Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => select('past')}>
          <Text style={[styles.tabText, fontsLoaded && { fontFamily: 'Inter_700Bold' }, active === 'past' && styles.tabTextActive]}>
            Past
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EAE6',
  },
  header: {
    height: 128,
    backgroundColor: '#E46F44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#E46F44',
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
});
