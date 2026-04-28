import { StyleSheet, View, Text } from 'react-native';
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';

export default function ProfileScreen() {
  const [fontsLoaded] = useFonts({ Inter_700Bold });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, fontsLoaded && { fontFamily: 'Inter_700Bold' }]}>
          Profile
        </Text>
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
    height: 300,
    backgroundColor: '#E46F44',
    paddingHorizontal: 20,
    paddingTop: 56,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
