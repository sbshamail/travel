import { Control, Controller, FieldError } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { T, V } from '.';
import { Button } from './Button';
import { Dispatch, SetStateAction } from 'react';
import { formatClientDateFromUtc } from '@/utils/helpers';

interface DatePickerHookProps {
  control: Control<any>; // Replace `any` with your actual form schema if available
  error?: FieldError;
  showDate: boolean;
  setShowDate: Dispatch<SetStateAction<boolean>>;
  setValue: (date: string) => void;
}
export const DatePickerHook = ({
  setShowDate,
  showDate,
  control,
  error,
  setValue,
}: DatePickerHookProps) => {
  return (
    <V className=" w-full !bg-accent">
      <Button variant="ghost" onPress={() => setShowDate(true)}>
        Pick Date
        {/* : {watch('arrivalTime')?.toLocaleString() || 'Select'} */}
      </Button>
      <Controller
        control={control}
        name="arrivalTime"
        rules={{ required: 'Arrival time is required' }}
        render={({ field }) => (
          <T className="mb-2 text-sm text-muted-foreground">
            {field.value ? formatClientDateFromUtc(field.value) : 'No date selected'}
          </T>
        )}
      />
      {error && <T className="text-red-500">{error.message}</T>}
      <DateTimePickerModal
        isVisible={showDate}
        mode="datetime"
        onConfirm={(date) => {
          setShowDate(false);
          const utcDateString = date.toISOString();
          console.log({ utcDateString });

          setValue(utcDateString);
        }}
        onCancel={() => setShowDate(false)}
      />
    </V>
  );
};
