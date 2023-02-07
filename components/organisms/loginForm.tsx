import React, { Fragment, useEffect, useState } from 'react';
import styles from '../../styles/Login.module.css';
import Form from '../atomic/form';
import Input from '../atomic/input';
import Button from '../atomic/button';
import Paragraph from '../atomic/paragraph';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ILogin } from '../../types/components/login.type';
import LoginSchema from 'helpers/validation/login.schema';
import { signIn, useSession } from 'next-auth/react';
import SmartModal from 'components/molecules/smartModal';
import { useRouter } from 'next/router';

const defaultValues = { email: '', password: '' };

function LoginForm({ regState, setRegState }: any) {
  const [isOpen, setOpen] = useState(false);
  const [infoMsg, setInfoMsg] = useState({ msg: '' });
  const [errorMsg, setErrorMsg] = useState({ msg: '' });
  const [notFoundError, setNotFoundError] = useState({ msg: '' });
  const [status, setStatus] = useState(false);
  const [loader, setLoader] = useState(false);
  const {
    control,
    reset,
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues,
    resolver: yupResolver(LoginSchema),
  });
  const session:any = useSession();
  const router = useRouter();

  const onSubmit = async (data: ILogin) => {
    setLoader(true);
    const result: any = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result?.status === 200) {
      setStatus(true);
      setOpen(true);
      setInfoMsg({ msg: 'Login successful' });
    } else if (result?.status === 404) {
      setOpen(true);
      setNotFoundError({ msg: 'Invalid username or password' });
    } else {
      setOpen(true);
      setErrorMsg({ msg: 'Something went wrong' });
    }
  };

  const onResetField = () => {
    reset();
    setLoader(false);
    setOpen(false);
  };

  const okActionButton = () => {
    if(status) { 
      router.push('/splash');
      setStatus(false);
    } else onResetField();
  }

  useEffect(() => {
    if(!status && session.status === 'authenticated') {
      setLoader(false);
      router.push('/dashboard');
    }
  }, [session])

  return (
    <Fragment>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Paragraph
          text='Login User'
          className='text-xl underline underline-offset-4 decoration-gray-500 decoration-wavy'
        />
        <Input
          className={styles.input}
          type='text'
          placeholder='Email'
          name='email'
          control={control}
          register={register}
          category={'loginInput'}
          getValues={getValues}
          fieldError={errors && errors.email}
        />
        <Input
          className={styles.input}
          type='password'
          placeholder='Password'
          name='password'
          control={control}
          register={register}
          category={'loginInput'}
          getValues={getValues}
          fieldError={errors && errors.password}
        />
        <div className={styles.buttonGroup}>
          <Button
            name='cancel'
            className={styles.button}
            type={'reset'}
            buttonText='Clear'
            onClick={onResetField}
          />
          <Button
            name='submit'
            className={styles.button}
            type={'submit'}
            buttonText='Login'
            loader={loader}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
        <Paragraph
          text='Register here'
          className={styles.para_reg}
          textLink={''}
          onClick={() => {
            setRegState(!regState);
            onResetField();
          }}
        />
      </Form>
      <SmartModal
        modalTitle={infoMsg ? infoMsg.msg : errorMsg.msg}
        isOpen={isOpen}
        setOpen={setOpen}
        description={
          infoMsg.msg
            ? 'Welcome to Financial Inspect App. Here you can manage all financial portfolios in one go'
            : errorMsg.msg
            ? 'Ooh... we are sorry your login was not successful.'
            : notFoundError.msg
            ? 'Email ID is not a registered user, please go to registration screen to register new user'
            : ''
        }
        className={
          'fixed inset-0 z-10 flex flex-col justify-center items-center'
        }
        cancelButtonText='Cancel'
        okButtonText='Ok'
        cancelButtonAction={onResetField}
        okButtonAction={okActionButton}
      />
    </Fragment>
  );
}

export default LoginForm;
