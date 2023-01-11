import React from 'react';
import { buttonType } from '../../types/button.type';

function Button({
  name,
  autoFocus,
  disabled,
  type,
  value,
  className,
  buttonText,
}: buttonType) {
  return (
    <button
      autoFocus={autoFocus}
      disabled={disabled}
      name={name}
      type={type}
      value={value}
      className={className}
    >
      {buttonText}
    </button>
  );
}

export default Button;
