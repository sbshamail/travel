import { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Dimensions } from 'react-native';
import { V, T } from '../../@core/tag';
import { Button } from '../../@core/tag/Button';
import { useTheme } from '../../@core/theme/themeContext';

const { width, height } = Dimensions.get('window');

export default function SelectRouteScreen() {
  const { ct } = useTheme();
  const mapRef = useRef(null);
  const [selecting, setSelecting] = useState<'from' | 'to'>('from');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const handlePlaceSelect = (data, details) => {
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    if (selecting === 'from') {
      setFrom(location);
      mapRef.current?.animateToRegion({ ...location, latitudeDelta: 0.01, longitudeDelta: 0.01 });
    } else {
      setTo(location);
      mapRef.current?.animateToRegion({ ...location, latitudeDelta: 0.01, longitudeDelta: 0.01 });
    }
  };

  return (
    <V className="flex-1">
      <MapView
        ref={mapRef}
        style={{ width, height }}
        initialRegion={{
          latitude: 33.6844,
          longitude: 73.0479,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {from && (
          <Marker
            draggable
            coordinate={from}
            pinColor="green"
            onDragEnd={(e) => setFrom(e.nativeEvent.coordinate)}
          />
        )}
        {to && (
          <Marker
            draggable
            coordinate={to}
            pinColor="red"
            onDragEnd={(e) => setTo(e.nativeEvent.coordinate)}
          />
        )}
      </MapView>

      <V className="absolute left-4 right-4 top-8 rounded-xl bg-white shadow-lg">
        {/* <GooglePlacesAutocomplete
          placeholder={selecting === 'from' ? 'Select From Location' : 'Select To Location'}
          onPress={handlePlaceSelect}
          fetchDetails
          query={{
            key: 'YOUR_GOOGLE_API_KEY',
            language: 'en',
          }}
          styles={{
            textInput: {
              borderRadius: 10,
              fontSize: 16,
            },
          }}
        /> */}
      </V>

      <V className="absolute bottom-10 left-4 right-4 flex-row justify-between px-4">
        <Button
          variant={selecting === 'from' ? 'primary' : 'outline'}
          onPress={() => setSelecting('from')}>
          Set From
        </Button>
        <Button
          variant={selecting === 'to' ? 'primary' : 'outline'}
          onPress={() => setSelecting('to')}>
          Set To
        </Button>
      </V>
    </V>
  );
}
