import { StyleSheet, View, Pressable, Text, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';

const SUGGESTIONS = [
  { id: '1', image: require('@/assets/places/CostaRicaRetreat.png'), title: 'Costa Rica Retreat', subtitle: '$5,481 total | 6 nights' },
  { id: '2', image: require('@/assets/places/ParisGetaway.png'), title: 'Paris Getaway', subtitle: '$8,591 total | 5 nights' },
  { id: '3', image: require('@/assets/places/NewYork.png'), title: 'New York Experience', subtitle: '$3,507 total | 4 nights' },
];

const NAVBAR_TRIP_TYPES: { label: string; icon: React.ComponentProps<typeof Ionicons>['name'] }[] = [
  { label: 'Solo', icon: 'person-outline' },
  { label: 'Group', icon: 'people-outline' },
  { label: 'Cruise', icon: 'boat-outline' },
];

const TRIP_KIND_OPTIONS = ['All', 'Beach', 'Mountainous', 'Adventure', 'City/Urban', 'Other'];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const EXPANDED_DEST = 300;
const EXPANDED_DATE = 360;
const EXPANDED_TRIP = 120;
const EXPANDED_TRIP_OPEN = 310;
const EXPANDED_VISITORS = 210;
const COLLAPSED = 64;

type Section = 'destination' | 'date' | 'tripType' | 'visitors' | null;

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isBetween(d: Date, start: Date, end: Date) {
  return d > start && d < end;
}

function CalendarPicker({ departure, returnDate, onSelect }: {
  departure: Date | null;
  returnDate: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <View>
      <View style={cal.header}>
        <Pressable onPress={prevMonth} style={cal.navBtn}>
          <Ionicons name="chevron-back" size={18} color="#333" />
        </Pressable>
        <Text style={cal.monthLabel}>{MONTHS[viewMonth]} {viewYear}</Text>
        <Pressable onPress={nextMonth} style={cal.navBtn}>
          <Ionicons name="chevron-forward" size={18} color="#333" />
        </Pressable>
      </View>
      <View style={cal.weekRow}>
        {WEEKDAYS.map(d => <Text key={d} style={cal.weekday}>{d}</Text>)}
      </View>
      {Array.from({ length: cells.length / 7 }, (_, row) => (
        <View key={row} style={cal.weekRow}>
          {cells.slice(row * 7, row * 7 + 7).map((day, col) => {
            if (!day) return <View key={col} style={cal.cell} />;
            const date = new Date(viewYear, viewMonth, day);
            const isDepart = departure && isSameDay(date, departure);
            const isReturn = returnDate && isSameDay(date, returnDate);
            const inRange = departure && returnDate && isBetween(date, departure, returnDate);
            const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return (
              <Pressable
                key={col}
                style={[
                  cal.cell,
                  inRange && cal.inRange,
                  isDepart && cal.selected,
                  isDepart && returnDate && cal.selectedStart,
                  isReturn && cal.selected,
                  isReturn && cal.selectedEnd,
                ]}
                onPress={() => !isPast && onSelect(date)}>
                <Text style={[cal.dayText, isPast && cal.pastDay, (isDepart || isReturn) && cal.selectedText]}>
                  {day}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default function SearchScreen() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold });
  const [selected, setSelected] = useState<string>('Solo');
  const [activeSection, setActiveSection] = useState<Section>('destination');
  const [departure, setDeparture] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [tripKind, setTripKind] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const destHeight = useSharedValue(EXPANDED_DEST);
  const dateHeight = useSharedValue(COLLAPSED);
  const tripHeight = useSharedValue(COLLAPSED);
  const visitorsHeight = useSharedValue(COLLAPSED);

  const destStyle = useAnimatedStyle(() => ({ height: destHeight.value, overflow: 'hidden' }));
  const dateStyle = useAnimatedStyle(() => ({ height: dateHeight.value, overflow: 'hidden' }));
  const tripStyle = useAnimatedStyle(() => ({ height: tripHeight.value, overflow: 'hidden' }));
  const visitorsStyle = useAnimatedStyle(() => ({ height: visitorsHeight.value, overflow: 'hidden' }));

  const timing = (val: Animated.SharedValue<number>, to: number) => {
    val.value = withTiming(to, { duration: 300, easing: Easing.inOut(Easing.ease) });
  };

  const activate = (section: Section) => {
    const next = section === activeSection ? null : section;
    setActiveSection(next);
    setDropdownOpen(false);
    timing(destHeight, next === 'destination' ? EXPANDED_DEST : COLLAPSED);
    timing(dateHeight, next === 'date' ? EXPANDED_DATE : COLLAPSED);
    timing(tripHeight, next === 'tripType' ? EXPANDED_TRIP : COLLAPSED);
    timing(visitorsHeight, next === 'visitors' ? EXPANDED_VISITORS : COLLAPSED);
  };

  const handleDateSelect = (date: Date) => {
    if (!departure || (departure && returnDate)) {
      setDeparture(date); setReturnDate(null);
    } else {
      if (date < departure) { setDeparture(date); setReturnDate(null); }
      else setReturnDate(date);
    }
  };

  const fmt = (d: Date | null) => d ? `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}` : '—';

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <View style={styles.tripTypes}>
          {NAVBAR_TRIP_TYPES.map((type) => {
            const isSelected = selected === type.label;
            return (
              <Pressable
                key={type.label}
                style={[styles.typeButton, isSelected && styles.typeButtonSelected]}
                onPress={() => setSelected(type.label)}>
                <Ionicons name={type.icon} size={28} color={isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.35)'} />
                <Text style={[styles.typeLabel, !isSelected && { opacity: 0.35 }]}>{type.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {/* Destination block */}
      <View style={styles.cardWrapper}>
        <Animated.View style={[styles.card, destStyle]}>
          <Pressable onPress={() => activate('destination')}>
            <Text style={[styles.cardTitle, activeSection !== 'destination' && styles.cardTitleDimmed]}>
              Destination
            </Text>
          </Pressable>
          {activeSection === 'destination' && (
            <>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={16} color="#9BA1A6" />
                <TextInput style={styles.searchInput} placeholder="Where to?" placeholderTextColor="#9BA1A6" />
              </View>
              <Text style={styles.subtitle}>Suggested Experiences</Text>
              <ScrollView style={styles.suggestionsList} showsVerticalScrollIndicator={false}>
                {SUGGESTIONS.map((item) => (
                  <Pressable key={item.id} style={styles.suggestionRow}>
                    <Image source={item.image} style={styles.suggestionImage} contentFit="cover" />
                    <View style={styles.suggestionText}>
                      <Text style={styles.suggestionTitle}>{item.title}</Text>
                      <Text style={styles.suggestionSubtitle}>{item.subtitle}</Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </>
          )}
        </Animated.View>
      </View>

      {/* Date block */}
      <View style={styles.cardWrapper}>
        <Animated.View style={[styles.card, dateStyle]}>
          <Pressable onPress={() => activate('date')}>
            <Text style={[styles.cardTitle, activeSection !== 'date' && styles.cardTitleDimmed]}>
              Date
            </Text>
          </Pressable>
          {activeSection === 'date' && (
            <>
              <View style={styles.dateRow}>
                <View style={styles.datePill}>
                  <Text style={styles.datePillLabel}>Departure</Text>
                  <Text style={styles.datePillValue}>{fmt(departure)}</Text>
                </View>
                <Ionicons name="arrow-forward" size={16} color="#9BA1A6" />
                <View style={styles.datePill}>
                  <Text style={styles.datePillLabel}>Return</Text>
                  <Text style={styles.datePillValue}>{fmt(returnDate)}</Text>
                </View>
              </View>
              <CalendarPicker departure={departure} returnDate={returnDate} onSelect={handleDateSelect} />
            </>
          )}
        </Animated.View>
      </View>

      {/* Type of Trip block */}
      <View style={styles.cardWrapper}>
        <Animated.View style={[styles.card, tripStyle]}>
          <Pressable onPress={() => activate('tripType')}>
            <Text style={[styles.cardTitle, activeSection !== 'tripType' && styles.cardTitleDimmed]}>
              Type of Trip
            </Text>
          </Pressable>
          {activeSection === 'tripType' && (
            <View>
              <Pressable
                style={styles.dropdownTrigger}
                onPress={() => {
                  const next = !dropdownOpen;
                  setDropdownOpen(next);
                  timing(tripHeight, next ? EXPANDED_TRIP_OPEN : EXPANDED_TRIP);
                }}>
                <Text style={styles.dropdownValue}>{tripKind}</Text>
                <Ionicons name="chevron-down" size={16} color="#11181C" />
              </Pressable>
              {dropdownOpen && (
                <ScrollView style={styles.dropdownList} showsVerticalScrollIndicator={false} nestedScrollEnabled>
                  {TRIP_KIND_OPTIONS.map((option) => (
                    <Pressable
                      key={option}
                      style={[styles.dropdownItem, option === tripKind && styles.dropdownItemSelected]}
                      onPress={() => { setTripKind(option); setDropdownOpen(false); timing(tripHeight, EXPANDED_TRIP); }}>
                      <Text style={[styles.dropdownItemText, option === tripKind && styles.dropdownItemTextSelected]}>
                        {option}
                      </Text>
                      {option === tripKind && <Ionicons name="checkmark" size={16} color="#E8613A" />}
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </View>
          )}
        </Animated.View>
      </View>

      {/* Visitors block */}
      <View style={styles.cardWrapper}>
        <Animated.View style={[styles.card, visitorsStyle]}>
          <Pressable onPress={() => activate('visitors')}>
            <View style={[styles.visitorTitleRow, activeSection !== 'visitors' && { marginBottom: 0 }]}>
              <Text style={[styles.cardTitle, { marginBottom: 0 }, activeSection !== 'visitors' && styles.cardTitleDimmed]}>
                Visitors
              </Text>
              {activeSection === 'visitors' && selected === 'Solo' && (
                <Text style={styles.visitorLocked}>Not available for solo trips</Text>
              )}
            </View>
          </Pressable>
          {activeSection === 'visitors' && (
            <View style={styles.visitorRows}>
              {([
                { label: 'Adults', value: adults, set: setAdults, min: 1 },
                { label: 'Children', value: children, set: setChildren, min: 0 },
                { label: 'Infants', value: infants, set: setInfants, min: 0 },
              ] as const).map((row) => {
                const locked = selected === 'Solo';
                return (
                  <View key={row.label} style={[styles.visitorRow, locked && { opacity: 0.35 }]}>
                    <Text style={styles.visitorLabel}>{row.label}</Text>
                    <View style={styles.counter}>
                      <Pressable
                        style={[styles.counterBtn, (locked || row.value <= row.min) && styles.counterBtnDisabled]}
                        onPress={() => !locked && row.value > row.min && row.set(row.value - 1)}>
                        <Ionicons name="remove" size={16} color={locked || row.value <= row.min ? '#CCC' : '#11181C'} />
                      </Pressable>
                      <Text style={styles.counterValue}>{row.value}</Text>
                      <Pressable
                        style={[styles.counterBtn, locked && styles.counterBtnDisabled]}
                        onPress={() => !locked && row.set(row.value + 1)}>
                        <Ionicons name="add" size={16} color={locked ? '#CCC' : '#11181C'} />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </Animated.View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.inquiryBtn}>
          <Text style={styles.inquiryText}>Inquiry Form</Text>
        </Pressable>
        <Pressable style={styles.searchBtn}>
          <Ionicons name="search" size={16} color="#FFFFFF" />
          <Text style={styles.searchBtnText}>Search</Text>
        </Pressable>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0EAE6' },
  header: { height: 128, backgroundColor: '#E8613A', paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12, justifyContent: 'space-between' },
  backButton: { alignSelf: 'flex-start' },
  tripTypes: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 48 },
  typeButton: { alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  typeButtonSelected: { backgroundColor: 'rgba(255,255,255,0.25)' },
  typeLabel: { fontSize: 12, color: '#FFFFFF', fontFamily: 'Inter_500Medium' },
  cardWrapper: { marginHorizontal: 16, marginTop: 12 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  cardTitle: { fontSize: 20, fontFamily: 'Inter_500Medium', fontWeight: 'bold', color: '#11181C', marginBottom: 10 },
  cardTitleDimmed: { color: '#AAAAAA', marginBottom: 0 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8, borderWidth: 1, borderColor: '#000000', paddingHorizontal: 14, height: 44, gap: 8 },
  subtitle: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#6A6A6A', marginTop: 16 },
  suggestionsList: { marginTop: 8 },
  suggestionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, paddingLeft: 12 },
  suggestionImage: { width: 35, height: 35, borderRadius: 6 },
  suggestionText: { flex: 1, gap: 2 },
  suggestionTitle: { fontSize: 14, fontFamily: 'Inter_500Medium', color: '#000000' },
  suggestionSubtitle: { fontSize: 12, fontFamily: 'Inter_500Medium', color: '#6A6A6A' },
  searchInput: { flex: 1, fontSize: 14, color: '#11181C', fontFamily: 'Inter_500Medium' },
  dateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 },
  datePill: { flex: 1, backgroundColor: '#F0EAE6', borderRadius: 10, padding: 10, alignItems: 'center' },
  datePillLabel: { fontSize: 11, color: '#9BA1A6', fontFamily: 'Inter_400Regular' },
  datePillValue: { fontSize: 15, color: '#11181C', fontFamily: 'Inter_600SemiBold', marginTop: 2 },
  scrollContent: { paddingBottom: 32 },
  actions: { flexDirection: 'row', gap: 12, marginHorizontal: 16, marginTop: 16 },
  inquiryBtn: { flex: 1, height: 48, borderRadius: 14, borderWidth: 1.5, borderColor: '#E8613A', alignItems: 'center', justifyContent: 'center' },
  inquiryText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#E8613A' },
  searchBtn: { flex: 1, height: 48, borderRadius: 14, backgroundColor: '#E8613A', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  searchBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#FFFFFF' },
  visitorTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  visitorLocked: { fontSize: 12, fontFamily: 'Inter_400Regular', color: '#E8613A' },
  visitorRows: { gap: 12 },
  visitorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  visitorLabel: { fontSize: 15, fontFamily: 'Inter_500Medium', color: '#11181C' },
  counter: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  counterBtn: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: '#E0E0E0', alignItems: 'center', justifyContent: 'center' },
  counterBtnDisabled: { borderColor: '#F0F0F0' },
  counterValue: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#11181C', minWidth: 20, textAlign: 'center' },
  dropdownTrigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12 },
  dropdownValue: { fontSize: 15, color: '#11181C', fontFamily: 'Inter_500Medium' },
  dropdownList: { marginTop: 6, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, overflow: 'hidden', maxHeight: 180 },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12 },
  dropdownItemSelected: { backgroundColor: '#FFF5F0' },
  dropdownItemText: { fontSize: 14, color: '#11181C', fontFamily: 'Inter_400Regular' },
  dropdownItemTextSelected: { color: '#E8613A', fontFamily: 'Inter_500Medium' },
});

const cal = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  navBtn: { padding: 4 },
  monthLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: '#11181C' },
  weekRow: { flexDirection: 'row' },
  weekday: { flex: 1, textAlign: 'center', fontSize: 11, color: '#9BA1A6', fontFamily: 'Inter_400Regular', paddingBottom: 4 },
  cell: { flex: 1, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 17 },
  inRange: { backgroundColor: '#FDEBD9', borderRadius: 0 },
  selected: { backgroundColor: '#E8613A', borderRadius: 17 },
  selectedStart: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  selectedEnd: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
  dayText: { fontSize: 13, color: '#11181C', fontFamily: 'Inter_400Regular' },
  pastDay: { color: '#CCCCCC' },
  selectedText: { color: '#FFFFFF', fontFamily: 'Inter_600SemiBold' },
});
