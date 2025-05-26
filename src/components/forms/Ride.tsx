import { ScrollView } from 'react-native';
import { V, T, TInput } from '@/@core/tag';
import { Button } from '@/@core/tag/Button';
import { useTheme } from '@/@core/theme/themeContext';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';

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
    arrivalTime: yup.date().required('Arrival time is required'),
  })
  .required();

export default function RideForm() {
  const { ct } = useTheme();
  const [showDate, setShowDate] = useState(false);

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
      arrivalTime: new Date(),
    },
  });

  const onSubmit = (data: any) => {
    console.log('Ride data:', data);
  };

  return (
    <ScrollView className="flex-1 gap-2 bg-background p-4">
      <T className="mb-4 text-center text-xl font-bold">Create Ride</T>
      <V className="flex-1 flex-col gap-2">
        <Controller
          control={control}
          name="carName"
          render={({ field: { onChange, value } }) => {
            console.log(errors);
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
          render={({ field: { onChange, value } }) => (
            <TInput
              placeholder="Car Type"
              value={value}
              onChangeText={onChange}
              error={errors?.carType}
            />
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
        <>
          <Button variant="ghost" onPress={() => setShowDate(true)}>
            Pick Date
            {/* : {watch('arrivalTime')?.toLocaleString() || 'Select'} */}
          </Button>
          <Controller
            control={control}
            name="arrivalTime"
            rules={{ required: 'Arrival time is required' }}
            render={({ field }) => (
              <T className="mb-2 text-sm text-muted">
                {field.value ? new Date(field.value).toLocaleString() : 'No date selected'}
              </T>
            )}
          />
          {errors.arrivalTime && <T className="text-red-500">{errors.arrivalTime.message}</T>}
          <DateTimePickerModal
            isVisible={showDate}
            mode="datetime"
            onConfirm={(date) => {
              setShowDate(false);
              setValue('arrivalTime', date);
            }}
            onCancel={() => setShowDate(false)}
          />
        </>
        <Button variant="primary" className="mt-4" onPress={handleSubmit(onSubmit)}>
          Submit Ride
        </Button>
      </V>
    </ScrollView>
  );
}
