import React, { useEffect, useState } from 'react';
import { inputType } from '../../types/components/input.type';
import { Controller } from 'react-hook-form';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import styles from '../../styles/Login.module.css';
import regStyles from '../../styles/Register.module.css';
import classNames from 'classnames';
import { IFields } from 'types/fieldsType.type';
import Span from 'components/atomic/span';

function Input({
  className,
  type,
  control,
  register,
  name,
  placeholder,
  category,
  fieldError,
  getValues,
  onChange
}: inputType) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {type == 'password' ? (
        <div className='flex flex-col'>
          <div
            className={
              category === 'loginInput' ? styles.password : regStyles.password
            }
          >
            <Controller
              name={name}
              control={control}
              render={({ fields }: IFields) => (
                <input
                  {...fields}
                  {...register(name, { onChange })}
                  // defaultValue={getValues(name)}
                  className={classNames(['ml-1.5 h-[35px]', className])}
                  type={showPassword ? 'text' : type}
                  placeholder={placeholder}
                />
              )}
            />
            <Span
              onClick={() => setShowPassword(!showPassword)}
              className={
                category === 'loginInput'
                  ? styles.password_icon
                  : regStyles.pwd_reg_icon
              }
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </Span>
          </div>
          {fieldError && (
            <Span
              className={
                category === 'loginInput'
                  ? 'absolute top-[51%] mt-4 lg:mt-9 text-[11px] pl-[19px] text-red-400 w-40 text-left break-words'
                  : 'text-[11px] -mb-6 w-40 mt-2 text-red-400 text-left break-words'
              }
            >
              {fieldError?.message}
            </Span>
          )}
        </div>
      ) : (
        <div className='flex flex-col'>
          <Controller
            name={name}
            control={control}
            render={({ fields }: IFields) => (
              <input
                {...fields}
                defaultValue={getValues(name)}
                className={className}
                type={type}
                placeholder={placeholder}
                {...register(name)}
              />
            )}
          />
          {fieldError && (
            <Span
              className={
                category === 'loginInput'
                  ? 'absolute top-[40%] mt-[22px] lg:mt-[42px] w-40 text-[11px] text-left text-red-400'
                  : 'absolute mt-12 w-40 text-[11px] text-left text-red-400'
              }
            >
              {fieldError?.message}
            </Span>
          )}
        </div>
      )}
    </>
  );
}

export default Input;
