import { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions } from 'react-native';
import { V, T } from '../../@core/tag';
import { Button } from '../../@core/tag/Button';
import { useTheme } from '../../@core/theme/themeContext';
import GooglePlacesAutoComplete from '@/components/project/GooglePlacesAutoComplete';

const { width, height } = Dimensions.get('window');

export default function SelectRouteScreen() {
  const { ct } = useTheme();
  const mapRef = useRef<MapView>(null);

  const [selecting, setSelecting] = useState<'from' | 'to' | null>(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [region, setRegion] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  console.log({ from, to });
  const handleConfirm = () => {
    if (!region) return;
    if (selecting === 'from') setFrom(region);
    else if (selecting === 'to') setTo(region);
    setSelecting(null); // close selection mode
  };

  return (
    <V className="flex-1">
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
        <V className="absolute left-1/2 top-1/2 z-10 -ml-4  bg-transparent">
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
