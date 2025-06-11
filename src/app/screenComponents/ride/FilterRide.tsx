// components/RideList/FilterDrawer.tsx
import { useState } from 'react';
import { V, T, TInput } from '@/@core/tag';
import { Button } from '@/@core/tag/Button';
import { SelectDropdown } from '@/@core/tag/SelectDropdown';

import { Modal, Pressable } from 'react-native';
import * as Location from 'expo-location';
import { Card } from '@/components/wrapper';

const carTypes = [
  { label: 'Car', value: 'car' },
  { label: 'Van', value: 'van' },
  { label: 'Box', value: 'box' },
  { label: 'Jeep', value: 'jeep' },
  { label: 'Other', value: 'other' },
];

export default function FilterRide({ visible, onClose, onApply }: any) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [carType, setCarType] = useState('');
  const [useNearby, setUseNearby] = useState(false);
  const [radius, setRadius] = useState('5000');

  const handleGeolocationFilter = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      onApply({
        from,
        to,
        carType,
        geolocation: useNearby
          ? {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              radius: parseInt(radius),
            }
          : null,
      });
      onClose();
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <V className="mt-16 w-8/12 flex-1 rounded-t-2xl bg-card  p-4">
        <T className="mb-4 text-lg font-bold">Filter Rides</T>

        <TInput
          label="From"
          value={from}
          onChangeText={setFrom}
          placeholder="e.g. G-11 Islamabad"
        />
        <TInput label="To" value={to} onChangeText={setTo} placeholder="e.g. Blue Area" />
        <SelectDropdown label="Car Type" value={carType} onChange={setCarType} data={carTypes} />

        <V className="mt-4 bg-transparent">
          <T className="mb-1">Use Nearby Location</T>
          <Pressable onPress={() => setUseNearby(!useNearby)}>
            <V
              className={`h-6 w-6 rounded border border-border ${useNearby ? 'bg-primary' : 'bg-border'}`}
            />
          </Pressable>
        </V>

        {useNearby && (
          <TInput
            label="Radius (meters)"
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
    </Modal>
  );
}
