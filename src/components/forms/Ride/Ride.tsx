import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { V, T, TInput } from '@/@core/tag';
import { Button } from '@/@core/tag/Button';
import { useTheme } from '@/@core/theme/themeContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePickerHook } from '@/@core/tag/DatePicker';
import { SelectDropdown } from '@/@core/tag/SelectDropdown';
import { SingleImagePicker } from '../../previewImages/SingleImagePicker';
import { MultiImagePicker } from '../../previewImages/MultiImagePicker';
import { createRide } from '@/actions/ride';
import { Loader } from '../../loader/Loader';

import { FromToLocation } from './FromToLocation';
import { Toastify } from '@/components/toast/Toastify';
const schema = yup
  .object({
    carName: yup.string().required('Car name is required'),
    carNumber: yup.string().required('Car number is required'),
    carType: yup.string().required('Car type is required'),
    carModel: yup.number().optional(),
    seatsAvailable: yup
      .number()
      .typeError('Must be a number')
      .required('Seats required')
      .min(1, 'At least one seat'),
    pricePerSeat: yup.number().optional(),
    totalPrice: yup.number().optional(),
    notes: yup.string().optional(),
    arrivalTime: yup.string().required('Arrival time is required'),
    from: yup
      .object({
        latitude: yup.number().required(),
        longitude: yup.number().required(),
      })
      .required('From location is required'),
    to: yup
      .object({
        latitude: yup.number().required(),
        longitude: yup.number().required(),
      })
      .required('To location is required'),
    fromLocation: yup.string().required('From Location is required'),
    toLocation: yup.string().required('To Location is required'),
  })
  .required();

export default function RideForm() {
  const { ct } = useTheme();
  const [showDate, setShowDate] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUris, setImageUris] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      from: undefined,
      to: undefined,
      fromLocation: '',
      toLocation: '',
      carName: '',
      carNumber: '',
      carType: '',
      carModel: undefined,
      seatsAvailable: undefined,
      pricePerSeat: undefined,
      notes: '',
      arrivalTime: new Date().toISOString(),
    },
  });
  console.log(errors);
  const onSubmit = async (data: any) => {
    const { totalPrice, pricePerSeat } = data;
    if (!totalPrice && !pricePerSeat) {
      return Toastify('error', 'One is required Total Price Or Price Per Seat');
    }
    const res = await createRide(imageUri, imageUris, data, setLoading);

    reset();
    setImageUri(null);
    setImageUris([]);

    console.log(res);
  };
  const carTypes = [
    { label: 'Car', value: 'car' },
    { label: 'Van', value: 'van' },
    { label: 'Box', value: 'box' },
    { label: 'Jeep', value: 'jeep' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <ScrollView className="flex-1 gap-2 bg-background p-4 pb-20">
      <Loader loading={loading} />
      <T className="mb-4 text-center text-xl font-bold">Create Ride</T>
      <V className="flex-1 flex-col gap-2">
        <V className="w-[120px] flex-1 items-center justify-center ">
          <SingleImagePicker
            imageUri={imageUri}
            setImageUri={setImageUri}
            title={'Pick Car Image'}
            previewImageClass={`${!imageUri ? 'border border-red-500' : ''} `}
          />
        </V>
        <FromToLocation setValue={setValue} control={control} errors={errors} />
        <Controller
          control={control}
          name="carName"
          render={({ field: { onChange, value } }) => {
            return (
              <TInput
                placeholder="Car Name"
                value={value}
                onChangeText={onChange}
                error={errors?.carName}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="carNumber"
          render={({ field: { onChange, value } }) => (
            <TInput
              placeholder="Car Number"
              value={value}
              onChangeText={onChange}
              error={errors?.carNumber}
            />
          )}
        />

        <Controller
          control={control}
          name="carType"
          rules={{ required: 'Car type is required' }}
          render={({ field: { onChange, value } }) => (
            <V className="mb-4">
              <SelectDropdown
                data={carTypes}
                onChange={(t: any) => onChange(t.value)}
                value={value}
                error={errors.carType}
              />
            </V>
          )}
        />

        <Controller
          control={control}
          name="carModel"
          render={({ field: { onChange, value } }) => (
            <TInput
              keyboardType="numeric"
              placeholder="Car Model (Optional)"
              value={value?.toString()}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="seatsAvailable"
          render={({ field: { onChange, value } }) => (
            <TInput
              placeholder="Seats Available"
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={(text) => onChange(Number(text))}
              error={errors?.seatsAvailable}
            />
          )}
        />

        <Controller
          control={control}
          name="pricePerSeat"
          render={({ field: { onChange, value } }) => (
            <TInput
              placeholder="Price Per Seat (optional)"
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={(text) => onChange(Number(text))}
            />
          )}
        />
        <Controller
          control={control}
          name="totalPrice"
          render={({ field: { onChange, value } }) => (
            <TInput
              placeholder="Whole Vehicle Booking Price (optional)"
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={(text) => onChange(Number(text))}
            />
          )}
        />

        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <TInput
              placeholder="Notes"
              multiline
              numberOfLines={3}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <DatePickerHook
          setShowDate={setShowDate}
          showDate={showDate}
          control={control}
          error={errors.arrivalTime}
          setValue={(date: string) => setValue('arrivalTime', date)}
        />
        <V>
          <MultiImagePicker imageUris={imageUris} setImageUris={setImageUris} />
        </V>
        <V className="pb-4">
          <Button
            variant="primary"
            className="mt-4 "
            onPress={handleSubmit(onSubmit)}>
            Submit Ride
          </Button>
        </V>
      </V>
    </ScrollView>
  );
}
