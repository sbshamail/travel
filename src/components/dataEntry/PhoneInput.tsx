// /getCountryList.ts
import rawCountries from 'world-countries';

// components/PhoneInput.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import { useTheme } from '../../@core/theme/themeContext';
import { T, V } from '../../@core/tag';

export interface CountryItem {
  name: string;
  code: string;
  callingCode: string;
  flag: string;
}

// Helper: convert ISO country code to flag emoji
const getFlagEmoji = (countryCode: string) =>
  countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

const getCountryList = (): CountryItem[] => {
  return rawCountries
    .filter((c) => c.idd?.root && c.idd.suffixes?.length)
    .map((c) => {
      const callingCode = `${c.idd.root}${c.idd.suffixes[0]}`;
      return {
        name: c.name.common,
        code: c.cca2,
        callingCode: callingCode.replace('+', ''),
        flag: getFlagEmoji(c.cca2),
      };
    });
};
// import { getCountryList, CountryItem } from '../utils/getCountryList';

const countryList = getCountryList();

interface PhoneInputType {
  onChange: (val: { country: string; number: string }) => void;
  value: { country: string; number: string };
}

export const PhoneInput: React.FC<PhoneInputType> = ({ onChange, value }) => {
  const { ct } = useTheme();

  const defaultCountry =
    countryList.find((c) => c.callingCode === value.country) ||
    countryList.find((c) => c.code === 'PK') ||
    countryList[0];

  const [country, setCountry] = useState<CountryItem>(defaultCountry);
  const [number, setNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Trigger when value prop changes externally
    setNumber(value.number || '');
    const match = countryList.find((c) => c.callingCode === value.country);
    if (match) setCountry(match);
  }, [value]);

  const onChangeText = (text: string) => {
    // strip non-digits
    const cleaned = text.replace(/\D/g, '');
    const full = `+${country.callingCode}${cleaned}`;
    const phone = parsePhoneNumberFromString(full, country.code as CountryCode);
    setNumber(cleaned);
    setIsValid(phone?.isValid() || false);
    onChange({ country: country.callingCode, number: cleaned });
  };
  const selectCountry = (c: CountryItem) => {
    setCountry(c);
    setModalVisible(false);
    onChangeText(number);
  };
  return (
    <V className="w-full ">
      <V className="flex-row items-center rounded-xl border border-border !bg-accent px-2 py-2 ">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="mr-2">
          <Text className="text-xl">{country.flag}</Text>
        </TouchableOpacity>
        <T className="mr-1 text-base text-muted-foreground">
          +{country.callingCode}
        </T>
        <TextInput
          keyboardType="number-pad"
          value={number}
          onChangeText={onChangeText}
          placeholder="Phone number"
          placeholderTextColor={ct?.['muted-foreground'] ?? '#A1A1AA'}
          className="flex-1 text-foreground"
        />
      </V>

      {!isValid && number.length > 0 && (
        <Text className="mt-1 text-sm text-red-500">Invalid phone number</Text>
      )}

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <V className=" max-h-[60%] rounded-xl bg-card p-4">
          <FlatList
            data={countryList}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => selectCountry(item)}
                className="border-b border-border py-2 ">
                <T className="text-base ">
                  {item.flag} {item.name} (+{item.callingCode})
                </T>
              </TouchableOpacity>
            )}
          />
        </V>
      </Modal>
    </V>
  );
};

// Usage example (e.g., in your LoginScreen.tsx):
// import { PhoneInput } from './components/PhoneInput';
// <PhoneInput />
