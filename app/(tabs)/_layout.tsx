import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { Image } from 'expo-image';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

import { HapticTab } from '@/components/haptic-tab';

function ExploreTabIcon() {
  const pathname = usePathname();
  const active = pathname.includes('explore') || pathname.includes('search');
  return (
    <Image
      source={require('@/assets/icons/Search.svg')}
      style={{ width: 28, height: 28, opacity: active ? 1 : 0.4 }}
    />
  );
}

function ExploreTabLabel() {
  const pathname = usePathname();
  const active = pathname.includes('explore') || pathname.includes('search');
  return (
    <Text style={{ fontSize: 12, fontFamily: 'Inter_400Regular', color: active ? '#000000' : '#9BA1A6' }}>
      Explore
    </Text>
  );
}

export default function TabLayout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#9BA1A6',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { height: 100 },
        tabBarItemStyle: { justifyContent: 'center', paddingVertical: 10 },
        tabBarLabelStyle: {
          fontFamily: fontsLoaded ? 'Inter_400Regular' : undefined,
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: () => <ExploreTabIcon />,
          tabBarLabel: () => <ExploreTabLabel />,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/icons/Group.svg')}
              style={{ width: 28, height: 28, opacity: focused ? 1 : 0.4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/icons/Person.svg')}
              style={{ width: 28, height: 28, opacity: focused ? 1 : 0.4 }}
            />
          ),
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}
