import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import styles from '../../styles/Register.module.css';
import Form from '../atomic/form';
import Input from '../atomic/input';
import Button from '../atomic/button';
import Paragraph from '../atomic/paragraph';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterProps } from '../../types/register.type';
import InputGroup from 'components/atomic/inputGroup';
import RegisterSchema from 'helpers/validation/register.schema';
import CustomSelect from 'components/atomic/select';
import registerService from 'services/register.service';
import { useRouter } from 'next/router';
import SmartModal from 'components/molecules/smartModal';
import classNames from 'classnames';
import { optionType } from 'types/components/select.types';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  gender: { label: '', value: '' },
  countryCode: { label: '', value: '' }, 
  mobile: '',
  password: '',
  confirmPassword: '',
};

function RegisterForm({ regState, setRegState, countryList }: any) {
  const router = useRouter();
  const [selectedCountryValue, setCountrySelectedValue] = useState({ label: '', value: '' });
  const [selectedGenderValue, setGenderSelectedValue] = useState({ label: '', value: '' });
  const [country, setCountry] = useState([]);
  const [loader, setLoader] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: '',
  });
  const [formFieldValues, setFormFieldValues] = useState<any>({});
  const [isOpen, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ msg: '' });
  const [infoMsg, setInfoMsg] = useState({ msg: '' });
  const [notExistError, setNotExistError] = useState({ msg: '' });
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<RegisterProps>({
    defaultValues,
    resolver: yupResolver(RegisterSchema),
  });

  const watchFormValue = watch();

  const onSubmit = async (data: any) => {
    setLoader(true);
    const result: any = await registerService.registration(data);
    if(result.data.status === 200) {
      setOpen(true);
      setInfoMsg({ msg: result.data.message });
    } else if(result.data.status === 404) {
      console.log('result FE', result.data.message);
      setOpen(true);
      setNotExistError({ msg: result.data.message });
    } else {
      setOpen(true);
      setErrorMsg({ msg: 'Something went wrong' });
    }
  };

  const onResetField = () => {
    setCountrySelectedValue({ label: '', value: '' })
    setGenderSelectedValue({ label: '', value: '' })
    reset();
    setLoader(false);
  };

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Others', value: 'others' },
  ];

  const countryCodeOptions = () => {
    setCountry(countryList);
  };

  const handleChange = (e: any) => {
    setNewPassword({
      password: e.target.value,
      confirmPassword: e.target.value,
    });
  };

  const backToLogin = () => {
    setOpen(false);
    router.reload();
  }

  useEffect(() => {
    countryCodeOptions();
  }, []);

  useEffect(() => {
    setFormFieldValues({
      ...formFieldValues,
      password: newPassword.password,
      confirmPassword: newPassword.confirmPassword,
    });
  }, []);

  return (
    <Fragment>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <>
          <Paragraph
            text='Register New User'
            className='text-xl mb-4 underline underline-offset-4 decoration-gray-500 decoration-wavy'
          />
          <InputGroup className={styles.input_group}>
            <Input
              className={styles.input}
              type='text'
              placeholder='First Name'
              name='firstName'
              control={control}
              register={register}
              getValues={getValues}
              category={'registerInput'}
              fieldError={errors && errors?.firstName}
            />
            <Input
              className={styles.input}
              type='text'
              placeholder='Last Name'
              name='lastName'
              control={control}
              register={register}
              getValues={getValues}
              category={'registerInput'}
              fieldError={errors && errors?.lastName}
            />
            <Input
              className={styles.input}
              type='email'
              placeholder='Email'
              name='email'
              control={control}
              register={register}
              getValues={getValues}
              category={'registerInput'}
              fieldError={errors && errors?.email}
            />
            <Input
              className={styles.input}
              type='tel'
              placeholder='Mobile Number'
              name='mobile'
              control={control}
              getValues={getValues}
              register={register}
              category={'registerInput'}
              fieldError={errors && errors?.mobile}
            />
            <Input
              className={classNames([styles.input, '-ml-3 -mb-2'])}
              type='password'
              placeholder='Password'
              name='password'
              control={control}
              register={register}
              getValues={getValues}
              category={'registerInput'}
              fieldError={errors && errors?.password}
              onChange={handleChange}
            />
            <Input
              className={classNames([styles.input, '-ml-3 -mb-2'])}
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              control={control}
              getValues={getValues}
              register={register}
              category={'registerInput'}
              fieldError={errors && errors?.confirmPassword}
              onChange={handleChange}
            />
            <CustomSelect
              className={styles.select}
              name='gender'
              control={control}
              options={genderOptions}
              placeholder={'Select gender'}
              toMoveUp={'none'}
              getValues={getValues}
              setValue={setValue}
              fieldError={errors && errors?.gender}
              selectedValue={selectedGenderValue}
              setSelectedValue={setGenderSelectedValue}
            />
            <CustomSelect
              className={styles.select}
              name='countryCode'
              control={control}
              placeholder={'Select country'}
              options={country.map((c: any) => ({
                label: c.country,
                value: c.iso,
              }))}
              toMoveUp={'AE'}
              getValues={getValues}
              setValue={setValue}
              fieldError={errors && errors?.countryCode}
              selectedValue={selectedCountryValue}
              setSelectedValue={setCountrySelectedValue}
            />
          </InputGroup>
        </>
        <div className={styles.buttonGroup}>
          <Button
            name='cancel'
            className={styles.button}
            type={'reset'}
            buttonText={'Clear'}
            onClick={onResetField}
          />
          <Button
            name='submit'
            className={styles.button}
            type={'submit'}
            buttonText={'Register'}
            loader={loader}
            onClick={()=>{}}
          />
        </div>
        <Paragraph
          text='Login here'
          className={styles.para_reg}
          textLink={''}
          onClick={() => {
            setRegState(!regState);
            onResetField();
          }}
        />
      </Form>
      <SmartModal
        modalTitle={
          infoMsg
            ? infoMsg.msg
            : notExistError 
            ? notExistError.msg
            : errorMsg.msg
        }
        isOpen={isOpen}
        setOpen={setOpen}
        description={
          infoMsg.msg
            ? 'Thank you for registering with us.'
            : notExistError
            ? 'User already exist, click `OK` to Login'
            : 'Ooh... we are sorry your registration was not successful.'
        }
        className={
          'fixed inset-0 z-10 flex flex-col justify-center items-center'
        }
        cancelButtonText='Cancel'
        okButtonText='Ok'
        okButtonAction={backToLogin}
        onResetField={onResetField}
      />
    </Fragment>
  );
}

export default RegisterForm;
