import React, { useState } from 'react';
import { inputType } from '../../types/input.type';
import { Controller } from 'react-hook-form';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import styles from '../../styles/Login.module.css';

function Input({ className, type, control, register, name, placeholder }: inputType) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {type == 'password' ? (
        <div className={styles.password}>
          <Controller
            name={name}
            control={control}
            render={({ fields }: any) => (
              <input
                {...fields}
                className={className}
                type={showPassword ? 'text' : type}
                placeholder={placeholder}
                {...register(name)}
              />
            )}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordIcon}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ fields }: any) => (
            <input
              {...fields}
              className={className}
              type={type}
              placeholder={placeholder}
              {...register(name)}
            />
          )}
        />
      )}
    </>
  );
}

export default Input;
