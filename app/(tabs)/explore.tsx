import { StyleSheet, View, ScrollView, Pressable, Text } from 'react-native';
import { useRef, useCallback } from 'react';
import { router, useFocusEffect, Href } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Inter_500Medium, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { ThemedView } from '@/components/themed-view';
import { SwipeTabWrapper } from '@/components/swipe-tab-wrapper';
import GTGLogo from '@/assets/logo/GTG_Logo.svg';

const TRIPS = [
  {
    id: '1',
    image: require('@/assets/places/CostaRicaRetreat.png'),
    title: 'Costa Rica Retreat',
    subtitle: '$5,481 total | 6 nights',
    route: null,
  },
  {
    id: '2',
    image: require('@/assets/places/ParisGetaway.png'),
    title: 'Paris Getaway',
    subtitle: '$8,591 total | 5 nights',
    route: '/paris' as Href,
  },
  {
    id: '3',
    image: require('@/assets/places/NewYork.png'),
    title: 'New York Experience',
    subtitle: '$3,507 total | 4 nights',
    route: null,
  },
];

const CARD_WIDTH = 175 + 12;

function TripCards({ scrollRef, fontsLoaded }: { scrollRef: React.RefObject<ScrollView | null>; fontsLoaded: boolean }) {
  return (
    <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
      {TRIPS.map((trip) => (
        <Pressable key={trip.id} style={styles.card} onPress={() => trip.route && router.push(trip.route)}>
          <Image source={trip.image} style={styles.cardImage} contentFit="cover" />
          <Text
            style={[styles.cardTitle, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}
            numberOfLines={1}>
            {trip.title}
          </Text>
          <Text
            style={[styles.cardSubtitle, fontsLoaded && { fontFamily: 'Inter_400Regular' }]}
            numberOfLines={1}>
            {trip.subtitle}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

export default function ExploreScreen() {
  const [fontsLoaded] = useFonts({ Inter_500Medium, Inter_400Regular, Inter_700Bold });
  const popularRef = useRef<ScrollView>(null);
  const nearbyRef = useRef<ScrollView>(null);
  const mainScrollRef = useRef<ScrollView>(null);

  useFocusEffect(useCallback(() => {
    const t = setTimeout(() => mainScrollRef.current?.scrollTo({ y: 0, animated: false }), 0);
    return () => clearTimeout(t);
  }, []));

  const scrollForward = (ref: React.RefObject<ScrollView | null>) => {
    ref.current?.scrollTo({ x: CARD_WIDTH * 1.5, animated: true });
  };

  return (
    <SwipeTabWrapper currentTab="explore">
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <GTGLogo width={100} height={50} />
      </View>
      <View style={styles.searchWrapper}>
        <Pressable style={styles.searchBar} onPress={() => router.push('/search')}>
          <Ionicons name="search" size={18} color="#9BA1A6" />
          <Text style={styles.searchText}>Search</Text>
        </Pressable>
      </View>
      <ScrollView ref={mainScrollRef} contentContainerStyle={styles.content}>
        <Pressable style={styles.sectionHeader} onPress={() => scrollForward(popularRef)}>
          <Text style={[styles.sectionTitle, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>
            Popular Trips
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#11181C" />
        </Pressable>

        <TripCards scrollRef={popularRef} fontsLoaded={!!fontsLoaded} />

        <Pressable style={[styles.sectionHeader, { marginTop: 32 }]} onPress={() => scrollForward(nearbyRef)}>
          <Text style={[styles.sectionTitle, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>
            Trips Nearby
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#11181C" />
        </Pressable>

        <TripCards scrollRef={nearbyRef} fontsLoaded={!!fontsLoaded} />
      </ScrollView>
    </ThemedView>
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
  logo: {
    width: 160,
    height: 80,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 16,
    height: 48,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchText: {
    fontSize: 15,
    color: '#9BA1A6',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
  },
  cardsScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  card: {
    width: 175,
    marginRight: 12,
  },
  cardImage: {
    width: 175,
    height: 175,
    borderRadius: 16,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6A6A6A',
    marginTop: 2,
  },
});
