import React from 'react';
import { Picker } from '@react-native-picker/picker';

interface Props {
  state: string | undefined;
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
  values: { label: string; value: string | null }[];
}

const DropDown: React.FC<Props> = ({ state, setState, values }) => {
  return (
    <>
      <Picker
        style={{
          width: '100%',
          backgroundColor: '#2699FB',
          borderRadius: 5,
        }}
        selectedValue={state}
        onValueChange={(itemValue, itemIndex) => setState(itemValue)}
      >
        {values.map((item, index) => {
          if (item.value === null) {
            return (
              <Picker.Item
                style={{ color: 'black' }}
                key={index}
                label={item.label}
                value={item.value}
                enabled={false}
              />
            );
          } else {
            return (
              <Picker.Item
                style={{ color: 'blue' }}
                key={index}
                label={item.label}
                value={item.value}
              />
            );
          }
        })}
      </Picker>
    </>
  );
};

export default DropDown;
