import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRef, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { SwipeTabWrapper } from '@/components/swipe-tab-wrapper';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import BarcodeSvg from '@/assets/icons/barcode.svg';
import MyTripsSvg from '@/assets/icons/MyTrips.svg';
import PostTripSvg from '@/assets/icons/PostTrip.svg';
import PaymentSvg from '@/assets/icons/Payment.svg';

export default function ProfileScreen() {
  const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular, Inter_600SemiBold });
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(useCallback(() => {
    const t = setTimeout(() => scrollRef.current?.scrollTo({ y: 0, animated: false }), 0);
    return () => clearTimeout(t);
  }, []));

  return (
    <SwipeTabWrapper currentTab="profile">
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>
          Profile
        </Text>
      </View>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      <View style={styles.cardsRow}>
        <View style={styles.cardSmall}>
          <Text style={[styles.profileName, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>First, Last</Text>
          <View style={styles.profilePicture} />
          <Text style={[styles.profileLocation, fontsLoaded && { fontFamily: 'Inter_400Regular' }]}>City, State</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cardLarge}>
          <View style={styles.cardLargeInner}>
            <View style={styles.statsBlock}>
              <View style={styles.statRow}>
                <Text style={[styles.statTitle, fontsLoaded && { fontFamily: 'Inter_600SemiBold' }]}>Trips Taken</Text>
                <Text style={[styles.statValue, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>0</Text>
              </View>
              <View style={styles.statDivider}><View style={styles.statDividerLine} /></View>
              <View style={styles.statRow}>
                <Text style={[styles.statTitle, fontsLoaded && { fontFamily: 'Inter_600SemiBold' }]}>New Locations</Text>
                <Text style={[styles.statValue, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>0</Text>
              </View>
              <View style={styles.statDivider}><View style={styles.statDividerLine} /></View>
              <View style={styles.statRow}>
                <Text style={[styles.statTitle, fontsLoaded && { fontFamily: 'Inter_600SemiBold' }]}>Posts</Text>
                <Text style={[styles.statValue, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>0</Text>
              </View>
            </View>
            <BarcodeSvg width={48} height="100%" />
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Account</Text>

      <View style={styles.accountList}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push({ pathname: '/(tabs)/trips', params: { tab: 'upcoming' } })} style={styles.accountItem}>
          <View style={styles.accountIcon}><MyTripsSvg width={18} height={18} /></View>
          <Text style={[styles.accountLabel, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>My Trips</Text>
          <Ionicons name="chevron-forward" size={20} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push({ pathname: '/(tabs)/trips', params: { tab: 'past' } })} style={styles.accountItem}>
          <View style={styles.accountIcon}><PostTripSvg width={18} height={18} /></View>
          <Text style={[styles.accountLabel, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Post Trip</Text>
          <Ionicons name="chevron-forward" size={20} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/(tabs)/payment')} style={styles.accountItem}>
          <View style={styles.accountIcon}><PaymentSvg width={18} height={18} /></View>
          <Text style={[styles.accountLabel, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Payment</Text>
          <Ionicons name="chevron-forward" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
      </ScrollView>
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
  cardsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 0,
  },
  cardSmall: {
    flex: 2,
    height: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  profileName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
  },
  profileLocation: {
    fontSize: 12,
    color: '#000000',
  },
  divider: {
    width: 1.5,
    borderStyle: 'dashed',
    borderLeftWidth: 1.5,
    borderColor: '#000000',
    alignSelf: 'stretch',
    marginVertical: 16,
  },
  cardLarge: {
    flex: 3,
    height: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardLargeInner: {
    flexDirection: 'row',
    alignItems: 'stretch',
    flex: 1,
    gap: 12,
  },
  statsBlock: {
    flex: 1,
    gap: 4,
    justifyContent: 'center',
  },
  barcode: {
    width: 48,
    alignSelf: 'stretch',
  },
  statRow: {
    gap: 2,
  },
  statTitle: {
    fontSize: 12,
    color: '#000000',
  },
  statValue: {
    fontSize: 20,
    color: '#E8613A',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    marginHorizontal: 32,
    marginTop: 24,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  accountList: {
    marginHorizontal: 16,
    marginTop: 12,
    gap: 16,
  },
  accountItem: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  accountIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#FFF3EE',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  accountLabel: {
    fontSize: 20,
    color: '#E8613A',
    marginLeft: 12,
    flex: 1,
  },
  statDivider: {
    marginVertical: 4,
    height: 2,
    justifyContent: 'center',
  },
  statDividerLine: {
    height: 1.5,
    borderRadius: 1,
    borderWidth: 0.75,
    borderColor: '#000000',
    borderStyle: 'dashed',
  },
});
