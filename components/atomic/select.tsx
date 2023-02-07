import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import styles from 'styles/Register.module.css';
import { optionType, selectType } from 'types/components/select.types';
import {
  CustomValueContainer,
  Placeholder,
  DropdownIndicator,
} from 'components/organisms/common';
import utils from '../../helpers/utils';
import Span from 'components/atomic/span';
import Select from 'react-select';
import { countrySelectStyle } from 'constant';

function CustomSelect({
  name,
  control,
  placeholder,
  className,
  options,
  getValues,
  setValue,
  toMoveUp,
  fieldError,
  selectedValue, 
  setSelectedValue
}: selectType) {
  const [focus, setFocus] = useState(false);

  const handleChange = (newOption: optionType) => {
    setValue(name, newOption);
    const value:any = getValues(name);
    setSelectedValue(value);
  };

  if (name === 'countryCode')
    options = utils.moveUpSelectOptions(options, toMoveUp);

  return (
    <div className='flex flex-col'>
      <Controller
        name={name}
        control={control}
        render={({ fields }: any) => (
          <Select
            {...fields}
            instanceId={name}
            // defaultValue={getValues(name)}
            value={selectedValue}
            onChange={handleChange}
            styles={countrySelectStyle}
            isSearchable={true}
            placeholder={focus ? '' : placeholder}
            getOptionValue={(optValue: any) => optValue.value}
            menuPlacement='auto'
            noOptionsMessage={({ inputValue }) => (
              <span className='text-xs'>{`No results for ${inputValue}`}</span>
            )}
            options={options}
            onFocus={() => setFocus(true)}
            components={{
              Placeholder,
              ValueContainer: CustomValueContainer,
              DropdownIndicator,
              IndicatorSeparator: () => null,
            }}
          />
        )}
      />
      {fieldError?.value && !selectedValue?.value && (
        <Span className='absolute mt-14 w-40 text-[11px] text-left text-red-400'>
          {fieldError?.value?.message}
        </Span>
      )}
    </div>
  );
}

export default CustomSelect;
