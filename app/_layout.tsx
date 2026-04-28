import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";

export default function Layout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#9BA1A6",
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: fontsLoaded ? "Inter_400Regular" : undefined,
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="(tabs)/explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="(tabs)" options={{ href: null }} />
      <Tabs.Screen name="modal" options={{ href: null }} />
    </Tabs>
  );
}
