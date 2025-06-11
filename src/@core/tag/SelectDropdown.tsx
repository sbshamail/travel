import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from '../theme/themeContext';
import { T } from '.';

interface SelectDropdownType {
  data: Record<string, any>[];
  value?: string | undefined;
  onChange: (t: any) => void;
  error?: Record<string, string | any>;
  label?: string;
}
export const SelectDropdown = ({ data, value, onChange, label, error }: SelectDropdownType) => {
  const { ct } = useTheme();
  return (
    <>
      {label && <T className="mb-1 text-sm font-medium text-foreground">{label}</T>}
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select car type"
        search
        value={value}
        onChange={onChange}
        style={{
          height: 50,
          borderColor: error ? ct['destructive'] : ct['secondary-foreground'],
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          backgroundColor: ct.card,
        }}
        placeholderStyle={{
          color: ct['muted-foreground'],
        }}
        selectedTextStyle={{
          color: ct['accent-foreground'],
        }}
        containerStyle={{
          borderRadius: 8,
          backgroundColor: ct.card,
          borderColor: ct.accent,
          borderWidth: 1,
        }}
        inputSearchStyle={{
          backgroundColor: ct.accent,
          borderColor: ct.accent,
          color: ct['accent-foreground'],
          paddingHorizontal: 10,
          borderRadius: 6,
          height: 40,
        }}
        itemContainerStyle={{
          backgroundColor: ct.card,
        }}
        itemTextStyle={{
          color: ct['card-foreground'],
        }}
        activeColor={ct.secondary} // fixes white selection highlight
        searchPlaceholder="Search car type"
      />
      {error && <T className="mt-1 text-sm text-red-500">{error.message}</T>}
    </>
  );
};
