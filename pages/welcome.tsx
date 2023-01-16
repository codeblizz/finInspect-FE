import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';

function Welcome() {
  return (
    <div>Welcome</div>
  )
}

Welcome.getLayout = (page: ReactElement) => {
  return page
};

export const getServerSideProps: GetServerSideProps = async (context:any) => {
  return {
    props: {}
  }
};

export default Welcome