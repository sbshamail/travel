import { useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, Pressable } from 'react-native';
import { V, T } from '../../@core/tag';
import { Button } from '../../@core/tag/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../@core/theme/themeContext';
import GooglePlacesAutoComplete from '@/components/project/GooglePlacesAutoComplete';

const { width, height } = Dimensions.get('window');

interface ILocation {
  latitude: number;
  longitude: number;
}
interface SelectRouteJourneyProps {
  from: ILocation | null;
  to: ILocation | null;
  setFrom: (location: ILocation) => void;
  setTo: (location: ILocation) => void;
  onDone: () => void;
}

export default function SelectRouteJourney({
  from,
  to,
  setFrom,
  setTo,
  onDone,
}: SelectRouteJourneyProps) {
  const { ct } = useTheme();
  const mapRef = useRef<MapView>(null);

  const [selecting, setSelecting] = useState<'from' | 'to' | null>(null);
  const [region, setRegion] = useState({
    latitude: from?.latitude ?? 33.6844,
    longitude: from?.longitude ?? 73.0479,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const handleConfirm = () => {
    if (!region) return;
    if (selecting === 'from') setFrom(region);
    else if (selecting === 'to') setTo(region);
    setSelecting(null); // close selection mode
  };

  return (
    <V className=" flex-1">
      <MapView
        ref={mapRef}
        style={{ width, height }}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChangeComplete={setRegion}>
        {from && <Marker coordinate={from} pinColor="green" />}
        {to && <Marker coordinate={to} pinColor="red" />}
      </MapView>

      {/* Fixed marker pointer */}
      {selecting && (
        <V className="absolute left-1/2 top-1/2 z-10 -ml-4 -mt-8 -translate-y-1/2 bg-transparent">
          <T className="mb-2 text-center text-sm font-semibold text-muted">
            Move map to select {selecting === 'from' ? 'Start' : 'Destination'}
          </T>
          <V className="h-8 w-8 rounded-full border-[4px] border-white bg-blue-600 shadow" />
        </V>
      )}
      <GooglePlacesAutoComplete
        selecting={selecting}
        mapRef={mapRef}
        setFrom={setFrom}
        setTo={setTo}
      />
      <V className="absolute left-4 top-10 !bg-transparent ">
        <Pressable onPress={onDone} className="rounded-full border border-border p-2">
          <Icon name="arrow-back" size={24} color={ct['muted-foreground']} />
        </Pressable>
      </V>
      {/* Bottom buttons */}
      <V className="absolute bottom-10 left-4 right-4 gap-4 bg-transparent px-4">
        {!selecting ? (
          <V className="flex-row justify-between bg-transparent">
            <Button variant="primary" onPress={() => setSelecting('from')}>
              Set From
            </Button>
            <Button variant="primary" onPress={() => setSelecting('to')}>
              Set To
            </Button>
          </V>
        ) : (
          <Button variant="primary" onPress={handleConfirm}>
            <T>Confirm {selecting === 'from' ? 'From' : 'To'} Location</T>
          </Button>
        )}
      </V>
    </V>
  );
}
