import { StyleSheet, View, Text, Pressable, ImageBackground, ScrollView } from 'react-native';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Image } from 'expo-image';

export default function TripsScreen() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular, Inter_500Medium });
  const [active, setActive] = useState<'upcoming' | 'past'>('upcoming');
  const slideX = useSharedValue(0);

  const [tabWidth, setTabWidth] = useState(0);
  const listScrollRef = useRef<ScrollView>(null);

  useFocusEffect(useCallback(() => {
    const t = setTimeout(() => listScrollRef.current?.scrollTo({ y: 0, animated: false }), 0);
    return () => clearTimeout(t);
  }, []));

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  useEffect(() => {
    const next = tab === 'past' ? 'past' : 'upcoming';
    setActive(next);
    slideX.value = withTiming(next === 'past' ? tabWidth : 0, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    });
  }, [tab]);

  const select = (t: 'upcoming' | 'past') => {
    setActive(t);
    slideX.value = withTiming(t === 'upcoming' ? 0 : tabWidth, {
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
          <Image source={require('@/assets/icons/Upcoming.svg')} style={styles.tabIcon} />
          <Text style={[styles.tabText, fontsLoaded && { fontFamily: 'Inter_500Medium' }, active === 'upcoming' && styles.tabTextActive]}>
            Upcoming
          </Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => select('past')}>
          <Image source={require('@/assets/icons/Past.svg')} style={styles.tabIcon} />
          <Text style={[styles.tabText, fontsLoaded && { fontFamily: 'Inter_500Medium' }, active === 'past' && styles.tabTextActive]}>
            Past
          </Text>
        </Pressable>
      </View>

      {(active === 'upcoming' || active === 'past') && (
        <ScrollView ref={listScrollRef} contentContainerStyle={styles.destinationList} showsVerticalScrollIndicator={false}>
          {(active === 'upcoming' ? [
            { label: 'Costa Rica', subtitle: 'Mar 18 - Mar 25', image: require('../../assets/horizontal/CostaRicaHorizontal.png') },
            { label: 'Paris', subtitle: 'Mar 18 - Mar 25', image: require('../../assets/horizontal/ParisHorizontal.png') },
            { label: 'Singapore', subtitle: 'Mar 18 - Mar 25', image: require('../../assets/horizontal/SingaporeHorizontal.png') },
          ] : [
            { label: 'San Francisco', subtitle: 'Mar 8 - Mar 15', image: require('../../assets/horizontal/SanFranciscoHorizontal.png') },
            { label: 'New York City', subtitle: 'Mar 8 - Mar 15', image: require('../../assets/horizontal/NewYorkCityHorizontal.png') },
          ]).map(({ label, subtitle, image }) => (
            <Pressable key={label} style={styles.destinationCard}>
              <ImageBackground source={image} style={styles.destinationImage} imageStyle={styles.destinationImageStyle} resizeMode="cover">
                <View style={styles.cardOverlay} />
                <View style={styles.cardContent}>
                  <View style={styles.cardTopLeft}>
                    <Text style={[styles.destinationLabel, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>{label}</Text>
                    <Text style={[styles.destinationSubtitle, fontsLoaded && { fontFamily: 'Inter_400Regular' }]}>{subtitle}</Text>
                  </View>
                  <View style={styles.cardBottomRight}>
                    <View style={styles.arrowButton}>
                      <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </Pressable>
          ))}
        </ScrollView>
      )}
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
  destinationList: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
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
