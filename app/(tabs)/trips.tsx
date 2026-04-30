import { StyleSheet, View, Text, Pressable, ImageBackground, ScrollView, TouchableHighlight } from 'react-native';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalSearchParams, useFocusEffect, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Image } from 'expo-image';
import { SwipeTabWrapper } from '@/components/swipe-tab-wrapper';
import UpcomingSvg from '@/assets/icons/Upcoming.svg';
import PastSvg from '@/assets/icons/Past.svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

export default function TripsScreen() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular, Inter_500Medium });
  const [active, setActive] = useState<'upcoming' | 'past'>('upcoming');
  const listScrollRef = useRef<ScrollView>(null);
  const [tabWidth, setTabWidth] = useState(0);
  const slideX = useSharedValue(0);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  useFocusEffect(useCallback(() => {
    const t = setTimeout(() => listScrollRef.current?.scrollTo({ y: 0, animated: false }), 0);
    return () => clearTimeout(t);
  }, []));

  useEffect(() => {
    const next = tab === 'past' ? 'past' : 'upcoming';
    setActive(next);
    slideX.value = withTiming(next === 'past' ? tabWidth : 0, { duration: 250, easing: Easing.inOut(Easing.ease) });
  }, [tab, tabWidth]);

  const select = (t: 'upcoming' | 'past') => {
    setActive(t);
    slideX.value = withTiming(t === 'past' ? tabWidth : 0, { duration: 250, easing: Easing.inOut(Easing.ease) });
  };

  return (
    <SwipeTabWrapper currentTab="trips">
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
          <UpcomingSvg width={16} height={16} />
          <Text style={[styles.tabText, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>
            Upcoming
          </Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => select('past')}>
          <PastSvg width={16} height={16} />
          <Text style={[styles.tabText, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>
            Past
          </Text>
        </Pressable>
      </View>

      {(active === 'upcoming' || active === 'past') && (
        <ScrollView ref={listScrollRef} contentContainerStyle={styles.destinationList} showsVerticalScrollIndicator={false} style={styles.tripList}>
          {(active === 'upcoming' ? [
            { label: 'Costa Rica', subtitle: 'Mar 18 - Mar 25', image: require('../../assets/horizontal/CostaRicaHorizontal.png'), route: null },
            { label: 'Paris', subtitle: 'Mar 18 - Mar 25', image: require('../../assets/horizontal/ParisHorizontal.png'), route: '/paris' },
            { label: 'Singapore', subtitle: 'Mar 18 - Mar 25', image: require('../../assets/horizontal/SingaporeHorizontal.png'), route: null },
          ] : [
            { label: 'San Francisco', subtitle: 'Mar 8 - Mar 15', image: require('../../assets/horizontal/SanFranciscoHorizontal.png'), route: null },
            { label: 'New York City', subtitle: 'Mar 8 - Mar 15', image: require('../../assets/horizontal/NewYorkCityHorizontal.png'), route: null },
          ]).map(({ label, subtitle, image, route }) => (
            <Pressable key={label} style={styles.destinationCard} onPress={() => route && router.push(route as any)}>
              <ImageBackground source={image} style={styles.destinationImage} imageStyle={styles.destinationImageStyle} resizeMode="cover">
                <View style={styles.cardOverlay} />
                <View style={styles.cardContent}>
                  <View style={styles.cardTopLeft}>
                    <Text style={[styles.destinationLabel, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>{label}</Text>
                    <Text style={[styles.destinationSubtitle, fontsLoaded && { fontFamily: 'Inter_400Regular' }]}>{subtitle}</Text>
                  </View>
                  <View style={styles.cardBottomRight}>
                    <TouchableHighlight style={styles.arrowButton} underlayColor="#B84D2E" onPress={() => route && router.push(route as any)}>
                      <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                    </TouchableHighlight>
                  </View>
                </View>
              </ImageBackground>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
    </SwipeTabWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EAE6',
  },
  header: {
    height: 128,
    backgroundColor: '#E8613A',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 16,
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
    borderRadius: 999,
    overflow: 'hidden',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#E8613A',
    borderRadius: 999,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 999,
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tripList: {
    marginTop: 20,
  },
  destinationList: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 32,
    gap: 16,
  },
  destinationCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
  },
  destinationImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  destinationImageStyle: {
    borderRadius: 16,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  cardTopLeft: {},
  cardBottomRight: {
    alignSelf: 'flex-end',
  },
  arrowButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8613A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  destinationSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 2,
  },
});
