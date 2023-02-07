import React from 'react';
import { buttonType } from '../../types/components/button.type';
import Loader from 'components/assets/icons/loader';

function Button({
  name,
  autoFocus,
  disabled,
  type,
  value,
  className,
  buttonText,
  loader,
  onClick,
}: buttonType) {
  return (
    <button
      autoFocus={autoFocus}
      disabled={disabled}
      name={name}
      type={type}
      value={value}
      className={className}
      onClick={onClick}
    >
      <span className='flex justify-center items-center'>
        {loader ? <Loader className='animate-spin p-1' /> : buttonText}
      </span>
    </button>
  );
}

export default Button;
