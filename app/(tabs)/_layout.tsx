import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'expo-image';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#9BA1A6',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: fontsLoaded ? 'Inter_400Regular' : undefined,
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/icons/Search.svg')}
              style={{ width: 28, height: 28, opacity: focused ? 1 : 0.4 }}
            />
          ),
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
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
