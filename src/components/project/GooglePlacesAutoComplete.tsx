import React from 'react';
import 'react-native-get-random-values';
import { GOOGLE_MAPS_API_KEY } from 'config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { V } from '@/@core/tag';
import { View } from 'react-native';

const GooglePlacesAutoComplete = ({ selecting, mapRef, setFrom, setTo }) => {
  const handlePlaceSelect = (data, details) => {
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    if (selecting === 'from') {
      setFrom(location);
      mapRef.current?.animateToRegion({
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      setTo(location);
      mapRef.current?.animateToRegion({
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };
  return (
    selecting && (
      <V className="absolute left-4 right-4 top-8 rounded-xl bg-white shadow-lg">
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          fetchDetails={true}
          onPress={handlePlaceSelect}
          debounce={200}
          enablePoweredByContainer={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          minLength={2}
          timeout={10000}
          keyboardShouldPersistTaps="handled"
          listViewDisplayed="auto"
          keepResultsAfterBlur={false}
          currentLocation={false}
          currentLocationLabel="Current location"
          enableHighAccuracyLocation={true}
          onFail={() => console.warn('Google Places Autocomplete failed')}
          onNotFound={() => console.log('No results found')}
          onTimeout={() => console.warn('Google Places request timeout')}
          predefinedPlaces={[]}
          predefinedPlacesAlwaysVisible={false}
          styles={{
            textInputContainer: {
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              marginHorizontal: 20,
              position: 'relative',
              shadowColor: '#d4d4d4',
            },
            textInput: {
              backgroundColor: 'white',
              fontWeight: '600',
              fontSize: 16,
              marginTop: 5,
              width: '100%',
              fontFamily: 'JakartaSans-Medium',
              color: '#000',
            },
            listView: {
              backgroundColor: 'white',
              position: 'relative',
              top: 0,
              width: '100%',
              zIndex: 99,
              borderRadius: 10,
              shadowColor: '#d4d4d4',
            },
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
            types: 'geocode',
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            radius: 1000, // <-- REQUIRED if using 'distance'
          }}
          renderLeftButton={() => (
            <View className="h-6 w-6 items-center justify-center"></View>
          )}
          textInputProps={{
            placeholderTextColor: 'gray',
            placeholder: 'Where do you want to go?',
          }}
        />
      </V>
    )
  );
};

export default GooglePlacesAutoComplete;
