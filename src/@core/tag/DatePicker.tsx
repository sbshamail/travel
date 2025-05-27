import { Control, Controller, FieldError } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { T, V } from '.';
import { Button } from './Button';
import { Dispatch, SetStateAction } from 'react';

interface DatePickerHookProps {
  control: Control<any>; // Replace `any` with your actual form schema if available
  error?: FieldError;
  showDate: boolean;
  setShowDate: Dispatch<SetStateAction<boolean>>;
  setValue: (date: Date) => void;
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
            {field.value ? new Date(field.value).toLocaleString() : 'No date selected'}
          </T>
        )}
      />
      {error && <T className="text-red-500">{error.message}</T>}
      <DateTimePickerModal
        isVisible={showDate}
        mode="datetime"
        onConfirm={(date) => {
          setShowDate(false);
          setValue(date);
        }}
        onCancel={() => setShowDate(false)}
      />
    </V>
  );
};
