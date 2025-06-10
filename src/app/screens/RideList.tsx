import { useEffect, useState } from 'react';
import { V, T } from '../../@core/tag';
import { listRide } from '@/actions/ride';
import { Image } from 'react-native';
const carPlaceholder = 'https://via.placeholder.com/320x180?text=No+Image';
export default function RideList() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchListRide = async () => {
    const data = await listRide();
    setRides(data || []);
  };
  useEffect(() => {
    fetchListRide();
  }, []);

  return (
    rides &&
    rides.length > 0 && (
      <V className="min-h-screen flex-1 bg-gray-50 p-4">
        <T className="mb-6 text-center text-2xl font-extrabold text-indigo-700">Available Rides</T>
        <V className="grid grid-cols-2 gap-6 ">
          {rides.map((ride: any, index) => (
            <V
              key={index}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-105">
              <Image
                source={{ uri: ride.carPic || carPlaceholder }}
                style={{
                  width: '100%',
                  height: 120,
                }}
                resizeMode="cover"
              />
              <V style={{ padding: 12 }}>
                <T>
                  {ride.fromLocation} → {ride.toLocation}
                </T>
                <T>{new Date(ride.arrivalTime).toLocaleString()}</T>
                <T>
                  {ride.carName} {ride.carModel ? `(${ride.carModel})` : ''}
                </T>
                <T>
                  {ride.carType} • {ride.carNumber}
                </T>
                <T>
                  Rs {ride.pricePerSeat}
                  {ride.negotiable ? <T> (Negotiable)</T> : null}
                </T>
                <T>Seats: {ride.seatsAvailable}</T>
                {ride.notes ? <T>{ride.notes}</T> : null}
              </V>
            </V>
          ))}
        </V>
      </V>
    )
  );
}
