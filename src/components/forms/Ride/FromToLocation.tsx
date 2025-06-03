import { useEffect, useState } from 'react';
import { T, TInput, V } from '@/@core/tag';

import { Button } from '@/@core/tag/Button';
import { getReadableAddress } from '@/utils/helpers';
import { Card } from '@/components/wrapper';
import { Modal } from 'react-native';
import SelectRouteJourney from '@/components/project/SelectRouteJourney';
import { Controller } from 'react-hook-form';

interface ILocation {
  latitude: number;
  longitude: number;
}
export const FromToLocation = ({ setValue, control, errors }: any) => {
  const [from, setFrom] = useState<ILocation | null>(null);
  const [to, setTo] = useState<ILocation | null>(null);
  const [routeModal, setRouteModal] = useState(false);
  useEffect(() => {
    if (from) {
      setValue('from', from);
      const setFromLocation = (loc: string) => {
        setValue('fromLocation', loc);
      };
      getReadableAddress(from.latitude, from.longitude, setFromLocation);
    }
  }, [from, setValue]);

  useEffect(() => {
    if (to) {
      setValue('to', to);
      const setToLocation = (loc: string) => {
        setValue('toLocation', loc);
      };
      getReadableAddress(to.latitude, to.longitude, setToLocation);
    }
  }, [setValue, to]);

  return (
    <>
      <V className="flex-row items-center  gap-2">
        <Button
          variant="ghost"
          className="border border-purple-600"
          onPress={() => setRouteModal(true)}>
          {from && to ? 'Change Location' : 'Select Location'}
        </Button>
        <T className="text-xs text-muted-foreground">
          {from && to ? (
            'From & To selected ✅'
          ) : (
            <T className="text-red-500">Select From & To Required</T>
          )}
        </T>
      </V>
      {(from || to) && (
        <Card className="w-full p-2 ">
          {from && (
            <V>
              <T className="text-muted-foreground">From Location:</T>
              <Controller
                control={control}
                name="fromLocation"
                render={({ field: { onChange, value } }) => {
                  return (
                    <TInput
                      placeholder="From Location"
                      value={value}
                      onChangeText={onChange}
                      error={errors?.fromLocation}
                    />
                  );
                }}
              />
            </V>
          )}
          {to && (
            <V>
              <T className="text-muted-foreground">To Location: </T>
              <Controller
                control={control}
                name="toLocation"
                render={({ field: { onChange, value } }) => {
                  return (
                    <TInput
                      placeholder="To Location"
                      value={value}
                      onChangeText={onChange}
                      error={errors?.toLocation}
                    />
                  );
                }}
              />
            </V>
          )}
        </Card>
      )}

      <Modal visible={routeModal} animationType="slide">
        <SelectRouteJourney
          from={from}
          to={to}
          setFrom={setFrom}
          setTo={setTo}
          onDone={() => setRouteModal(false)}
        />
      </Modal>
    </>
  );
};
