import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import styles from '../../styles/Register.module.css';
import Form from '../atomic/form';
import Input from '../atomic/input';
import Button from '../atomic/button';
import Paragraph from '../atomic/paragragh';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterProps } from '../../types/register.type';
import InputGroup from 'components/atomic/inputGroup';
import RegisterSchema from 'helpers/validation/register.schema';
import CustomSelect from 'components/atomic/select';
import registerService from 'services/register.service';
import { useRouter } from 'next/router';
import SmartModal from 'components/molecules/smartModal';

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
  const [redirect, setRedirect] = useState(false);
  const [nextDisplay, setNextDisplay] = useState(false);
  const [notFoundError, setNotFoundError] = useState({ msg: '' });
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    getValues,
    clearErrors,
    unregister,
    watch,
    formState: { errors },
  } = useForm<RegisterProps>({
    defaultValues,
    resolver: yupResolver(RegisterSchema),
  });

  const watchFormValue = watch();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    const result: any = await registerService.registration(formFieldValues);
    if (result.status === 200) {
      setOpen(true);
      setInfoMsg(result.data.message);
    } else if (result.status === 404) {
      setOpen(true);
      setNotFoundError({ msg: result.data.message });
    } else {
      setOpen(true);
      setErrorMsg({ msg: 'Something went wrong' });
    }
  };

  const onResetField = () => {
    clearErrors();
  };

  const onSetNextDisplay = () => {
    // unregister(['confirmPassword', 'password']);
    if (Object.keys(errors).length === 2) {
      setNextDisplay(true);
    }
  };

  const previousDisplay = () => {
    setValue('firstName', formFieldValues.firstName);
    setValue('lastName', formFieldValues.lastName);
    setValue('email', formFieldValues.email);
    setValue('mobile', formFieldValues.mobile);
    setValue('gender', formFieldValues.gender);
    setValue('countryCode', formFieldValues.countryCode);
    setNextDisplay(false);
    setLoader(false)
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
        {!nextDisplay ? (
          <>
            <Paragraph text='Register New User' className='text-xl mb-4 underline underline-offset-4 decoration-gray-500 decoration-wavy' />
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
                fieldError={errors && errors.firstName}
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
                fieldError={errors && errors.lastName}
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
                fieldError={errors && errors.email}
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
                fieldError={errors && errors.mobile}
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
                unregister={unregister}
                fieldError={errors && errors.gender}
                setFormFieldValues={setFormFieldValues}
                watchFormValue={watchFormValue}
                formFieldValues={formFieldValues}
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
                unregister={unregister}
                setValue={setValue}
                fieldError={errors && errors.countryCode}
                setFormFieldValues={setFormFieldValues}
                watchFormValue={watchFormValue}
                formFieldValues={formFieldValues}
              />
            </InputGroup>
          </>
        ) : (
          <>
            <Paragraph text='Create Password' className='text-xl' />
            <Input
              className={styles.input}
              type='password'
              placeholder='Password'
              name='password'
              control={control}
              register={register}
              getValues={getValues}
              category={'registerInput'}
              fieldError={errors && errors.password}
              onChange={handleChange}
            />
            <Input
              className={styles.input}
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              control={control}
              getValues={getValues}
              register={register}
              category={'registerInput'}
              fieldError={errors && errors.confirmPassword}
              onChange={handleChange}
            />
          </>
        )}
        <div className={styles.buttonGroup}>
          <Button
            name='cancel'
            className={styles.button}
            type={'reset'}
            buttonText={nextDisplay ? 'Back' : 'Clear'}
            onClick={nextDisplay ? previousDisplay : onResetField}
          />
          {!nextDisplay ? (
            <Button
              name='submit'
              className={styles.button}
              type={'submit'}
              buttonText={'Next'}
              onClick={onSetNextDisplay}
            />
          ) : (
            <Button
              name='submit'
              className={styles.button}
              type={'button'}
              buttonText={'Login'}
              loader={loader}
              onClick={handleSubmit(onSubmit)}
            />
          )}
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
            : notFoundError
            ? notFoundError.msg
            : errorMsg.msg
        }
        isOpen={isOpen}
        setOpen={setOpen}
        description={
          infoMsg.msg
            ? 'Thank you for registering with us.'
            : notFoundError.msg
            ? 'User already exist, click `OK` to Login'
            : 'Ooh... we are sorry your registration was not successful.'
        }
        className={
          'fixed inset-0 z-10 flex flex-col justify-center items-center'
        }
        cancelButtonText='Cancel'
        okButtonText='Ok'
        okButtonAction={() => router.push('/')}
      />
    </Fragment>
  );
}

export default RegisterForm;
