import React from 'react';
import { components, DropdownIndicatorProps, GroupBase } from 'react-select';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useFormContext } from 'react-hook-form';

export const { ValueContainer, Placeholder } = components;
export const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      {props.selectProps.value?.value === '' ||
      props.selectProps.value === null ||
      props.selectProps.value?.length === 0 ||
      props.selectProps.value === undefined ? (
        <Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </Placeholder>
      ) : (
        ''
      )}
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

export const CaretDownIcon = () => {
  return <IoMdArrowDropdown height={'15px'} width={'15px'} style={{ cursor: 'pointer'}} />;
};

export const DropdownIndicator = (
  props: JSX.IntrinsicAttributes &
    DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  );
};

export const ConnectForm = ({ children }:any) => {
  const methods = useFormContext();
  
  return children({ ...methods });
 };
