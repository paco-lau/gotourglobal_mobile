import { StyleSheet, View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';

export default function PaymentScreen() {
  const [fontsLoaded] = useFonts({ Inter_700Bold });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={[styles.title, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>Payment</Text>
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
});
