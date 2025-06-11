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
  const apiKey = GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const components = data.results[0].address_components;

      const sector =
        components.find(
          (c: any) => c.types.includes('sublocality') || c.types.includes('neighborhood')
        )?.long_name || '';

      const city =
        components.find(
          (c: any) =>
            c.types.includes('locality') || c.types.includes('administrative_area_level_2')
        )?.long_name || '';

      // we do array to handle if sector not found
      const parts = [];
      if (sector) parts.push(sector);
      if (city) parts.push(city);

      const formatted = parts.join(', ');

      if (setValue) {
        setValue(formatted);
      }

      console.log(formatted);
      return formatted;
    } else {
      throw new Error('Geocoding failed');
    }
  } catch (err) {
    console.error('Error getting location:', err);
    return null;
  }
};
