import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import SearchSvg from '@/assets/icons/Search.svg';
import PersonSvg from '@/assets/icons/Person.svg';
import GroupSvg from '@/assets/icons/Group.svg';

function ExploreTabIcon() {
  const pathname = usePathname();
  const active = pathname.includes('explore') || pathname.includes('search');
  return <SearchSvg width={28} height={28} opacity={active ? 1 : 0.3} />;
}

function ProfileTabIcon() {
  const pathname = usePathname();
  const active = pathname.includes('profile') || pathname.includes('payment');
  return <PersonSvg width={28} height={28} opacity={active ? 1 : 0.3} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: 'rgba(0,0,0,0.3)',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { height: 80 },
        tabBarItemStyle: { justifyContent: 'center', paddingVertical: 10 },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: () => <ExploreTabIcon />,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          tabBarIcon: ({ focused }) => (
            <GroupSvg width={28} height={28} opacity={focused ? 1 : 0.3} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => <ProfileTabIcon />,
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="payment" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}
