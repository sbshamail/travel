import { useEffect, useState } from 'react';
import { T, V } from '../../@core/tag';
import { Button } from '../../@core/tag/Button';
import { listRide } from '@/actions/ride';
import { FlatList } from 'react-native';
import RideListCard from '../screenComponents/ride/RideListCard';
import { Loader } from '@/components/loader/Loader';
import FilterRide from '../screenComponents/ride/FilterRide';
export default function RideList() {
  const [rides, setRides] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchListRide = async (
    query: Record<string, any> | undefined = undefined
  ) => {
    const data = await listRide({ query, setLoading, setValue: setRides });
  };
  useEffect(() => {
    fetchListRide();
  }, []);

  const loadRides = async (filters: Record<string, any> | undefined) => {
    fetchListRide(filters);
  };

  return (
    <>
      <V className="flex items-end">
        <Button
          variant="outline"
          onPress={() => {
            setFilterVisible(true);
          }}
          className="mx-4 my-2 w-40">
          {'Open Filters'}
        </Button>
      </V>
      <V className="flex-1 gap-2 px-4">
        <Loader loading={loading} />
        {rides && rides?.length > 0 ? (
          <FlatList
            data={rides}
            keyExtractor={(item: any) => item._id}
            renderItem={({ item }) => <RideListCard ride={item} />}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              gap: 2, // spacing between items horizontally
            }}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        ) : (
          <T>No Data Found</T>
        )}
      </V>
      <FilterRide
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(filters: any) => loadRides(filters)}
      />
    </>
  );
}
