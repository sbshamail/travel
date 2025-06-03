import { GOOGLE_MAPS_API_KEY } from 'config';
// export const formatServerDateToUTC = (date: Date) => {
//   console.log(date);
//   return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
// };
export const formatClientDateFromUtc = (utcDateString: string): string => {
  const date = new Date(utcDateString); // automatically treated as UTC

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  const HH = String(date.getHours()).padStart(2, '0');
  const MM = String(date.getMinutes()).padStart(2, '0');

  return `${dd}-${mm}-${yyyy} ${HH}:${MM}`;
};

export const getReadableAddress = async (
  latitude: number,
  longitude: number,
  setValue?: (str: string) => void
) => {
  const apiKey = GOOGLE_MAPS_API_KEY; // Replace this
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      if (setValue) {
        setValue(data.results[0].formatted_address);
      }
      console.log(data.results[0].formatted_address);
      return data.results[0].formatted_address; // Full readable address
    } else {
      throw new Error('Geocoding failed');
    }
  } catch (err) {
    console.error('Error getting location:', err);
    return null;
  }
};
