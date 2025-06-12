// components/RideList/FilterDrawer.tsx
import { useEffect, useState } from 'react';
import { V, T, TInput } from '@/@core/tag';
import { Button } from '@/@core/tag/Button';
import { SelectDropdown } from '@/@core/tag/SelectDropdown';
import { Modal, Pressable } from 'react-native';
import * as Location from 'expo-location';
import { KeyboardInputScroll } from '@/components/wrapper/KeyboardInputScroll';

const carTypes = [
  { label: 'Car', value: 'car' },
  { label: 'Van', value: 'van' },
  { label: 'Box', value: 'box' },
  { label: 'Jeep', value: 'jeep' },
  { label: 'Other', value: 'other' },
];

interface FilterRideType {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}
export default function FilterRide({
  visible,
  onClose,
  onApply,
}: FilterRideType) {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [carType, setCarType] = useState<Record<string, any>>();
  const [useNearby, setUseNearby] = useState(false);
  const [radius, setRadius] = useState('20');
  const [filterValues, setFilterValues] = useState<boolean>();

  const handleClearFilters = () => {
    setFromLocation('');
    setToLocation('');
    setCarType(undefined);
    setUseNearby(false);
    setRadius('20');
    setFilterValues(false);
    // onApply(undefined);
    // onClose();
  };

  const handleGeolocationFilter = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      let data: Record<string, any> = {};
      if (useNearby) {
        data.fromLat = location.coords.latitude;
        data.fromLng = location.coords.longitude;
        data.radiusfrom = parseInt(radius);
      }
      onApply({
        fromLocation,
        toLocation,
        carType: carType?.value,
        ...data,
      });
      setFilterValues(true);
      onClose();
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <V className="absolute inset-0 items-center justify-end bg-black/60"></V>
      <KeyboardInputScroll>
        <V className="mt-16 max-w-[300px] flex-1 gap-4 rounded-t-2xl bg-card p-4">
          <V className="mb-4 flex flex-row items-center justify-between bg-transparent ">
            <T className="text-lg font-bold">Filter Rides</T>
            {filterValues && (
              <Button
                variant="ghost"
                className="mt-2"
                onPress={handleClearFilters}>
                Clear Filters
              </Button>
            )}
          </V>
          <TInput
            label="From"
            value={fromLocation}
            onChangeText={setFromLocation}
            placeholder="e.g. G-11 Islamabad"
          />
          <TInput
            label="To"
            value={toLocation}
            onChangeText={setToLocation}
            placeholder="e.g. Blue Area"
          />
          <SelectDropdown
            label="Car Type"
            value={carType}
            onChange={setCarType}
            data={carTypes}
          />

          <V className="mt-4 flex flex-row gap-4 rounded-sm border border-accent  bg-transparent p-2">
            <T className="mb-1">Use Nearby Location</T>
            <Pressable onPress={() => setUseNearby(!useNearby)}>
              <V
                className={`h-6 w-6 rounded border border-muted-foreground ${useNearby ? 'bg-primary' : 'bg-border'}`}
              />
            </Pressable>
          </V>

          {useNearby && (
            <TInput
              label="Radius (kms)"
              value={radius}
              onChangeText={setRadius}
              keyboardType="numeric"
            />
          )}

          <Button className="mt-6" onPress={handleGeolocationFilter}>
            Apply Filters
          </Button>
          <Button variant="ghost" className="mt-2" onPress={onClose}>
            Cancel
          </Button>
        </V>
      </KeyboardInputScroll>
    </Modal>
  );
}
