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
import { SingleImagePicker } from '../previewImages/SingleImagePicker';
import { MultiImagePicker } from '../previewImages/MultiImagePicker';

const schema = yup
  .object({
    carName: yup.string().required('Car name is required'),
    carNumber: yup.string().required('Car number is required'),
    carType: yup.string().required('Car type is required'),
    carModel: yup.string().optional(),
    seatsAvailable: yup
      .number()
      .typeError('Must be a number')
      .required('Seats required')
      .min(1, 'At least one seat'),
    pricePerSeat: yup.number().typeError('Must be a number').optional(),
    notes: yup.string().optional(),
    arrivalTime: yup.string().required('Arrival time is required'),
  })
  .required();

export default function RideForm() {
  const { ct } = useTheme();
  const [showDate, setShowDate] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      carName: '',
      carNumber: '',
      carType: '',
      carModel: '',
      seatsAvailable: undefined,
      pricePerSeat: undefined,
      notes: '',
      arrivalTime: new Date().toISOString(),
    },
  });

  const onSubmit = (data: any) => {
    console.log('Ride data:', data);
  };
  const carTypes = [
    { label: 'Car', value: 'car' },
    { label: 'Van', value: 'van' },
    { label: 'Box', value: 'box' },
    { label: 'Jeep', value: 'jeep' },
    { label: 'Other', value: 'other' },
  ];
  console.log(watch());
  return (
    <ScrollView className="flex-1 gap-2 bg-background p-4">
      <T className="mb-4 text-center text-xl font-bold">Create Ride</T>
      <V className="flex-1 flex-col gap-2">
        <V className="w-[100px]">
          <SingleImagePicker
            imageUri={imageUri}
            setImageUri={setImageUri}
            title={'Pick Car Image'}
          />
        </V>
        {/* <MultiImagePicker /> */}
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
            <TInput placeholder="Car Model" value={value} onChangeText={onChange} />
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
              placeholder="Price Per Seat (Optional)"
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

        <Button variant="primary" className="mt-4" onPress={handleSubmit(onSubmit)}>
          Submit Ride
        </Button>
      </V>
    </ScrollView>
  );
}
