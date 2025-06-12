import { V, T } from '@/@core/tag';
import { Button } from '@/@core/tag/Button';
import { Image } from 'react-native';
import { Card } from '@/components/wrapper';
import { formatClientDateFromUtc } from '@/utils/helpers';
export default function RideListCard({ ride }: { ride: any }) {
  return (
    <>
      <Card className="mb-4 h-96 w-[49%] overflow-hidden rounded-2xl p-0  shadow-md ">
        <Image
          source={{ uri: ride.carPic }}
          style={{ height: 180, width: 180 }}
          resizeMode="cover"
        />
        <V className="bg-transparent p-2">
          <T className="text-sm font-bold text-primary ">
            From: <T className="font-normal">{ride.fromLocation}</T>
          </T>
          <T className="text-sm font-bold text-primary">
            To: <T className="font-normal">{ride.toLocation}</T>
          </T>
          <T className="mt-1 text-sm text-primary">
            Arrival Time:
            <T className="font-normal">
              {formatClientDateFromUtc(ride.arrivalTime)}{' '}
            </T>
          </T>
        </V>
      </Card>
    </>
  );
}
