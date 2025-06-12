import React from 'react';
import { Modal, Pressable } from 'react-native';
import { V, T, TInput, Button } from '@/@core/tag/index';

interface OtpModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (otp: string) => void;
  loading?: boolean;
}

export const OtpModal = ({
  visible,
  onClose,
  onConfirm,
  loading,
}: OtpModalProps) => {
  const [otp, setOtp] = React.useState('');

  return (
    <Modal transparent visible={visible} animationType="fade">
      <V className="flex-1 items-center justify-center bg-black/80 px-6">
        <V className="w-full max-w-md items-center rounded-2xl bg-card p-6 shadow-xl">
          <T className="mb-4 text-center text-xl font-bold">Enter OTP</T>

          <TInput
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            placeholder="Enter 6-digit OTP"
            className="mb-4 w-full text-center"
            maxLength={6}
          />

          <Button
            variant="primary"
            className="w-full"
            onPress={() => onConfirm(otp)}
            disabled={loading || otp.length !== 6}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <Pressable onPress={onClose} className="mt-4">
            <T className="text-sm text-gray-500 underline">Cancel</T>
          </Pressable>
        </V>
      </V>
    </Modal>
  );
};
