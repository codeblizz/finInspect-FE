import React from 'react';
import { buttonType } from '../../types/components/button.type';

function Button({
  name,
  autoFocus,
  disabled,
  type,
  value,
  className,
  buttonText,
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
      {buttonText}
    </button>
  );
}

export default Button;
