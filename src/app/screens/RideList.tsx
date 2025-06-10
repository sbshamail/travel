import { useEffect, useState } from 'react';
import { V, T } from '../../@core/tag';
import { listRide } from '@/actions/ride';

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
    rides?.length > 0 && (
      <V className="flex-1  p-4">
        <T className="mb-4 text-xl font-bold">Available Rides</T>
        {rides.map((ride: any, index) => (
          <V key={index} className="mb-4 rounded-xl p-4 shadow">
            <T className="text-lg font-semibold">
              {ride.fromLocation} → {ride.toLocation}
            </T>
            <T className="text-sm ">{new Date(ride.arrivalTime).toLocaleString()}</T>
            <T className="text-sm">Seats: {ride.seatsAvailable}</T>
            <T className="text-sm">Price: Rs. {ride.pricePerSeat}</T>
          </V>
        ))}
      </V>
    )
  );
}
