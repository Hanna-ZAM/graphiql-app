import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FormRegister from '../../components/auth/FormRegister';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { tokenName } from '../../helpers/const';

export default function RegisterPage() {
  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-image"></div>
        <FormRegister />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { locale, req } = ctx;
  const translations = await serverSideTranslations(locale ?? 'en', [
    'header',
    'common'
  ]);
  const token = req.cookies[tokenName];
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: '/main'
      }
    };
  }
  return {
    props: {
      ...translations
    }
  };
};
