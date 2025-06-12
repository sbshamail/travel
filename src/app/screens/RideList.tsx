import { useEffect, useState } from 'react';
import { V, T } from '../../@core/tag';
import { Button } from '../../@core/tag/Button';
import { listRide } from '@/actions/ride';
import { FlatList, Image } from 'react-native';
import RideListCard from '../screenComponents/ride/RideListCard';
import { Loader } from '@/components/loader/Loader';
import FilterRide from '../screenComponents/ride/FilterRide';
const carPlaceholder = 'https://via.placeholder.com/320x180?text=No+Image';
export default function RideList() {
  const [rides, setRides] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchListRide = async () => {
    const data = await listRide(setLoading);
    setRides(data || []);
  };
  useEffect(() => {
    fetchListRide();
  }, []);

  const loadRides = async (filters = {}) => {};

  return (
    <>
      <V className="flex items-end">
        <Button
          variant="outline"
          onPress={() => setFilterVisible(true)}
          className="mx-4 my-2 w-40">
          Open Filters
        </Button>
      </V>
      <V className="flex-1 gap-2 px-4">
        <Loader loading={loading} />

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
      </V>
      <FilterRide
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(filters: any) => loadRides(filters)}
      />
    </>
  );
}
