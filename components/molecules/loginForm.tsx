import React from 'react';
import styles from '../../styles/Login.module.css';
import Form from '../atomic/form';
import Input from '../atomic/input';
import Button from '../atomic/button';
import Paragraph from '../atomic/paragragh';
import { useForm } from 'react-hook-form';
import { ILoginType } from '../../types/login.type'

function LoginForm() {
  const { control, handleSubmit, reset, register } = useForm<ILoginType>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data:ILoginType) => {
    console.log('data', data);
  }

  const onResetField = () => {
    reset();
  }

  return (
    <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Paragraph text='LOGIN' className='' />
      <Input
        className={styles.input}
        type='text'
        placeholder='email'
        name='email'
        control={control}
        register={register}
      />
      <Input
        className={styles.input}
        type='password'
        placeholder='password'
        name='password'
        control={control}
        register={register}
      />
      <div className={styles.buttonGroup}>
        <Button
          name='cancel'
          className={styles.button}
          type={'reset'}
          buttonText='Cancel'
          onResetField={onResetField}
        />
        <Button
          name='submit'
          className={styles.button}
          type={'submit'}
          buttonText='Submit'
        />
      </div>
    </Form>
  );
}

export default LoginForm;
