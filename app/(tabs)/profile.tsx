import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

export default function ProfileScreen() {
  const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular, Inter_600SemiBold });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>
          Profile
        </Text>
      </View>

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
              <View style={styles.statDivider} />
              <View style={styles.statRow}>
                <Text style={[styles.statTitle, fontsLoaded && { fontFamily: 'Inter_600SemiBold' }]}>New Locations</Text>
                <Text style={[styles.statValue, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>0</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statRow}>
                <Text style={[styles.statTitle, fontsLoaded && { fontFamily: 'Inter_600SemiBold' }]}>Posts</Text>
                <Text style={[styles.statValue, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>0</Text>
              </View>
            </View>
            <Image source={require('@/assets/icons/barcode.svg')} style={styles.barcode} contentFit="contain" />
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Account</Text>

      <View style={styles.accountList}>
        {[
          { label: 'My Trips', icon: require('@/assets/icons/MyTrips.svg'), onPress: () => router.push({ pathname: '/(tabs)/trips', params: { tab: 'upcoming' } }) },
          { label: 'Post Trip', icon: require('@/assets/icons/PostTrip.svg'), onPress: () => router.push({ pathname: '/(tabs)/trips', params: { tab: 'past' } }) },
          { label: 'Payment', icon: require('@/assets/icons/Payment.svg'), onPress: () => router.push('/(tabs)/payment') },
        ].map(({ label, icon, onPress }) => (
          <Pressable key={label} onPress={onPress} style={({ pressed }) => [styles.accountItem, pressed && { opacity: 0.7 }]}>
            <View style={styles.accountIcon}>
              <Image source={icon} style={styles.accountIconImage} contentFit="contain" />
            </View>
            <Text style={[styles.accountLabel, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>{label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#000000" style={styles.accountChevron} />
          </Pressable>
        ))}
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
    color: '#E46F44',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    marginHorizontal: 32,
    marginTop: 24,
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
  },
  accountIconImage: {
    width: 18,
    height: 18,
  },
  accountLabel: {
    fontSize: 20,
    color: '#E46F44',
    marginLeft: 12,
    flex: 1,
  },
  accountChevron: {
    marginLeft: 'auto',
  },
  statDivider: {
    borderBottomWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#000000',
    marginVertical: 4,
  },
});
