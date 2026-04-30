import { StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchSvg from '@/assets/icons/Search.svg';
import GroupSvg from '@/assets/icons/Group.svg';
import PersonSvg from '@/assets/icons/Person.svg';

const DAYS = [
  { date: 'Mar 18', dow: 'Wednesday' },
  { date: 'Mar 19', dow: 'Thursday' },
  { date: 'Mar 20', dow: 'Friday' },
  { date: 'Mar 21', dow: 'Saturday' },
  { date: 'Mar 22', dow: 'Sunday' },
];

export default function ParisScreen() {
  const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular, Inter_600SemiBold });
  const [selectedDay, setSelectedDay] = useState(0);
  const [heroWidth, setHeroWidth] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Hero — 200px + safe area top */}
        <View
          style={[styles.hero, { height: 200 + insets.top }]}
          onLayout={(e) => setHeroWidth(e.nativeEvent.layout.width)}>
          {heroWidth > 0 && (
            <Image
              source={require('../assets/places/ParisGetaway.png')}
              style={{ position: 'absolute', top: 0, left: 0, width: heroWidth, height: 200 + insets.top }}
              resizeMode="cover"
            />
          )}
          <View style={styles.heroOverlay} />
          <Pressable style={[styles.backButton, { marginTop: insets.top + 12 }]} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </Pressable>
          <View style={styles.heroContent}>
            <Text style={[styles.heroTitle, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>
              PARIS
            </Text>
            <Text style={[styles.heroSubtitle, fontsLoaded && { fontFamily: 'Inter_400Regular' }]}>
              France{' • '}5 Days
            </Text>
          </View>
        </View>

        {/* Day selector */}
        <Text style={[styles.selectDayLabel, fontsLoaded && { fontFamily: 'Inter_600SemiBold' }]}>
          SELECT DAY
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayCarousel}>
          {DAYS.map((d, i) => {
            const active = selectedDay === i;
            return (
              <Pressable
                key={d.date}
                onPress={() => setSelectedDay(i)}
                style={[styles.dayCard, active && styles.dayCardActive]}>
                <Text style={[
                  styles.dayDate,
                  fontsLoaded && { fontFamily: 'Inter_400Regular' },
                  active && styles.dayTextActive,
                ]}>
                  {d.date}
                </Text>
                <Text style={[
                  styles.dayDow,
                  fontsLoaded && { fontFamily: 'Inter_400Regular' },
                  active && styles.dayTextActive,
                ]}>
                  {d.dow}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

      </ScrollView>

      {/* Bottom navbar */}
      <View style={styles.navbar}>
        <Pressable style={styles.navItem} onPress={() => router.replace('/(tabs)/explore')}>
          <SearchSvg width={28} height={28} opacity={0.3} />
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.replace('/(tabs)/trips')}>
          <GroupSvg width={28} height={28} opacity={1} />
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.replace('/(tabs)/profile')}>
          <PersonSvg width={28} height={28} opacity={0.3} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F0EAE6',
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Hero
  hero: {
    height: 200,
    justifyContent: 'space-between',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  backButton: {
    marginLeft: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    padding: 16,
    paddingBottom: 20,
  },
  heroTitle: {
    fontSize: 40,
    color: '#FFFFFF',
    lineHeight: 46,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },

  // Day selector
  selectDayLabel: {
    fontSize: 8,
    color: '#000000',
    marginTop: 16,
    marginLeft: 16,
    letterSpacing: 0.5,
  },
  dayCarousel: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 8,
  },
  dayCard: {
    backgroundColor: '#F8D7CB',
    borderRadius: 10,
    width: 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCardActive: {
    backgroundColor: '#E8613A',
  },
  dayDate: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 3,
  },
  dayDow: {
    fontSize: 8,
    color: '#E8613A',
  },
  dayTextActive: {
    color: '#F6E9E9',
  },

  // Navbar
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
