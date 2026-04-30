import { StyleSheet, View, Text, Pressable, ScrollView, ImageBackground, TouchableHighlight } from 'react-native';
import { useRef, useCallback } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';
import { Image } from 'expo-image';
import PlaneSvg from '@/assets/icons/plane.svg';
import DateSvg from '@/assets/icons/date.svg';
import PackagesCalendarSvg from '@/assets/icons/PackagesCalendar.svg';

const trips = [
  { name: 'Costa Rica', image: require('@/assets/horizontal/CostaRicaHorizontal.png') },
  { name: 'Paris', image: require('@/assets/horizontal/ParisHorizontal.png') },
  { name: 'Singapore', image: require('@/assets/horizontal/SingaporeHorizontal.png') },
];

export default function PaymentScreen() {
  const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_500Medium });
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(useCallback(() => {
    const t = setTimeout(() => scrollRef.current?.scrollTo({ y: 0, animated: false }), 0);
    return () => clearTimeout(t);
  }, []));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={[styles.title, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Payment</Text>
      </View>
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.cardShadow}>
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.cardTopContent}>
                <Text style={[styles.totalDueLabel, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>TOTAL DUE</Text>
                <View style={styles.amountRow}>
                  <Text style={[styles.dollarSign, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>$</Text>
                  <Text style={[styles.amount, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>6790</Text>
                </View>
                <Text style={[styles.subLabel, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>
                  Across 3 upcoming trips • Due Apr 1, 2026
                </Text>
              </View>
            </View>
            <View style={styles.cardBottom}>
              <View style={styles.cardBottomLeft}>
                <PlaneSvg width={24} height={24} />
                <View>
                  <Text style={[styles.bottomTitle, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>3 Trips</Text>
                  <Text style={[styles.bottomSubtitle, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>Upcoming</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.cardBottomRight}>
                <DateSvg width={24} height={24} />
                <View>
                  <Text style={[styles.bottomTitle, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Apr 1</Text>
                  <Text style={[styles.bottomSubtitle, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>Due Date</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Your Packages</Text>

        {trips.map((trip) => (
          <View key={trip.name} style={styles.tripCardShadow}>
            <ImageBackground source={trip.image} style={styles.tripCard} imageStyle={styles.tripCardImage}>
              <View style={styles.tripCardOverlay} />
              <View style={styles.tripCardContent}>
                <View style={styles.tripCardRow}>
                  <View style={styles.tripCardLeft}>
                    <View style={styles.upcomingPill}>
                      <Ionicons name="star" size={10} color="#FFFFFF" />
                      <Text style={[styles.upcomingPillText, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>Upcoming</Text>
                    </View>
                    <Text style={[styles.tripName, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>{trip.name}</Text>
                    <View style={styles.tripDateRow}>
                      <PackagesCalendarSvg width={14} height={14} />
                      <Text style={[styles.tripDate, fontsLoaded && { fontFamily: 'Inter_500Medium' }]}>Due Apr 1, 2026</Text>
                    </View>
                  </View>
                  <TouchableHighlight style={styles.arrowButton} underlayColor="#B84D2E" onPress={() => {}}>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                  </TouchableHighlight>
                </View>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  scroll: {
    paddingBottom: 32,
  },
  cardShadow: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 200,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardTop: {
    flex: 1.8,
    backgroundColor: '#E8613A',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 16,
    paddingLeft: 16,
  },
  cardTopContent: {
    alignItems: 'flex-start',
  },
  totalDueLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.5,
    marginBottom: 6,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  dollarSign: {
    fontSize: 20,
    color: '#FFFFFF',
    opacity: 0.75,
  },
  amount: {
    fontSize: 48,
    color: '#FFFFFF',
    lineHeight: 52,
  },
  subLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.5,
  },
  cardBottom: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBottomLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  divider: {
    width: 1,
    height: '50%',
    backgroundColor: '#D0D0D0',
  },
  cardBottomRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  bottomIcon: {
    width: 24,
    height: 24,
  },
  bottomTitle: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  bottomSubtitle: {
    fontSize: 11,
    color: '#888888',
  },
  sectionTitle: {
    fontSize: 25,
    color: '#1A1A1A',
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  tripCardShadow: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  tripCard: {
    height: 128,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  tripCardImage: {
    borderRadius: 16,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tripCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 16,
  },
  tripCardContent: {
    padding: 16,
  },
  tripCardRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  tripCardLeft: {
    alignItems: 'flex-start',
  },
  arrowButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8613A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
    marginBottom: 6,
  },
  upcomingPillText: {
    fontSize: 11,
    color: '#FFFFFF',
  },
  tripName: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  tripDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  calendarIcon: {
    width: 14,
    height: 14,
  },
  tripDate: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});
